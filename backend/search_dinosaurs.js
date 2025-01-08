
function coordinates_are_inside_area(coordinates, id, on_load) {
    if (!on_load) {
        // Define default function to use when we call this function for debugging purposes:
        on_load = function(req) {
            if (overpass_search_req.readyState == 4 && overpass_search_req.status == 200) {
                console.log(overpass_search_req.responseText);
            } else {
                console.log("Overpass error.");
            }
        }
    }
    var body;
    if (coordinates.latitude) {
        body = (
            "is_in(" + coordinates.latitude + "," + coordinates.longitude + ");\n"
            + "relation(" + id + ")(pivot:in);\n"
            + "out meta;"
        )
    } else if (coordinates.id) {
        body = (
            "area(" + (3600000000 + id) + ")->.a;\n"
            + "relation(" + coordinates.id + ")(area.a);\n"
            + "out geom;\n"
            + "area(" + (3600000000 + coordinates.id) + ")->.b;\n"
            + "relation(" + id + ")(area.b);\n"
            + "out geom;\n"
        )
    }
    overpass_search_req.open("POST", "https://overpass-api.de/api/interpreter");
    overpass_search_req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    overpass_search_req.onload = on_load;
    overpass_search_req.send(body);
}

// The actual Dinosaur Search:

var _amount_of_dinos_checked;
var _search_data = {};

function search_dinosaurs_in_place(place_entry, coordinates, _places) {
    if (!place_entry.has_dinosaurs) {
        return; // nothing to see here
    }
    // don't search for dinosaurs if we found them already:
    _search_data.dinos_found.forEach((dino_name) => {
        place_entry.lives.delete(dino_name);
        place_entry.lives_extended.delete(dino_name);
        place_entry.lives_in_children.delete(dino_name);
        place_entry.lives_extended_in_children.delete(dino_name);
    })
    _search_data.dinos_found_extended.forEach((dino_name) => {
        place_entry.lives_extended.delete(dino_name);
        place_entry.lives_extended_in_children.delete(dino_name);
    })
    // if there are no dinosaurs to search for in this area, mark it as done:
    if (
        place_entry.lives.size + place_entry.lives_extended.size
        + place_entry.lives_in_children.size + place_entry.lives_extended_in_children.size == 0
    ) {
        place_entry.has_dinosaurs = false;
        return;
    }
    // If we know that our coordinates are in this area already, we look at the area's children:
    if (place_entry.has_user_location) {
        for (let key in place_entry.contains) {
            let dispatched_req_to_overpass = search_dinosaurs_in_place(place_entry.contains[key], coordinates, _places);
            if (dispatched_req_to_overpass) {
                return true;
            }
        }
        // We have accessed all children and can therefore safely conclude that this place has no more dinosaurs for us.
        place_entry.has_dinosaurs = false;
        return;
    }
    // Now we check if our coordinates are in the potential dinosaur location.

    function mark_place_entry_hit(hit, including_children) {
        // marks a place entry based on whether the user location is in it or not.
        if (hit) {
            // mark location for going further down the tree on the next iteration.
            place_entry.has_user_location = true;
            // add dinos we found at this location to the search results and then remove them from this location:
            place_entry.lives.forEach((dino_name) => {
                _search_data.dinos_found.add(dino_name);
            })
            place_entry.lives_extended.forEach((dino_name) => {
                _search_data.dinos_found_extended.add(dino_name);
            })
            place_entry.lives.clear();
            place_entry.lives_extended.clear();
            if (including_children) {
                // add dinos we found at child locations to the search results and then remove them from this location:
                place_entry.lives_in_children.forEach((dino_name) => {
                    _search_data.dinos_found.add(dino_name);
                })
                place_entry.lives_extended_in_children.forEach((dino_name) => {
                    _search_data.dinos_found_extended.add(dino_name);
                })
                place_entry.lives_in_children.clear();
                place_entry.lives_extended_in_children.clear();
            }
            // mark location as devoid of dinos if it has no child locations, to save some time on the next iteration:
            if (place_entry.lives_in_children.size + place_entry.lives_extended_in_children.size == 0) {
                place_entry.has_dinosaurs = false;
            }
        } else {
            // if we are not in this area, then we will stop searching in it or in its child areas
            place_entry.has_dinosaurs = false;
        }
        add_to_cache(coordinates, place_entry.id, hit);
    }

    if (coordinates.id) {
        // First we check if our location is identical to the potential dinosaur location:
        if (coordinates.id == place_entry.id) {
            mark_place_entry_hit(true, true);
            window.setTimeout(function() {search_dinosaurs_in_places_tree(_places, coordinates);}, 1);
            return true;
        }
    
        // If our location is different (by ID) from the dinosaur location and its parents, and in the same area group
        // then we can conclude that there is an intersection between both if and only if our location is a descendant
        // of the dinosaur location.
        else if (
            _area_groups_by_id[coordinates.id]
            && _area_groups_by_id[coordinates.id] == _area_groups_by_id[place_entry.id]
        ) {
            mark_place_entry_hit(place_entry.descendents.has(coordinates.id));
            window.setTimeout(function() {search_dinosaurs_in_places_tree(_places, coordinates);}, 1);
            return true;
        }
    }

    // Then we check for intersection in the cache:
    let intersects = get_from_cache(coordinates, place_entry.id);
    if (typeof intersects != "undefined") {
        mark_place_entry_hit(intersects);
        window.setTimeout(function() {search_dinosaurs_in_places_tree(_places, coordinates);}, 1);
        return true;
    }

    // And then we check for intersection via a request to overpass API:
    coordinates_are_inside_area(coordinates, place_entry.id, function(req) {
        if (overpass_search_req.readyState == 4 && overpass_search_req.status == 200) {
            var xml_data = new DOMParser().parseFromString(overpass_search_req.responseText, "text/xml");
            var inside_area = xml_data.querySelector("relation");
            mark_place_entry_hit(inside_area);
        } else {
            console.log("Overpass error.");
            _search_data.overpass_errors += 1;
            // Fail it too many requests failed.
            if (_search_data.overpass_errors >= 3) {
                finish_search_dinosaurs(false);
                return;
            }
        }
        // Start the next iteration.
        search_dinosaurs_in_places_tree(_places, coordinates);
    })
    // Return true to signal that we have dispatched a search to Overpass and that we should therefore exit the function.
    return true;
}

