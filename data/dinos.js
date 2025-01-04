
var [INSECTIVORE, CARNIVORE, HERBIVORE, OMNIVORE, HERBIVORE_OR_OMNIVORE] = [0, 1, 2, 4, 5];

var _continents = {
    ["South America"]: [
        "Argentina",
        "Bolivia",
        "Brazil",
        "Chile",
        "Colombia",
        "Ecuador",
        // ^(this includes some islands that may not have yet existed during the mesozoic (or may have been unconnected to the mainland), but so be it)
        "Guyana",
        "Paraguay",
        "Peru",
        "Suriname",
        "Uruguay",
        "Venezuela",
        "French Guiana",
    ],
    ["Peninsular Spain"]: [
        "Andalusia",
        "Aragon",
        "Asturias",
        // "Balearic Islands",
        "Basque Country",
        // "Canary Islands",
        "Cantabria",
        "Castile and León",
        "Castilla-La Mancha",
        "Catalonia",
        "Extremadura",
        "Galicia",
        "La Rioja",
        "Madrid",
        "Navarre",
        "Valencia",
    ]
}

function fuse(l) {
    // turns a lift of strings and lists of lists into a list of strings w/o duplicates in it
    var l2 = [];
    for (var i=0; i<l.length; i++) {
        if (typeof l[i] == "object") {
            for (var j=0; j<l[i].length; j++) {
                l2.push(l[i][j])
            }
        } else {
            l2.push(l[i]);
        }
    }
    ls2 = [...new Set(l2)];
    return l2;
}

