
function show_web_form() {
    // This shortens the text displayed at the top of the page and adds the interface in its stead.
    _data.showing_form = true;
    document.getElementById("intro-text").innerHTML = document.querySelector("meta[name=description]").getAttribute("content");
    document.getElementById("search-form").hidden = false;
    document.getElementById("privacy").hidden = true;
    document.getElementById("about").hidden = true;
    document.getElementById("sources").hidden = true;
}

function hide_web_form() {
    // This hides the web form and shows the info text instead.
    _data.showing_form = false;
    window.location.reload();
}

function show_privacy () {
    document.getElementById("intro-text").hidden = true;
    document.getElementById("search-form").hidden = true;
    document.getElementById("privacy").hidden = false;
    document.getElementById("about").hidden = true;
    document.getElementById("sources").hidden = true;
}

function show_about() {
    document.getElementById("intro-text").hidden = true;
    document.getElementById("search-form").hidden = true;
    document.getElementById("privacy").hidden = true;
    document.getElementById("about").hidden = false;
    document.getElementById("sources").hidden = true;
}

function show_sources() {
    document.getElementById("intro-text").hidden = true;
    document.getElementById("search-form").hidden = true;
    document.getElementById("privacy").hidden = true;
    document.getElementById("about").hidden = true;
    document.getElementById("sources").hidden = false;
}

function chooseOption() {
    var selected_value = document.getElementById("hamburger_menu").value;
    if (selected_value == "options") {
        return;
    } else if (selected_value == "start_page") {
        hide_web_form();
    } else if (selected_value == "sources") {
        show_sources();
    } else if (selected_value == "about") {
        show_about();
    } else if (selected_value == "privacy") {
        show_privacy();
    }
    document.getElementById("hamburger_menu").value = "options";
}

function exit_side_page() {
    // This function is for exiting the "side pages" (about, sources, privacy) by pressing the "< Back" button on these pages.
    // It takes the user back to the standard dino-search-form-site or to the start page, depending on which one the user came
    //  from.
    if (_data.showing_form) {
        show_web_form();
    } else {
        window.location.reload();
    }
    // This entire function could be replaced with window.location.reload(), but that's less efficient than the show_web_form() call.
}

function exit_privacy_side_page() {
    // empty confirmation text of privacy page when leaving it
    display_error_text('consent_to_osm_confirmation_message', '');
    exit_side_page();
}
