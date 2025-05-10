// Time inputs

const _time_periods = [
    {name: "Late Cretaceous", year_min: 66, year_max: 100},
    {name: "Early Cretaceous", year_min: 101, year_max: 145},
    {name: "Late Jurassic", year_min: 146, year_max: 161},
    {name: "Middle Jurassic", year_min: 162, year_max: 174},
    {name: "Early Jurassic", year_min: 175, year_max: 201},
    {name: "Late Triassic", year_min: 202, year_max: 237},
    {name: "Middle Triassic", year_min: 238, year_max: 247},
    {name: "Early Triassic", year_min: 248, year_max: 252},
]

function update_time_as_name() {
    let time = _data.million_years_ago;
    var time_as_name;
    for (let i=0; i<_time_periods.length; i++) {
        if (time <= _time_periods[i].year_max) {
            time_as_name = _time_periods[i].name;
        }
    }
    display_error_text("time_as_name", time_as_name + ",", true);
}

function switch_time_min_and_max() {
    console.log("switch !");
    [_data.million_years_ago_min, _data.million_years_ago_max] = [_data.million_years_ago_max, _data.million_years_ago_min];
    initialize_ui_min_and_max_time_from_cookies();
}

function set_time_min(time) {
    document.getElementById("time_as_range_to").value = time;
    document.getElementById("time_as_text_to").value = time;
    _data.million_years_ago_min = +time;
}

function set_time_max(time) {
    document.getElementById("time_as_range_from").value = time;
    document.getElementById("time_as_text_from").value = time;
    _data.million_years_ago_max = +time;
}

function set_time_min_and_max(time) {
    document.getElementById("time_as_range").value = time;
    document.getElementById("time_as_text").value = time;
    _data.million_years_ago = +time;
    update_time_as_name();
    set_time_min(time);
    set_time_max(time);
}

function get_selected_time_min() {
    if (_data.use_time_range) {
        return _data.million_years_ago_min;
    } else {
        return _data.million_years_ago;
    }
}

function get_selected_time_max() {
    if (_data.use_time_range) {
        return _data.million_years_ago_max;
    } else {
        return _data.million_years_ago;
    }
}

function on_time_change(cause) {
    var time = document.getElementById(cause).value;
    // simple time selection
    if (!_data.use_time_range) {
        set_time_min_and_max(time)
    // time range selection
    } else {
        if (cause.includes("_from")) {
            set_time_max(time);
        } else if (cause.includes("_to")) {
            set_time_min(time);
        }
        if (_data.million_years_ago_min > _data.million_years_ago_max) {
            console.log("min: " + _data.million_years_ago_min);
            console.log("max: " + _data.million_years_ago_max);
            console.log("min > max: " + (_data.million_years_ago_min > _data.million_years_ago_max));
            switch_time_min_and_max();
        }
    }
}

function useTimeRange() {
    let use_range = document.getElementById("use_time_range").checked;
    if (use_range == true) {
        document.getElementById("time_simple").hidden = true;
        document.getElementById("time_complicated").hidden = false;
    } else {
        document.getElementById("time_simple").hidden = false;
        document.getElementById("time_complicated").hidden = true;
    }
    _data.use_time_range = use_range;
}