function search_dinosaurs_in_places_tree(_places, coordinates) {
    if (_search_data.cancel) {
        finish_search_dinosaurs(false);
        return;
    }
    let progress = 0;
    for (let place_name in _places) {
        let place_entry = _places[place_name];
        progress += 1;
        if (place_entry.is_in) {
            continue; // we will find the place later on further down in the tree
        }
        let dispatched_req_to_overpass = search_dinosaurs_in_place(place_entry, coordinates, _places);
        if (dispatched_req_to_overpass) {
            display_error_text("dino_search_error_text", "Progress: " + Math.floor(progress / Object.keys(_places).length * 100) + "%", "#68961f");
            return;
        }
    }
    // Remove dinos in dinos_found from dinos_found_extended:
    _search_data.dinos_found.forEach((dino_name) => {
        _search_data.dinos_found_extended.delete(dino_name);
        _dinos_in_tree.delete(dino_name);
    });
    _search_data.dinos_found_extended.forEach((dino_name) => {
        _dinos_in_tree.delete(dino_name);
    });
    // Finish the searching & add results to HTML.
    finish_search_dinosaurs(true);
}

function start_searching_dinosaurs_in_places_tree(_places, coordinates) {
    _amount_of_dinos_checked = 0;
    _search_data = {
        dinos_found: new Set(),
        dinos_found_extended: new Set(),
        overpass_errors: 0,
    };
    search_dinosaurs_in_places_tree(_places, coordinates);
}
