// search non-device location using Nominatem:

const overpass_search_req = new XMLHttpRequest();
var _location_dropdown_selection;
var _last_location_search_query = false;
var _2nd_to_last_location_search_query = true;

function onLocationSelectionChoice() {
    var selected_value = document.getElementById("location_search_results").value;
    if (selected_value == "load_more") {
        document.getElementById("location_search_results").value = "select";
        searchLocation(true);
        return;
    }
    if (selected_value == "select") {
        return;
    }
    var [index, id] = selected_value.split(" ");
    index = Number(index);
    if (_location_dropdown_selection[index].id != id) {
        // having the id to check against saveguards us against problems
        //  caused by users clicking on an option whilst onLocationSearchSuccess
        //  is running. Which should be impossible, but better safe than sorry.
        return;
    }
    setLocation({
        display_name: _location_dropdown_selection[index].display_name,
        is_relation: _location_dropdown_selection[index].is_relation,
        id: id,
        latitude: _location_dropdown_selection[index].latitude,
        longitude: _location_dropdown_selection[index].longitude,
    });
    document.getElementById("place_use_system_location").checked = false;
    _data.use_device_location = false;
}

function onLocationSearchSuccess(responseText) {
    // parse json
    let json_data = JSON.parse(responseText);
    // build selection
    if (json_data.length == 0) {
        display_error_text("device_location_error_text", "No locations fitting the search term found.");
        return;
    }
    display_error_text("device_location_error_text", "");
    // build data structure
    var results = [];
    for (var i=0; i<json_data.length; i+=1) {
        var result = {};
        results.push(result);
        result.display_name = "";
        result.id = json_data[i].osm_id;
        result.place_id = json_data[i].place_id;
        result.is_relation = json_data[i].osm_type == "relation";
        if (!result.is_relation) {
            result.latitude = json_data[i].lat;
            result.longitude = json_data[i].lon;
        }
        let addr_type_capitalized = json_data[i].addresstype.replace("_", " ");
        addr_type_capitalized = addr_type_capitalized.charAt(0).toUpperCase() + addr_type_capitalized.slice(1);
        result.display_name = (
            "(" + addr_type_capitalized + ") "
            + json_data[i].display_name
            + (result.is_relation ? " (entire area)" : " (center position)")
            // + (result.is_relation ? " -> Area" : " -> Position")
        );
        // result.display_name_short = json_data[i].name + (result.is_relation ? " (entire area)" : " (center position)");
    }
    let found_new_results = results.length > 0;
    // add to html dropdown list, or replace the html dropdown list with our new results:
    if (_last_location_search_query === _2nd_to_last_location_search_query) {
        _location_dropdown_selection = _location_dropdown_selection.concat(results);
    } else {
        _location_dropdown_selection = results;
    }
    results = _location_dropdown_selection;
    // build html
    var inner_html = '<select id="location_search_results"  onchange="onLocationSelectionChoice()" style="max-width: 100%">';
    inner_html += "<option value='select'>Select search result...</option>";
    for (var i=0; i<results.length; i=i+1) {
        inner_html += "<option value='" + i + " " + results[i].id + "''>" + results[i].display_name + "</option>";
    }
    if (found_new_results) {
        inner_html += "<option value='load_more'>Load further results...</option>";
    }
    inner_html += '</select><br>';
    document.getElementById("search_result_selection").innerHTML = inner_html;
}

function onLocationSearchFinished(req) {
    if (overpass_search_req.readyState == 4 && overpass_search_req.status == 200) {
        onLocationSearchSuccess(overpass_search_req.responseText);
    } else {
        display_error_text("device_location_error_text", "Location search failed :(");
    }
    unlock_location_selection_functionalities("place_search_button");
}

function searchLocation(repeat_search) {
    if (document.getElementById("place_search_button").disabled) {
        return;
    }
    // check if user is okay with userdata being passed to Drittanbieter
    if (!userConsentsToThirdPartyServices()) {
        return;
    }
    // if repeat_search is set, use the same search term as on the last search; otherwise, get search term from input field
    var search_term;
    if (repeat_search) {
        search_term = _last_location_search_query;
    } else {
        search_term = document.getElementById("place").value;
    }
    // reject if the search field is empty
    if (search_term.length == 0) {
        display_error_text("device_location_error_text", "No valid search term entered.");
        return;
    }
    // Construct query based on whether we're asking for more of the same search term or not
    _2nd_to_last_location_search_query = _last_location_search_query;
    _last_location_search_query = search_term;
    let banned_ids = "";
    if (_last_location_search_query === _2nd_to_last_location_search_query) {
        banned_ids = "&exclude_place_ids=";
        for (let i=0; i<_location_dropdown_selection.length; i++) {
            banned_ids += _location_dropdown_selection[i].place_id;
            if (i < _location_dropdown_selection.length-1) {
                banned_ids += ",";
            }
        }
    }
    // send search request
    // (the user-agent header is necessary to comply with nominatem's usage policy: https://operations.osmfoundation.org/policies/nominatim/)
    let query = (
        "https://nominatim.openstreetmap.org/search?q=" + encodeURIComponent(search_term)
        + "&format=json&limit=40&addressdetails=1"
        + "&accept-language=" + userLang + "," + userLang_short + ",en" + banned_ids
    );
    overpass_search_req.open("GET", query);
    overpass_search_req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    overpass_search_req.setRequestHeader("User-Agent", "DinoGuide (an in-dev website to filer dinosaur names by time and region of occurance)");
    overpass_search_req.onload = onLocationSearchFinished;
    overpass_search_req.send();
    lock_location_selection_functionalities("place_search_button");
}

function locationSearchCheckEnter(event) {
    if (event.key == "Enter") {
        searchLocation()
    }
}
