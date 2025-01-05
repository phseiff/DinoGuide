
const userLang = navigator.language || navigator.userLanguage;
const userLang_short = userLang.split("-")[0];

function location_coords_JSON_to_string(location_coords_JSON) {
    if (location_coords_JSON.display_name) {
        return location_coords_JSON.display_name;
        /*if (location_coords_JSON.is_relation) {
            return location_coords_JSON.display_name + "<small> (area)</small>";
        } else {
            return location_coords_JSON.display_name + "<small> (position)</small>";
        }*/
    } else if (location_coords_JSON.latitude) {
        return (
            "Lat: " + location_coords_JSON.latitude
            + ", Long: " + location_coords_JSON.longitude
        )
    } else {
        return "";
    }
}

let ids_for_locking = [
    "place_use_system_location",
    "place_search_button",
    "search_dinosaurs_button",
    "hamburger_menu",
    "location_search_results", // <- this one isn't necessarily present at all times
];

function lock_location_selection_functionalities(loading_icon_where) {
    // This locks a number of UI elements that we don't want the user to modify simultaneously.
    // loading_icon_where is the id of the UI element that triggered this state,
    //  which influences which other elements need to be locked and which element gets the
    //  loading symbol.
    ids_for_locking.forEach((id) => {
        let element = document.getElementById(id);
        if (element) {
            element.disabled = true;
        }
    });
    document.getElementById(loading_icon_where).innerHTML += "⌛";
    if (loading_icon_where == "search_dinosaurs_button") {
        document.getElementById("search_dinosaurs_cancel_button").hidden = false;
    }
}

function unlock_location_selection_functionalities() {
    // Unlocks all locked elements.
    ids_for_locking.forEach((id) => {
        let element = document.getElementById(id);
        if (element) {
            element.disabled = false;
            element.innerHTML = element.innerHTML.replace("⌛", "");
        }
    });
    document.getElementById("search_dinosaurs_cancel_button").hidden = true;
}

function display_error_text(id, error_html, color) {
    // This displays the error text (error_html) inside of the area intended for it (id) in `color`.
    // color defaults to red, but can be set to true to use no color or to any other color to use
    //  a more positive color, e.g. to indicate that something was successfull.
    if (error_html.endsWith("<br>")) {
        console.log("Error message: " + error_html + " ends with manually written <br>!");
    } else if (error_html != "") {
        error_html += "<br>";
    }
    if (!color) {
        document.getElementById(id).innerHTML = "<font color='red'>" + error_html + "</span>";
    } else if (color !== true) {
        document.getElementById(id).innerHTML = "<font color='" + color + "'>" + error_html + "</span>";
    } else {
        document.getElementById(id).innerHTML = error_html;
    }
}

function setLocation(location) {
    // This sets the location at which we want to search for dinosaurs inside of the _data structure.
    unlock_location_selection_functionalities();
    if (location.coords) {
        // location is a device location object from the HTML 5 API
        _data.location_coordinates = location.coords.toJSON();
    } else {
        // location is a json object we created ourselves
        _data.location_coordinates = location;
    }
    var location_as_string = location_coords_JSON_to_string(_data.location_coordinates);
    display_error_text("place_name", location_as_string, true);
    display_error_text("device_location_error_text", "");
}

function userConsentsToThirdPartyServices() {
    if (!_data.consent_to_osm_usage) {
        _data.consent_to_osm_usage = confirm(
"This and other functionalities of this site pass data to third-party location services \
like overpass-api.de, openstreetmap.org and nominatim.openstreetmap.org.\nIs that okay with you?"
        )
    }
    document.getElementById("consent_to_osm").checked = _data.consent_to_osm_usage;
    return _data.consent_to_osm_usage;
}

function consentToOSM() {
    _data.consent_to_osm_usage = document.getElementById("consent_to_osm").checked;
    let options = ["revoked", "given"];
    display_error_text("consent_to_osm_confirmation_message", (
        "Consent " +
        options[Number(_data.consent_to_osm_usage)] +
        "."
    ), "#68961f")
}
