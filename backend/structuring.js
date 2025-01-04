

function build_places_tree(_places) {
    for (let key in _places) {
        let place_entry = _places[key];
        if (place_entry.is_in) {
            let parent = _places[place_entry.is_in];
            if (!parent.contains) {
                parent.contains = {};
            }
            parent.contains[key] = place_entry;
        }
        // dinosaur entries
        place_entry.lives = new Set();
        place_entry.lives_extended = new Set();
        place_entry.lives_in_children = new Set();
        place_entry.lives_extended_in_children = new Set();
    }
}

function clear_dinos_from_place_tree(_places) {
    for (let key in _places) {
        let place_entry = _places[key];
        place_entry.lives = new Set();
        place_entry.lives_extended = new Set();
        place_entry.lives_in_children = new Set();
        place_entry.lives_extended_in_children = new Set();
        place_entry.has_dinosaurs = false;
        place_entry.has_user_location = false;
    }
}

function add_dino_to_place(place_entry, dino_name, dino_list_name, in_children) {
    in_children = in_children || "";
    place_entry.has_dinosaurs = true;
    place_entry[dino_list_name + in_children].add(dino_name);
    if (place_entry.is_in) {
        add_dino_to_place(_places[place_entry.is_in], dino_name, dino_list_name, "_in_children")
    }
}

var _dinos_in_tree;

function add_dinos_to_places_tree(_places, _dinos, year_min, year_max) {
    _dinos_in_tree = new Set();
    for (let dino_name in _dinos) {
        let dino_entry = _dinos[dino_name];
        if (year_min > dino_entry.year_max || year_max < dino_entry.year_min) {
            continue;
        }
        _dinos_in_tree.add(dino_name);
        for (let i=0; i<dino_entry.lives.length; i++) {
            let place_entry = _places[dino_entry.lives[i]];
            add_dino_to_place(place_entry, dino_name, "lives");
        }
        if (dino_entry.lives_extended) {
            for (let i=0; i<dino_entry.lives_extended.length; i++) {
                let place_entry = _places[dino_entry.lives_extended[i]];
                add_dino_to_place(place_entry, dino_name, "lives_extended");
            }
        }
    }
}