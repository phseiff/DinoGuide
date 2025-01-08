
/*
Every entry in _places has the following attributes:

Mandatory:
* id: The OSM id.

Optional:
* area_group: Every place belongs into one area group. Two places that are in the same area group may be wholle
              separate from each other (no overlap or intersection), or one of them may be completely contained
              within the other, but they may not partially intersect. The area_group attribute takes a string
              value that states which area group it belongs into; if no area group is specified, the place is
              assigned the area group "government_borders", which contains countries and municipalities of countries
              (except for countries that are in border disputes with one another, who get their own groups).
              The purpose of area groups is that the no-partial-intersections rule gives the
              backend/search_dinosaurs.js code guarantees that can be used for oprimizations.
* is_in: The name (index of _places) of the (or a) country or area that the place is in. Used for optimizations.

Automatically generated via code:
* contains:   _places[foobar].contains is a name-to-object mapping of places, similar to _places, but only containing
              the places whose is_in attribute is foobar. It points to the same objects (rather than copies of them) as
              _places.
* descendents:
              A set containing the ids of children, grandchildren etc of the place, as defined by the is_in attributes.
The following attributes are cleared and re-generated for every dino search based on the timespan selected:
* lives:      A set containing the names (keys of _dinos) of dinosaurs that lived during the selected timespan in the
              entirety (not just sub-places!) of the place, according to the dinosaur's lives-attribute.
* lives_extended:
              Same as `lives`, but based on the dinosaurs' `lives_extended`-attributes rather than their `lives`-
              attributes.
* lives_in_children:
              Like the `lives` attribute, but it only counts dinosaurs that lived in children, grandchildren etc (as
              defined by the is_in attributes) of the place, rather than the place itself.
* lives_extended_in_children:
              Like the `lives_in_children` attribute, but for `lives_extended` rather than `lives`.
* has_dinosaurs:
              true: Means that the place has dinosaurs in its lives*-attributes that have not yet been found to have
                    lived at the user-selected search location.
              false: Means the negation of true.
              This attribute may never have false negatives, but may have temporary false positives during the search
              process.
* has_user_location:
              true: Means that the user-selected search location is either within this place, or intersects with it.
              false: Means the negation of true.
              This attribute starts off as false, but may get set to true during the search to avoid duplicate checks.
*/