var _dinos = {
    ["Aardonyx celestae"]: {
        year_max: 201.3, // which year is max and which is min is based on the absolute value of the year.
        year_min: 190.8, // ofc the year value is in millions of years.
        eats: HERBIVORE,
        /*
        lives:
            This is the area that the animal is known to have lived in, based on where it was found.
            This might be the exact location where it was found, or a wider area based on multiple finds,
            but it attempts to be a conservative estimate.
            We attempt not to undershoot the area (e.g. if the fossils are known from only one location
            that happens to be known for exceptionally good fossil preservation, we will assume a wider
            distribution than just this one place), but also attempt not to overshoot the location (i.e.
            we won't assume that an animal found in only one location lived in every place that was
            connected to that place by land).
            This list HAS to contain only places that exist in the _places table. Things like rock formations
            that are not present on OSM (and therefore not in the _places table either) can not be in the
            `lives` list.
            The `lives` list HAS to be present for every entry.
        lives_precise:
            An optional list similar to `lives` that is more restricted to the actual area where the fossil was found.
            This might be the name of the relevant rock formations, or the name of individual US states tha fossils were
            found in if the genum was found in multiple US states.
            In cases where the `lives` list contains a value judgement that assumes a wider area than what can be derived
            from fossil found locations, the `lives_precise` list HAS to be defined.
            Otherwise, it does not have to be present, but CAN be present.
            The entries in the `lives_precise`-list CAN be present in the _places table, but don't have to be.
        lives_extended:
            Planned feature that might not make it into the final product.
            This list reflects the places that the animal could have reached by foot, at the time that it lived,
            without swimming, if it started its journey at locations where its fossils were found.
            If there are specific reasons to assume that the animal did not leave certain regions (e.g. we know many fossils
            from different fossil sites all over southern Gondwana, but not over northern Gondwana), then these reasons
            override the approach escribed above.
            The `lives_extended`-list is intended to be a maximum realistic estimate of where the animal could have lived.
            The entries in the `lives_extended`-list HAVE to be present in the _places table.
            The `lives_extended`-list is optional.
        */
        lives_precise: ["Elliot Formation"],
        lives: ["South Africa", "Lesotho"],
        wikipedia: "https://en.wikipedia.org/wiki/Aardonyx",
    },
    ["Abdarainurus barsboldi"]: {
        year_max: 85,
        year_min: 72.1,
        eats: HERBIVORE,
        lives_precise: ["Alagteeg Formation"],
        lives: ["Mongolia"],
        wikipedia: "https://en.wikipedia.org/wiki/Abdarainurus",
    },
    ["Abditosaurus kuehnei"]: {
        year_max: 71,
        year_min: 70,
        year_max_precise: 70.5,
        year_min_precise: 70.5,
        eats: HERBIVORE,
        lives_precise: ["Tremp Formation"],
        // ^ tempting to turn this into pyrenees (the mountains) but idk if they even existed back then.
        // so we will turn it into spain (and leave out portugal).
        lives: _continents["Peninsular Spain"],
        wikipedia: "https://en.wikipedia.org/wiki/Abditosaurus",
    },
    ["Abelisaurus comahuensis"]: {
        year_max: 80,
        year_min: 80,
        eats: CARNIVORE,
        // wikipedia openly states where it lived, so no reverse-engineering from fossil sites this time!
        lives: _continents["South America"],
        wikipedia: "https://en.wikipedia.org/wiki/Abelisaurus",
    },
    ["Abrictosaurus consors"]: {
        year_max: 199,
        year_min: 196,
        eats: HERBIVORE_OR_OMNIVORE,
        // also known from Elliot Formation, but Wikipedia states south africa & Lesotho directly
        lives: ["South Africa", "Lesotho"],
        wikipedia: "https://en.wikipedia.org/wiki/Abrictosaurus",
    },
    ["Abrosaurus dongpoi"]: {
        year_max: 168,
        year_min: 161,
        eats: HERBIVORE,
        // the wikipedia article says "Asia", but the study linked as a source only mentions China
        // (where it was found in a single rock formation),
        // and extrapolating from China to the entirety of Asia (huge and includes the japanese island chain)
        // seems a bit wild to me.
        lives: ["China"],
        wikipedia: "https://en.wikipedia.org/wiki/Abrosaurus",
    },
    ["Abydosaurus mcintoshi"]: {
        year_max: 146,
        year_min: 145,
        year_max_precise: 145.5,
        year_min_precise: 145.5,
        eats: HERBIVORE,
        lives: ["Utah"],
        // This would be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        wikipedia: "https://en.wikipedia.org/wiki/Abydosaurus",
    },
    ["Acantholipan gonzalezi"]: {
        year_max: 84,
        year_min: 83.6,
        year_max_precise: 83.6,
        eats: HERBIVORE,
        lives: ["Mexico"],
        wikipedia: "https://en.wikipedia.org/wiki/Acantholipan",
    },
    ["Acanthopholis horrida"]: {
        year_max: 97,
        year_min: 97,
        eats: HERBIVORE,
        lives_precise: ["England"],
        // we're using geat britain here bc why would the dinosaur not go to scotland
        // (plus all the remains come from Kent, which surely isn't the limit to where it lived)
        lives: ["Great Britain"],
        wikipedia: "https://en.wikipedia.org/wiki/Acanthopholis",
    },
    ["Achelousaurus horneri"]: {
        year_max: 74.2,
        year_min: 74,
        year_min_precise: 74.2,
        eats: HERBIVORE,
        // This might be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        // (Wikipedia even says that it lived in North America, but we're using the state it was found in as areplacement)
        lives: ["Montana"],
        wikipedia: "https://en.wikipedia.org/wiki/Achelousaurus",
    },
    ["Acheroraptor temertyorum"]: {
        year_max: 67.2,
        year_min: 66,
        eats: CARNIVORE,
        // This might be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        lives: ["Montana"], // Hell Creek Formation,
        wikipedia: "https://en.wikipedia.org/wiki/Acheroraptor",
    },
    ["Achillesaurus manazzonei"]: {
        year_max: 85,
        year_min: 85,
        eats: INSECTIVORE,
        lives_precise: ["Bajo de la Carpa Formation"],
        lives: ["Argentina"],
    },
    ["Achillobator giganticus"]: {
        year_max: 96,
        year_min: 89,
        eats: CARNIVORE,
        lives_precise: ["Bayan Shireh Formation"],
        lives: ["Mongolia"],
        wikipedia: "https://en.wikipedia.org/wiki/Achillobator",
    },
    ["Acristavus gagslarsoni"]: {
        year_max: 79,
        year_min: 79,
        eats: HERBIVORE,
        // This might be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        lives_precise: ["Two Medicine Formation", "Wahweap Formation"],
        lives: ["Montana", "Utah"],
        wikipedia: "https://en.wikipedia.org/wiki/Acristavus",
    },
    ["Acrocanthosaurus atokensis"]: {
        year_max: 113,
        year_min: 110,
        eats: CARNIVORE,
        // This would be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        lives_precise: ["Oklahoma", "Texas", "Wyoming", "Maryland"],
        lives: ["Oklahoma", "Texas", "Wyoming", "Maryland"],
        wikipedia: "https://en.wikipedia.org/wiki/Acrocanthosaurus",
    },
    ["Acrotholus audeti"]: {
        year_max: 84,
        year_min: 83.5,
        eats: HERBIVORE,
        lives: ["Canada"], // Milk River Formation
        wikipedia: "https://en.wikipedia.org/wiki/Acrotholus",
    },
    // Actiosaurus: nomen dubium.
    ["Adamantisaurus mezzalirai"]: {
        year_max: 75,
        year_min: 75,
        eats: HERBIVORE,
        lives: _continents["South America"],
        wikipedia: "https://en.wikipedia.org/wiki/Adamantisaurus",
    },
    ["Adasaurus mongoliensis"]: {
        year_max: 70,
        year_min: 68,
        eats: CARNIVORE,
        lives: ["Mongolia"], // Nemegt Formation
        wikipedia: "https://en.wikipedia.org/wiki/Adasaurus",
    },
    ["Adelolophus hutchisoni"]: {
        year_max: 78,
        year_min: 78,
        eats: HERBIVORE,
        // This might be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        lives: ["Utah"],
        wikipedia: "https://en.wikipedia.org/wiki/Adelolophus",
    },
    ["Adeopapposaurus mognai"]: {
        year_max: 200,
        year_min: 183,
        eats: HERBIVORE,
        lives_precise: ["Cañón del Colorado Formation"],
        lives: ["Argentina"],
        wikipedia: "https://en.wikipedia.org/wiki/Adeopapposaurus",
    },
    ["Adratiklit boulahfa"]: {
        year_max: 168,
        year_min: 164,
        eats: HERBIVORE,
        lives_precise: ["El Mers III Formation"],
        lives: ["Morocco"],
        wikipedia: "https://en.wikipedia.org/wiki/Adratiklit",
    },
    ["Adynomosaurus arcanus"]: {
        year_max: 70,
        year_min: 70,
        eats: HERBIVORE,
        lives_precise: ["Catalonia"],
        lives: _continents["Peninsular Spain"],
        wikipedia: "https://en.wikipedia.org/wiki/Adynomosaurus",
    },
    ["Aegyptosaurus baharijensis"]: {
        year_max: 100,
        year_min: 94,
        eats: HERBIVORE,
        // The wikipedia article suggest spread throughout the entirety of Africa,
        // but we don't have a fitting entry in _continents for that rn.
        lives_precise: ["Bahariya Formation"],
        lives: ["Egypt"],
        wikipedia: "https://en.wikipedia.org/wiki/Aegyptosaurus",
    },
    ["Aeolosaurus rionegrinus"]: {
        year_max: 83,
        year_min: 66,
        eats: HERBIVORE,
        lives_precise: ["Brazil", "Argentina"], 
        // ^ presumably, since the article does not elaborate on which of both species in the genum were found at which site
        lives: _continents["South America"],
        wikipedia: "https://en.wikipedia.org/wiki/Aeolosaurus",
    },
    ["Aeolosaurus colhuehuapensis"]: {
        year_max: 83,
        year_min: 66,
        eats: HERBIVORE,
        lives_precise: ["Brazil", "Argentina"],
        // ^ presumably, since the article does not elaborate on which of both species in the genum were found at which site
        lives: _continents["South America"],
        wikipedia: "https://en.wikipedia.org/wiki/Aeolosaurus",
    },
    ["Aepisaurus elephantinus"]: {
        year_max: 101,
        year_min: 100,
        eats: HERBIVORE,
        year_max_precise: 100.5,
        year_min_precise: 100.5,
        lives_precise: ["Grès vert"],
        lives: ["Metropolitan France"],
        wikipedia: "https://en.wikipedia.org/wiki/Aepisaurus",
    },
    ["Aepyornithomimus tugrikinensis"]: {
        year_max: 75,
        year_min: 75,
        eats: HERBIVORE,
        lives_precise: ["Djadokhta Formation"],
        lives: ["Mongolia"],
        wikipedia: "https://en.wikipedia.org/wiki/Aepyornithomimus",
    },
    ["Aerosteon riocoloradensis"]: {
        year_max: 83.6,
        year_min: 72.1,
        // ^ Campanian
        eats: CARNIVORE,
        lives_precise: ["Anacleto Formation"],
        lives: ["Argentina"],
        wikipedia: "https://en.wikipedia.org/wiki/Aerosteon",
    },
}

// ToDo: find the short name for each of them and assign them this short name as a "name"-attribute if it is unique.

// TODO: find a way to make it possible to read out the .lives w/ the _continents-entry-names still intact.

// Error correction

function errorCheckDinoData() {
    for (const [dino_name, dino_entry] of Object.entries(_dinos)) {
        for (const [_, place_name] of Object.entries(dino_entry.lives)) {
            if (!_places[place_name]) {
                throw new Error(dino_name + " has invalid place name " + place_name + " in .lives-attribute.");
            }
        }
        if (dino_entry.lives_extended) {
            for (const [_, place_name] of Object.entries(dino_entry.lives_extended)) {
                if (!_places[place_name]) {
                    throw new Error(dino_name + " has invalid place name " + place_name + " in .lives_extended-attribute.");
                }
            }
        }
    }
}
