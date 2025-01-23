// Time inputs

function update_time_as_name() {
    let time = _data.million_years_ago;
    var time_as_name;
    if (time >= 66 && time <= 100) {
        time_as_name = "Late Cretaceous";
    } else if (time >= 101 && time <= 145) {
        time_as_name = "Early Cretaceous";
    } else if (time >= 146 && time <= 161) {
        time_as_name = "Late Jurassic";
    } else if (time >= 162 && time <= 174) {
        time_as_name = "Middle Jurassic";
    } else if (time >= 175 && time <= 201) {
        time_as_name = "Early Jurassic";
    } else if (time >= 202 && time <= 237) {
        time_as_name = "Late Triassic";
    } else if (time >= 238 && time <= 247) {
        time_as_name = "Middle Triassic";
    } else if (time >= 248 && time <= 252) {
        time_as_name = "Early Triassic";
    }
    display_error_text("time_as_name", time_as_name + ",", true);
}

function on_time_change(cause) {
    var time = document.getElementById(cause).value;
    if (cause == "time_as_text") {
        document.getElementById("time_as_range").value = time;
    } else if (cause == "time_as_range") {
        document.getElementById("time_as_text").value = time;
    }
    _data.million_years_ago = time;
    update_time_as_name();
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