var _places = {
    // Africa:
    ["Egypt"]: {
        id: 1473947,
    },
    ["Morocco"]: {
        id: 3630439,
    },
    ["South Africa"]: {
        id: 87565,
    },
    ["Lesotho"]: {
        id: 2093234,
    },

    // Europe:
    // Austria
    ["Austria"]: {
        id: 16239,
    },
    // Belgium
    ["Belgium"]: {
        id: 52411,
    },
    // Britain:
    ["Great Britain"]: {
        id: 6038068,
    },
    ["England"]: {
        id: 58447,
        is_in: "Great Britain",
    },
    ["Wales"]: {
        id: 58437,
        is_in: "Great Britain",
    },
    // Croatia
    ["Croatia"]: {
        id: 214885,
    },
    // Czech Republic
    ["Czechia"]: {
        id: 51684,
    },
    // Denmark
    ["Denmark"]: {
        id: 50046,
    },
    // France
    ["Metropolitan France"]: {
        id: 1403916,
    },
    // Germany
    ["Germany"]: {
        id: 51477,
    },
    ["Lower Saxony"]: {
        id: 62771,
        is_in: "Germany",
    },
    // Hungary
    ["Hungary"]: {
        id: 21335,
    },
    // Italy
    ["Italy"]: {
        id: 365331,
    },
    // Netherlands
    ["Netherlands"]: {
        id: 47796,
    },
    // Norway
    ["Norway"]: {
        id: 2978650,
    },
    // Poland
    ["Poland"]: {
        id: 49715,
    },
    // Portugal
    ["Portugal"]: {
        id: 295480,
    },
    // Romania
    ["Romania"]: {
        id: 90689,
    },
    // Spain
    ["Spain"]: {
        id: 1311341,
    },
    ["Andalusia"]: {
        id: 349044,
        is_in: "Spain",
    },
    ["Aragon"]: {
        id: 349045,
        is_in: "Spain",
    },
    ["Asturias"]: {
        id: 349033,
        is_in: "Spain",
    },
    ["Basque Country"]: {
        id: 11107464,
        is_in: "Spain",
    },
    ["Cantabria"]: {
        id: 349013,
        is_in: "Spain",
    },
    ["Castile and León"]: {
        id: 349041,
        is_in: "Spain",
    },
    ["Castilla-La Mancha"]: {
        id: 349052,
        is_in: "Spain",
    },
    ["Catalonia"]: {
        id: 349053,
        is_in: "Spain",
    },
    ["Extremadura"]: {
        id: 349050,
        is_in: "Spain",
    },
    ["Galicia"]: {
        id: 349036,
        is_in: "Spain",
    },
    ["La Rioja"]: {
        id: 348991,
        is_in: "Spain",
    },
    ["Madrid"]: {
        id: 5326784,
        is_in: "Spain",
    },
    ["Navarre"]: {
        id: 349027,
        is_in: "Spain",
    },
    ["Valencia"]: {
        id: 349043,
        is_in: "Spain",
    },
    // Switzerland
    ["Switzerland"]: {
        id: 51701,
    },
    // Ukraine
    ["Ukraine"]: {
        id: 60199,
    },

    // South America:
    ["Argentina"]: {
        id: 286393,
    },
    ["Bolivia"]: {
        id: 252645,
    },
    ["Brazil"]: {
        id: 59470,
    },
    ["Chile"]: {
        id: 167454,
    },
    ["Colombia"]: {
        id: 120027,
    },
    ["Ecuador"]: {
        id: 108089,
    },
    ["Guyana"]: {
        id: 287083,
    },
    ["Paraguay"]: {
        id: 287077,
    },
    ["Peru"]: {
        id: 288247,
    },
    ["Suriname"]: {
        id: 287082,
    },
    ["Uruguay"]: {
        id: 287072,
    },
    ["Venezuela"]: {
        id: 272644,
    },
    ["French Guiana"]: {
        id: 1260551,
    },
    /*["South America"]: {
        // South America is on OSM, but only as a node, not as a relation, so we need to reconstruct it
        id: [
            286393, // Argentina
            252645, // Bolivia
            59470, // Brazil
            167454, // Chile
            120027, // Colombia
            108089, // Ecuador
            // ^(this includes some islands that may not have yet existed during the mesozoic (or mayhave been unconnected to the mainland), but so be it)
            287083, // Guyana
            287077, // Paraguay
            288247, // Peru
            287082, // Suriname
            287072, // Uruguay
            272644, // Venezuela
            1260551, // French Guiana
        ]
    },*/

    // Asia:
    ["China"]: {
        id: 270056, // This includes some islands outside of the mainland, which may be a problem for reasons already explained for (Ctrl+F) Ecuador.
    },
    ["Mongolia"]: {
        id: 161033,
    },
    ["Russia"]: {
        id: 60189,
    },

    // North America:
    ["Mexico"]: {
        id: 114686,
    },

    // USA:
    ["Canada"] : {
        id: 1428125,
    },
    ["USA"]: {
        id: 148838,
    },
    ["Utah"]: {
        id: 161993,
        is_in: "USA",
    },
    ["Montana"]: {
        id: 162115,
        is_in: "USA",
    },
    ["Oklahoma"]: {
        id: 161645,
        is_in: "USA",
    },
    ["Texas"]: {
        id: 114690,
        is_in: "USA",
    },
    ["Wyoming"]: {
        id: 161991,
        is_in: "USA",
    },
    ["Maryland"]: {
        id: 162112,
        is_in: "USA",
    },
}

// A mapping from IDs to area group names.

_area_groups_by_id = {};
