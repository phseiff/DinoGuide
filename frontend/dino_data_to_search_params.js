
// Place stuff

function select_dino_place_name(place_name) {
    if (_continents[place_name]) {
        setLocation({
            display_name: place_name + " (combinatory area)",
            place_name: place_name,
            is_relation: true,
            ids: get_ids_from_continent(place_name),
        });
    } else {
        setLocation({
            display_name: place_name + " (optimized area)",
            place_name: place_name,
            is_relation: true,
            id: _places[place_name].id,
        });
    }
}

function place_name_to_place_selection_button(place_name) {
    return (
        "<a class='search_param_link' href='#' onclick='select_dino_place_name(\"" + place_name + "\");'"
        + " title='Select as search location'"
        + ">"
        + place_name
        + "</a>"
    );
}

// Time stuff

function set_time_point(time) {
    document.getElementById("use_time_range").checked = false;
    useTimeRange();
    set_time_min_and_max(time);
}

function set_time_range(time_min, time_max) {
    document.getElementById("use_time_range").checked = true;
    useTimeRange();
    set_time_min(time_min);
    set_time_max(time_max);
}

function time_str_to_time_link(time_min, time_max, str, typ) {
    let func;
    let title;
    let args;
    let switch_mode_str = "switch time selection mode and ";
    // time range
    if (typ == "range") {
        title = "select as search time range";
        if (!_data.use_time_range) {
            title = switch_mode_str + title;
        }
        func = "set_time_range";
        args = [time_min, time_max];
    }
    // time point
    else if (typ == "point") {
        title = "select as search time";
        if (_data.use_time_range) {
            title = switch_mode_str + title;
        }
        func = "set_time_point";
        args = [time_min]
    // time min
    } else if (typ == "min") {
        if (_data.use_time_range) {
            title = "select as search time range end point";
            func = "set_time_min";
        } else {
            title = "select as search time";
            func = "set_time_point";
        }
        args = [time_min];
    // time max
    } else if (typ == "max") {
        if (_data.use_time_range) {
            title = "select as search time range start point";
            func = "set_time_max";
        } else {
            title = "select as search time";
            func = "set_time_point";
        }
        args = [time_max];
    }
    // render
    return (
        "<a href='#' class='search_param_link' onclick='" + func + "(" + args.join(", ") + ")'" +
        " title='" + title +
        "' >" + str + "</a>"
    )
}

function time_to_time_links(time_min, time_max) {
    if (time_min == time_max) {
        return time_str_to_time_link(time_min, time_max, String(time_min), "point");
    } else {
        return (
            "from " +
            time_str_to_time_link(time_min, time_max, String(time_max), "max") +
            " " +
            time_str_to_time_link(time_min, time_max, "-", "range") +
            " " +
            time_str_to_time_link(time_min, time_max, String(time_min), "min")
        )
    }
}
