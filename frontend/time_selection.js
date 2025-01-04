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
    document.getElementById("use_system_time").checked = false;
    _data.use_device_time = false;
    update_time_as_name();
}

function use_device_time() {
    // This was an intended feature that would use the user's system time to determine the time.
    //  This way, if the user set their system time to -66million years (and their system
    //  supported this); they could learn what dinosaurs live "at the current time".
    //  This feature had to be scrapped and the corresponding checkbox (id=use_system_time) hidden,
    //  though, because I found out that the Date object in js doesn't support time frames this deep
    //  in the past.
    //  You can still try it out by un-hiding the checkbox, though, if you are really curious, I guess.
    var checkbox = document.getElementById("use_system_time");
    if (!checkbox.checked) {
        _data.use_device_time = false;
        return;
    }
    var date = new Date();
    var year = date.getFullYear();
    year = year / (10**6);
    if (year <= -66 && year >= -252) {
        year = Math.round(year);
        document.getElementById("time_as_text").value = -year;
        document.getElementById("time_as_range").value = -year;
        _data.million_years_ago = -year;
        _data.use_device_time = true;
        update_time_as_name()
    } else {
        display_error_text("device_time_error_text", "System time is not within valid range.");
        checkbox.checked = false;
        _data.use_device_time = false;
    }
}
