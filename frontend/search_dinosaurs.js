// Dino Search
var _times_that_search_has_run = 0;
var search_finished_running_once = false;
var extended_dinosaurs_shown = false;

function reload_dinosaur_display_if_needed() {
    if (search_finished_running_once) {
        finish_search_dinosaurs(true, true);
        if (extended_dinosaurs_shown) {
            show_all_contemporaries();
        }
    }
}

function search_dinosaurs_cancel() {
    // This sets a parameter in the data that the "backend"'s code operates on that tells it to stop at the next iteration.
    _search_data.cancel = true;
}

function search_dinosaurs() {
    // This starts the search for dinosaurs that fits the parameters specified.

    // check if user is okay with userdata being passed to Drittanbieter.
    // (We do this check before giving them information like "no valid location entered" because
    // we don't want a user to get the impression that we were somehow about to start the process
    // without asking beforehand. )
    if (!userConsentsToThirdPartyServices()) {
        return;
    }
    // Check if location was entered:
    if (_data.location_coordinates.latitude == undefined && _data.location_coordinates.display_name == undefined) {
        display_error_text("dino_search_error_text", "No valid location entered.<br>");
        return;
    }
    display_error_text("dino_search_error_text", "");
    // remove outdated dino information:
    if (_times_that_search_has_run > 0) {
        clear_dinos_from_place_tree(_places);
    }
    _times_that_search_has_run += 1;
    document.getElementById("dino_results").innerHTML = "";
    // add dinos to places tree:
    add_dinos_to_places_tree(_places, _dinos, get_selected_time_min(), get_selected_time_max());
    // lock interfaces:
    lock_location_selection_functionalities("search_dinosaurs_button");
    // do the actual search:
    start_searching_dinosaurs_in_places_tree(_places, _data.location_coordinates);
}

function render_dino_locations_list(dino_data) {
    let location_names = [];
    for (let location_name of (dino_data.lives_written || dino_data.lives)) {
        if (typeof(location_name) == "object") {
            location_names.push(place_name_to_place_selection_button(location_name[0]));
        } else {
            location_names.push(place_name_to_place_selection_button(location_name));
        }
    }
    let s = location_names.join(", ");
    if (dino_data.lives_extended) {
        s += ", and maybe "
        location_names = [];
        for (let location_name of (dino_data.lives_extended_written || dino_data.lives_extended)) {
            if (typeof(location_name) == "object") {
                location_names.push(place_name_to_place_selection_button(location_name[0]));
            } else {
                location_names.push(place_name_to_place_selection_button(location_name));
            }
        }
        s += location_names.join(", ");
    }
    if (dino_data.lives_exclusively) {
        s += " and nowhere else.";
    }
    return s;
}


function generate_html_list_of_dinosaurs(dinosaur_names, show_locations) {
    // Returns a piece of html that represents a list of the dinosaurs in dinosaur_names,
    //  with added information like diet and time range.
    let html = "";
    let diet_to_emoji = {
        [UNKNOWN_DIET]: "🥩 and/or 🌲?",
        [INSECTIVORE]: "🦗",
        [CARNIVORE]: "🥩",
        [HERBIVORE]: "🌲",
        [OMNIVORE]: "🥩&🌲",
        [HERBIVORE_OR_OMNIVORE]: "🌲 or 🥩&🌲",
        [CARNIVORE_OR_OMNIVORE]: "🥩 or 🥩&🌲",
        [INSECTIVORE_OR_CARNIVORE]: "🦗 and/or 🥩",
        [PISCIVORE]: "🐟",
        [PISCIVORE_AND_CARNIVORE]: "🐟&🥩",
        [PISCIVORE_OR_CARNIVORE]: "🐟 and/or 🥩",
    };
    let diet_to_mouseover = {
        [UNKNOWN_DIET]: "Unknown diet",
        [INSECTIVORE]: "Insectivore",
        [CARNIVORE]: "Carnivore",
        [HERBIVORE]: "Herbivore",
        [OMNIVORE]: "Omnivore",
        [HERBIVORE_OR_OMNIVORE]: "Herbivore or omnivore",
        [CARNIVORE_OR_OMNIVORE]: "Carnivore or omnivore",
        [INSECTIVORE_OR_CARNIVORE]: "Insectivore and/or carnivore",
        [PISCIVORE]: "Piscivore",
        [PISCIVORE_AND_CARNIVORE]: "Fish and meat eater",
        // ^ We say "fish- and meat-eater" rather than "piscivore and carnivore" bc piscivore implies that the animal only or primarily eats fish,
        //   meaning that combing "piscivore" and "carnivore" with an "and" would be mildly contradictory.
        [PISCIVORE_OR_CARNIVORE]: "Piscivore and/or carnivore",
    };
    dinosaur_names = Array.from(dinosaur_names);
    dinosaur_names.sort();
    for (let i=0; i<dinosaur_names.length; i++) {
        let name = dinosaur_names[i];
        let year_min = _dinos[name].year_min_precise || _dinos[name].year_min;
        let year_max = _dinos[name].year_max_precise || _dinos[name].year_max;
        html += (
            "<span name='dinosaurs:" + name + "'>" +
            "<a rel='noopener noreferrer' target='_blank' href='" +
            _dinos[name].wikipedia + "'>" + name + "</a> " +
            "<small>(ate:&nbsp;<span title='" + diet_to_mouseover[_dinos[name].eats] +
            "'>" + diet_to_emoji[_dinos[name].eats].replaceAll(" ", "&nbsp;") + "</span>)</small><br>" +
            "<small>lived " + time_to_time_links(year_min, year_max) +
            " mil years ago</small><br>" +
            (
                show_locations
                ? ("<small>lived in: " + render_dino_locations_list(_dinos[name]) + "</small><br>")
                : ""
            ) +
            "<br></span>"
        );
    }
    return html;
}

