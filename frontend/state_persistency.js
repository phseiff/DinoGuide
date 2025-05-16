// Function to load from cookies:
function initialize_ui_min_and_max_time_from_cookies() {
    set_time_max(_data.million_years_ago_max);
    set_time_min(_data.million_years_ago_min);
}

function initialize_from_cookies() {
    let name = "dino_guide_app_state=";
    let result = document.cookie.split(name);
    if (result.length >= 2) {
        result = result[1].split(";")[0];
        _data = JSON.parse(result);
    }
    // fill forms from _data:
    if (_data.showing_form) {
        show_web_form();
    }
    document.getElementById("place_use_system_location").checked = _data.use_device_location;
    if (_data.use_device_location) {
        useDeviceLocation();
    }
    document.getElementById("place_name").innerHTML = location_coords_JSON_to_string(_data.location_coordinates) + "<br>";

    document.getElementById("time_as_text").value = _data.million_years_ago;
    document.getElementById("time_as_range").value = _data.million_years_ago;
    document.getElementById("consent_to_osm").checked = _data.consent_to_osm_usage;
    update_time_as_name();
    document.getElementById("use_time_range").checked = _data.use_time_range;
    useTimeRange();
    initialize_time_period_dropdowns();
    initialize_ui_min_and_max_time_from_cookies();
    // Initialize search
    _search_is_ready = true;
    build_places_tree(_places);
    parse_dino_lives_in_continent_names();
    roundDinoLivingTime();
    errorCheckDinoData();
    // Dino display settings
    if (!_data.dino_display_settings) {
        _data.dino_display_settings = default_dino_display_settings;
    }
    if (_data.dino_display_settings.shown) {
        toggle_display_settings_vis(_data.dino_display_settings.shown);
    }
    document.getElementById("select_dino_ordering").value = _data.dino_display_settings.sort_by;
    document.getElementById("split_dinos_by_certainty").checked = _data.dino_display_settings.split_dinos_by_certainty;
    document.getElementById("simplify_locations").checked = _data.dino_display_settings.simplify_locations;
}

// Function to save to cookies:
window.addEventListener("beforeunload", function(event){
    document.cookie = "dino_guide_app_state=" + JSON.stringify(_data) + "; expires=Tue, 19 Jan 2038 04:14:07 GMT";
});

document.addEventListener('DOMContentLoaded', initialize_from_cookies, false);

// Default values for everything that we store as cookies:
var _search_is_ready = false;
let default_dino_display_settings = {
    shown: false,
    split_dinos_by_certainty: true,
    simplify_locations: true,
    sort_by: "name",
}
var _data = {
    use_device_location: false,
    location_coordinates: {},
    consent_to_osm_usage: false,
    use_device_time: false,
    million_years_ago: 66,

    use_time_range: false,
    million_years_ago_min: 66,
    million_years_ago_max: 66,

    dino_display_settings: default_dino_display_settings,
}
