
// Caches which user-entered locations lie within or around which dinosaur locations

_location_cache = {};

function assign_user_place_cache_id(user_place) {
    // Assigns user_place (value of _data.locations_coordinates) a cache id, used for checking place intersections in the cache.
    if (user_place.latitude) {
        user_place.cache_id = String(user_place.latitude) + "," + String(user_place.longitude);
    } else if (user_place.id) {
        user_place.cache_id = user_place.id;
    }
}

function add_to_cache(user_place, dino_place, overlaps) {
    // Tells the cache whether user_place (value of _data.location_coordinates) and dino_place (id of an OSM relation) overlap.
    if (user_place.ids) {
        return;
    }
    let user_place_cacheline = _location_cache[user_place.cache_id];
    if (!user_place_cacheline) {
        _location_cache[user_place.cache_id] = {};
        user_place_cacheline = _location_cache[user_place.cache_id];
    }
    user_place_cacheline[dino_place] = overlaps;
}

function get_from_cache(user_place, dino_place) {
    // Retrieves from the cache whether user_place (value of _data.location_coordinates) and dino_place (id of an OSM relation) overlap.
    // Returns undefined in case of a cache miss.
    if (user_place.ids) {
        let false_counter = 0;
        for (const id of user_place.ids) {
            let cache_hit = get_from_cache({id: id}, dino_place);
            if (cache_hit == true) {
                return true;
            } else if (cache_hit == false) {
                false_counter += 1;
            }
        }
        if (false_counter == user_place.ids.length) {
            return false;
        } else {
            return undefined;
        }
    }
    let user_place_cacheline = _location_cache[user_place.cache_id];
    if (!user_place_cacheline) {
        return undefined;
    } else {
        return user_place_cacheline[dino_place];
    }
}