function show_all_contemporaries() {
    // Shows all dinosaurs that lived at a certain time, not just at the selected location.
    let show_all_contemporaries_button = document.getElementById("show_all_contemporaries_button");
    let outerHTML = "Dinosaurs that lived within your selected time span in other areas of the world:<br><br>"
    outerHTML += generate_html_list_of_dinosaurs(_dinos_in_tree, true);
    show_all_contemporaries_button.outerHTML = outerHTML;
    extended_dinosaurs_shown = true;
}

function finish_search_dinosaurs(success, is_reload) {
    // This function is called by the "backend" when the search for dinosaurs that was started with search_dinosaurs is finished.
    // It displays the results and/or appropriate error messages
    if (!is_reload) {
        extended_dinosaurs_shown = false;
    }
    if (success) {
        display_error_text("dino_search_error_text", "");
        dino_results = document.getElementById("dino_results");
        innerHTML = "<hr>";
        // No Dinos alive at the time
        if (_dinos_in_tree.size + _search_data.dinos_found.size + _search_data.dinos_found_extended.size == 0) {
            innerHTML += "No Dinosaurs (in DinoGuide's data set) are known to have lived at the time of the time you selected.";
        // Dinos found
        } else if (_search_data.dinos_found.size == 0) {
            innerHTML += (
                "No Dinosaurs are <i>known</i> to have lived at your selected time at your selected location.<br><br>" +
                "This might be because: <ul>" +
                    "<li>DinoGuide's data set is not up-to-date with current knowledge.</li>" +
                    "<li>Your location is on a tiny island that wasn't correctly processed by DinoGuide.</li>" +
                    "<li>Your location <a rel='noopener noreferrer' target='_blank' href='https://en.wikipedia.org/wiki/Plate_tectonics'>was</a> in an ocean or on a secluded island during your selected time, where <a rel='noopener noreferrer' target='_blank' href='https://en.wikipedia.org/wiki/List_of_common_misconceptions#:~:text=" +
                    encodeURIComponent('Despite their cultural depictions as "swimming dinosaurs"') + "," +
                    encodeURIComponent('which excludes the pterosaurs.') +
                    "'>no Dinosaurs</a> could have lived.</li>" +
                    "<li>Potential other reasons why Dinosaurs didn't live at your location during your selected time.</li>" +
                    "<li>Dinosaurs lived at your location during your selected time, but their fossils haven't been found.</li>" +
                    "<li>Dinosaurs lived at your location during your selected time and their fossils have been found, but at a different location, and we didn't correctly deduce that their range included your location.</li>" +
                "</ul><br><br>"
            );
        } else {
            innerHTML += (
                "The following Dinosaur species are <i>known</i> to have lived at your location during your selected time:<br><br>" +
                generate_html_list_of_dinosaurs(_search_data.dinos_found)
            );
        }
        // Dinos found extended
        // (This feature is implemented, but not yet widely-used in the data set. See output strings below for context.)
        if (_search_data.dinos_found_extended.size > 0) {
            innerHTML += (
                "The following Dinosaur species were connected to your location by land masses and thus <i>may</i> have lived at your location, but we can't know that for sure:<br><br>" +
                generate_html_list_of_dinosaurs(_search_data.dinos_found_extended)
            );
        }
        // Dinos that were not found, but lived at the time
        if (_dinos_in_tree.size > 0) {
            innerHTML += "<button id='show_all_contemporaries_button' type='button' onClick='show_all_contemporaries();'>Show all contemporary dinosaurs</button>";
        }
        dino_results.innerHTML = innerHTML;
        search_finished_running_once = true;
    } else {
        display_error_text("dino_search_error_text", (
            _search_data.cancel
            ? "Canceled."
            : "Dino search failed to complete due to API requests failing. This may be due to overloaded servers or due to internet connection problems.<br>"
        ));
    }
    // unlock interfaces:
    if (!is_reload) {
        unlock_location_selection_functionalities();
    }
}
