

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
    // Netherlands
    ["Netherlands"]: {
        id: 47796,
    },
    // Norway
    ["Norway"]: {
        id: 2978650,
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