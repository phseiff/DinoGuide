
function toggle_display_settings_vis(show) {
    if (show) {
        document.getElementById("dino_display_settings_hidden_mode").hidden = true;
        document.getElementById("dino_display_settings_shown_mode").hidden = false;
    } else {
        document.getElementById("dino_display_settings_hidden_mode").hidden = false;
        document.getElementById("dino_display_settings_shown_mode").hidden = true;
    }
    _data.dino_display_settings.shown = show;
}

function toggle_split_dinosaurs_by_certainty() {
    _data.dino_display_settings.split_dinos_by_certainty = document.getElementById("split_dinos_by_certainty").checked;
    reload_dinosaur_display_if_needed();
}

function toggle_simplify_dino_locations() {
    _data.dino_display_settings.simplify_locations = document.getElementById("simplify_locations").checked;
    reload_dinosaur_display_if_needed();
}

function toggle_show_wikipedia_images() {
    _data.dino_display_settings.show_wikipedia_images = document.getElementById("show_wikipedia_images").checked;
    reload_dinosaur_display_if_needed();
}

function toggle_invert_ordering() {
    _data.dino_display_settings.invert_ordering = document.getElementById("invert_ordering").checked;
    reload_dinosaur_display_if_needed();
}

function select_dino_ordering_method() {
    let ordering_method = document.getElementById("select_dino_ordering").value;
    _data.dino_display_settings.sort_by = ordering_method;
    reload_dinosaur_display_if_needed();
}

function dinosaur_sorting(a, b) {
    let ordered_by = _data.dino_display_settings.sort_by;
    let cmp;
    let diet_to_ranking = {
        [INSECTIVORE]: 0,
        [INSECTIVORE_OR_CARNIVORE]: 1,
        [PISCIVORE]: 2,
        [PISCIVORE_OR_CARNIVORE]: 3,
        [PISCIVORE_AND_CARNIVORE]: 4,
        [CARNIVORE]: 5,
        [CARNIVORE_OR_OMNIVORE]: 6,
        [OMNIVORE]: 7,
        [HERBIVORE_OR_OMNIVORE]: 8,
        [HERBIVORE]: 9,
        [UNKNOWN_DIET]: 10,
    };
    if (ordered_by === "appearance") {
        cmp = - (_dinos[a].year_max - _dinos[b].year_max);
    } else if (ordered_by === "extinction") {
        cmp = - (_dinos[a].year_min - _dinos[b].year_min);
    } else if (ordered_by === "diet") {
        cmp = diet_to_ranking[_dinos[a].eats] - diet_to_ranking[_dinos[b].eats];
    }
    if (ordered_by == "name" || cmp == 0) {
        cmp = (a > b) ? 1 : -1;
    }
    if (_data.dino_display_settings.invert_ordering) {
        cmp = -cmp;
    }
    return cmp;
}
