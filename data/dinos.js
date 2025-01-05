
var [INSECTIVORE, CARNIVORE, HERBIVORE, OMNIVORE, HERBIVORE_OR_OMNIVORE,
    INSECTIVORE_OR_CARNIVORE, PESCIVORE, PESCIVORE_AND_CARNIVORE, PESCIVORE_OR_CARNIVORE] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    // Ibero-Armorican Island
}

function fuse(l) {
    // turns a list of (strings and lists of strings) into a single list of strings w/o duplicates in it
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
        year_max: 70.5,
        year_min: 70.5,
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
        year_max: 145.5,
        year_min: 145.5,
        eats: HERBIVORE,
        lives: ["Utah"],
        // This would be better if it pointed to center USA/ southern north-america, but OSM didn't have a relation for that
        wikipedia: "https://en.wikipedia.org/wiki/Abydosaurus",
    },
    ["Acantholipan gonzalezi"]: {
        year_max: 83.6,
        year_min: 83.6,
        eats: HERBIVORE,
        lives: ["Mexico"],
        wikipedia: "https://en.wikipedia.org/wiki/Acantholipan",
    },
    ["Acanthopholis horrida"]: {
        year_max: 97,
        year_min: 97,
        eats: HERBIVORE,
        lives_precise: ["Kent"],
        lives: ["England"],
        wikipedia: "https://en.wikipedia.org/wiki/Acanthopholis",
    },
    ["Achelousaurus horneri"]: {
        year_max: 74.2,
        year_min: 74.2,
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
        year_max: 100.5,
        year_min: 100.5,
        eats: HERBIVORE,
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
    // only European dinosaurs below this line
    ["Ajkaceratops kozmai"]: {
        year_max: 85,
        year_min: 85,
        eats: HERBIVORE,
        lives: ["Hungary"],
        lives_precise: ["Csehbánya Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ajkaceratops",
    },
    ["Allosaurus europaeus"]: { // might be Allosaurus fragilis
        year_max: 155,
        year_min: 143.1,
        eats: CARNIVORE,
        lives: ["Germany", "Portugal"],
        lives_precise: ["Alcobaça Formation", "Lourinhã Formation", "Tönniesberg", "Kahlberg"],
        wikipedia: "https://en.wikipedia.org/wiki/Allosaurus",
    },
    ["Alocodon kuehnei"]: {
        year_max: 161.5, // Late Jurassic, Oxfordian according to Wikipedia
        year_min: 145.0,
        eats: HERBIVORE_OR_OMNIVORE,
        lives: ["England", "Portugal"],
        lives_precise: ["Cabaços Formation", "Forest Marble", "Chipping Norton Formations"],
        wikipedia: "https://en.wikipedia.org/wiki/Alocodon",
    },
    ["Altispinax dunkeri"]: {
        year_max: 140,
        year_min: 133,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wadhurst Clay Formation"], // East Sussex
        wikipedia: "https://en.wikipedia.org/wiki/Altispinax",
    },
    // only German dinosaurs below this line
    ["Compsognathus longipes"]: {
        year_max: 150.8,
        year_min: 145,
        eats: CARNIVORE,
        lives: ["Metropolitan France", "Germany"],
        lives_precise: ["Canjuers Lagerstätte", "Solnhofen Limestone"],
        wikipedia: "https://en.wikipedia.org/wiki/Compsognathus",
    },
    ["Compsognathus sp. (of unknown species)"]: { // only teeth
        year_max: 150.8,
        year_min: 145,
        eats: CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Alcobaça Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Compsognathus",
    },
    ["Dolichosuchus cristatus"]: {
        year_max: 208,
        year_min: 208,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Löwenstein Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Dolichosuchus",
    },
    ["Efraasia minor"]: {
        year_max: 210,
        year_min: 210,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Löwenstein Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Efraasia",
    },
    ["Emausaurus ernsti"]: {
        year_max: 183,
        year_min: 182,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Ciechocinek Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Emausaurus",
    },
    ["Europasaurus holgeri"]: {
        year_max: 154,
        year_min: 151,
        eats: HERBIVORE,
        lives: ["Lower Saxony"], // island
        lives_precise: ["Süntel Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Europasaurus",
    },
    // Halticosaurus: nomen dubium
    ["Hylaeosaurus armatus"]: {
        year_max: 140,
        year_min: 136,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Grinstead Clay Formation", "Tunbridge Wells Sand Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Hylaeosaurus",
    },
    ["Hylaeosaurus sp. (of unknown species)"]: {
        year_max: 140,
        year_min: 136,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Bückeberg Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Hylaeosaurus",
    },
    ["Iguanodon bernissartensis"]: {
        year_max: 126,
        year_min: 122,
        eats: HERBIVORE,
        lives: fuse(["Belgium", "England", "Germany", _continents["Peninsular Spain"]]),
        lives_precise: ["Arcillas de Morella Formation", "Camarillas Formation", "Sainte-Barbe Clays Formation",
            "Nehden", "Wadhurst Clay Formation", "Weald Clay", "Wealden Group", "Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Iguanodon",
    },
    ["Juravenator starki"]: {
        year_max: 152, // text says "about 151 or 152", infobox says 151.5
        year_min: 151,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Painten Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Juravenator",
    },
    ["Liliensternus liliensterni"]: {
        year_max: 228,
        year_min: 201.3,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Trossingen Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Liliensternus",
    },
    ["Mantellisaurus atherfieldensis"]: {
        year_max: 130,
        year_min: 120,
        eats: HERBIVORE,
        lives: fuse(["Belgium", "England", "Germany", _continents["Peninsular Spain"]]),
        lives_precise: ["Arcillas de Morella Formation", "Lower Greensand Group", "Nehden",
            "Sainte-Barbe Clays Formation", "Vectis Formation", "Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Mantellisaurus",
    },
    ["Ohmdenosaurus liasicus"]: {
        year_max: 182,
        year_min: 182,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Posidonia Shale"],
        wikipedia: "https://en.wikipedia.org/wiki/Ohmdenosaurus",
    },
    ["Ostromia crassipes"]: {
        year_max: 150.8,
        year_min: 145.5,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Painten Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ostromia",
    },
    ["Plateosaurus gracilis"]: {
        year_max: 227,
        year_min: 204,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Löwenstein Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Plateosaurus",
    },
    ["Plateosaurus longiceps"]: {
        year_max: 227,
        year_min: 204,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Trossingen Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Plateosaurus",
    },
    ["Plateosaurus trossingensis"]: {
        year_max: 227,
        year_min: 204,
        eats: HERBIVORE,
        lives: ["Germany", "Metropolitan France", "Norway", "Switzerland"],
        lives_precise: ["Klettgau Formation", "Lunde Formation", "Trossingen Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Plateosaurus",
    },
    ["Procompsognathus triassicus"]: {
        year_max: 210,
        year_min: 210,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Löwenstein Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Procompsognathus",
    },
    // Pterospondylus: dubious genus
    ["Ruehleia bedheimensis"]: {
        year_max: 216,
        year_min: 208,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Trossingen Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ruehleia",
    },
    ["Sciurumimus albersdoerferi"]: {
        year_max: 150,
        year_min: 150,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Torleite Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Sciurumimus",
    },
    ["Stenopelix valdensis"]: {
        year_max: 140,
        year_min: 140,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Obernkirchen Sandstein Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Stenopelix",
    },
    // Tanystrosuchus: dubious genus
    ["Torvosaurus tanneri"]: {
        year_max: 165,
        year_min: 148,
        eats: CARNIVORE,
        lives: ["Wyoming"],
        wikipedia: "https://en.wikipedia.org/wiki/Torvosaurus",
    },
    ["Torvosaurus gurneyi"]: {
        year_max: 165,
        year_min: 148,
        eats: CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Torvosaurus",
    },
    ["Torvosaurus sp. (unnamed species)"]: {
        // "The material from Germany is further distinguished by the other two species by a temporal difference of c. 10 Ma"
        year_max: 165,
        year_min: 148,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Ornatenton Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Torvosaurus",
    },
    ["Tuebingosaurus maierfritzorum"]: {
        year_max: 222,
        year_min: 209,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Trossingen Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Tuebingosaurus",
    },
    ["Wiehenvenator albati"]: {
        year_max: 166,
        year_min: 164,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Ornatenton Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Wiehenvenator",
    },
    /* template:
    ["species"]: {
        year_max: ,
        year_min: ,
        eats: INSECTIVORE CARNIVORE HERBIVORE OMNIVORE HERBIVORE_OR_OMNIVORE,
        lives: ["Germany"] _continents["Peninsular Spain"],
        lives_precise: [""], // optional
        wikipedia: "",
    },
    */
    /*
    lives: fuse([_continents["Peninsular Spain"], "Portugal"]),
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
}

// ToDo: find the short name for each of them and assign them this short name as a "name"-attribute if it is unique.

// TODO: find a way to make it possible to read out the .lives w/ the _continents-entry-names still intact.

// Round year_min and year_max to make them findable by searching for whole numbers

function roundDinoLivingTime() {
    for (const [dino_name, dino_entry] of Object.entries(_dinos)) {
        let year_min = dino_entry.year_min;
        let year_max = dino_entry.year_max;
        let year_min_rounded = Math.floor(year_min);
        let year_max_rounded = Math.ceil(year_max);
        let range = year_max_rounded - year_min_rounded;
        if (range == 1 && year_min_rounded < year_min && year_max_rounded > year_max) {
            // both year_min and year_max are in between two adjacent whole numbers
            if (year_min % 1 <= 0.5) {
                dino_entry.year_min_precise = year_min;
                dino_entry.year_min = year_min_rounded;
            }
            if (year_max % 1 >= 0.5) {
                dino_entry.year_max_precise = year_max;
                dino_entry.year_max = year_max_rounded;
            }
        }
    }
}

// Error correction

function errorCheckDinoData() {
    for (const [dino_name, dino_entry] of Object.entries(_dinos)) {
        if (!dino_entry.eats) {
            throw new Error(dino_name + " has no .eats value.");
        }
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
