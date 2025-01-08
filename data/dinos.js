
var [INSECTIVORE, CARNIVORE, HERBIVORE, OMNIVORE, HERBIVORE_OR_OMNIVORE, CARNIVORE_OR_OMNIVORE,
    INSECTIVORE_OR_CARNIVORE, PISCIVORE, PISCIVORE_AND_CARNIVORE, PISCIVORE_OR_CARNIVORE] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    ["Amanzia greppini"]: {
        year_max: 157,
        year_min: 157,
        eats: HERBIVORE,
        lives: ["Switzerland"],
        lives_precise: ["Reuchenette Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Amanzia",
    },
    ["Ampelosaurus atacis"]: {
        year_max: 71.5,
        year_min: 71.5,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Argiles et Grès à Reptiles Formation", "Grès de Labarre", "Gres de Saint-Chinian", "Marnes Rouges Inférieures Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ampelosaurus",
    },
    ["Anoplosaurus curtonotus"]: {
        year_max: 100,
        year_min: 100,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Cambridge Greensand"],
        wikipedia: "https://en.wikipedia.org/wiki/Anoplosaurus",
    },
    ["Aragosaurus ischiaticus"]: {
        year_max: 145,
        year_min: 140,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Villar del Arzobispo Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Aragosaurus",
    },
    ["Arcovenator escotae"]: {
        year_max: 76,
        year_min: 72,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Argiles et Grès à Reptiles Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Arcovenator",
    },
    ["Arenysaurus ardevoli"]: {
        year_max: 66,
        year_min: 66,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Tremp Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Arenysaurus",
    },
    ["Aristosuchus pusillus"]: {
        year_max: 130,
        year_min: 123,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wealden Group"],
        wikipedia: "https://en.wikipedia.org/wiki/Aristosuchus",
    },
    ["Asylosaurus yalensis"]: {
        year_max: 205.7, // deduced from: Late Triassic, Rhaetian 
        year_min: 201.4,
        eats: HERBIVORE_OR_OMNIVORE,
        lives: ["England"],
        lives_precise: ["Avon Fissure Fill"],
        wikipedia: "https://en.wikipedia.org/wiki/Asylosaurus",
    },
    ["Atsinganosaurus velauciensis"]: {
        year_max: 72,
        year_min: 70,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Argiles et Grès à Reptiles Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Atsinganosaurus",
    },
    ["Aviatyrannis jurassica"]: {
        year_max: 160,
        year_min: 145,
        eats: CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Alcobaça Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Aviatyrannis",
    },
    ["Barilium dawsoni"]: {
        year_max: 140,
        year_min: 140,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wadhurst Clay Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Barilium",
    },
    ["Baryonyx walkeri"]: {
        year_max: 130,
        year_min: 125,
        eats: PISCIVORE_AND_CARNIVORE, // found with fish scales in its stomach. also found with iguanodontid (baby iirc) in its stomach.
        lives: ["England"],
        lives_precise: ["Weald Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Baryonyx",
    },
    ["Betasuchus bredai"]: {
        year_max: 66,
        year_min: 66,
        eats: CARNIVORE,
        lives: ["Netherlands"],
        lives_precise: ["Maastricht Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Betasuchus",
    },
    ["Blasisaurus canudoi"]: {
        year_max: 66,
        year_min: 66,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Arén Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Blasisaurus",
    },
    ["Bothriospondylus suffossus"]: {
        year_max: 157,
        year_min: 152.2,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Kimmeridge Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Bothriospondylus",
    },
    ["Bradycneme draculae"]: {
        year_max: 70,
        year_min: 66,
        eats: CARNIVORE,
        lives: ["Romania"],
        lives_precise: ["Sânpetru Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Bradycneme",
    },
    ["Brighstoneus simmondsi"]: {
        year_max: 126.5,
        year_min: 126.5,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Brighstoneus",
    },
    ["Burianosaurus augustai"]: {
        year_max: 100.5, // deduced from: Late Cretaceous, Cenomanian
        year_min: 93.9,
        eats: HERBIVORE,
        lives: ["Czechia"],
        lives_precise: ["Peruc-Korycany Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Burianosaurus",
    },
    ["Calamosaurus foxi"]: {
        year_max: 129,
        year_min: 125,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Calamosaurus",
    },
    ["Calamospondylus oweni"]: {
        year_max: 130,
        year_min: 130,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Calamospondylus",
    },
    ["Caletodraco cottardi"]: {
        year_max: 100.5, //deduced from: Late Cretaceous, lower Cenomanian
        year_min: 93.9,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Chalk of the Pays de Caux"],
        wikipedia: "https://en.wikipedia.org/wiki/Caletodraco",
    },
    ["Callovosaurus leedsi"]: {
        year_max: 164,
        year_min: 164,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Oxford Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Callovosaurus",
    },
    ["Calvarius rapidus"]: {
        year_max: 66.1,
        year_min: 66,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Tremp Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Calvarius",
    },
    ["Camarillasaurus cirugedae"]: {
        year_max: 130,
        year_min: 125,
        eats: CARNIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Camarillas Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Camarillasaurus",
    },
    ["Camelotia borealis"]: {
        year_max: 205.7, // Late Triassic-Early Jurassic, Rhaetian–Hettangian
        year_min: 199.5,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Westbury Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Camelotia",
    },
    ["Canardia garonnensis"]: {
        year_max: 67.5,
        year_min: 66,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Marnes d'Auzas Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Canardia",
    },
    ["Cardiodon rugulosus"]: {
        year_max: 167,
        year_min: 167,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Forest Marble Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Cardiodon",
    },
    ["Ceratosuchops inferodios"]: {
        year_max: 128,
        year_min: 128,
        eats: PISCIVORE_OR_CARNIVORE, // spinosaurids were at least partially piscivorous (fish-eating)
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ceratosuchops",
    },
    ["Cetiosauriscus stewarti"]: {
        year_max: 168,
        year_min: 163,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Oxford Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Cetiosauriscus",
    },
    ["Cetiosaurus oxoniensis"]: {
        year_max: 170,
        year_min: 164.7,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Rutland Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Cetiosaurus",
    },
    ["Chondrosteosaurus gigas"]: {
        year_max: 125,
        year_min: 125,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Chondrosteosaurus",
    },
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
    ["Comptonatus chasei"]: {
        year_max: 125.77, // Early Cretaceous, Barremian–Aptian
        year_min: 113.0,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Comptonatus",
    },
    ["Concavenator corcovatus"]: {
        year_max: 125,
        year_min: 125,
        eats: CARNIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["La Huérguina Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Concavenator",
    },
    ["Craspedodon lonzeensis"]: {
        year_max: 86.3, // Late Cretaceous, Santonian
        year_min: 83.6,
        eats: HERBIVORE,
        lives: ["Belgium"],
        lives_precise: ["Glauconie de Lonzée Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Craspedodon",
    },
    ["Craterosaurus pottonensis"]: {
        year_max: 121.4,
        year_min: 121.4,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Woburn Sands Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Craterosaurus",
    },
    ["Cruxicheiros newmanorum"]: {
        year_max: 167,
        year_min: 167,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Chipping Norton Limestone"],
        wikipedia: "https://en.wikipedia.org/wiki/Cruxicheiros",
    },
    // Cryptosaurus: dubious genus
    ["Cumnoria prestwichii"]: {
        year_max: 153,
        year_min: 153,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Kimmeridge Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Cumnoria",
    },
    ["Dacentrurus armatus"]: {
        year_max: 154,
        year_min: 140,
        eats: HERBIVORE,
        lives: fuse(["England", "Metropolitan France", "Portugal", _continents["Peninsular Spain"]]),
        lives_precise: ["Alcobaça Formation", "Argiles d'Octeville", "Kimmeridge Clay", "Lourinhã Formation", "Villar del Arzobispo Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Dacentrurus",
    },
    ["Demandasaurus darwini"]: {
        year_max: 125,
        year_min: 125,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Castrillo de la Reina Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Demandasaurus",
    },
    // Dinodocus mackesoni: nomen dubium
    /* nomen dubium: ["Dolichosuchus cristatus"]: {
        year_max: 208,
        year_min: 208,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Löwenstein Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Dolichosuchus",
    }, */
    ["Dornraptor normani"]: {
        year_max: 194,
        year_min: 192,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Blue Lias", "Charmouth Mudstone Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Dornraptor",
    },
    ["Draconyx loureiroi"]: {
        year_max: 149.2, // Late Jurassic, Tithonian
        year_min: 143.1,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Draconyx",
    },
    ["Dracopelta zbyszewskii"]: {
        year_max: 152.1,
        year_min: 145.0,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Dracopelta",
    },
    ["Dracoraptor hanigani"]: {
        year_max: 201,
        year_min: 199,
        eats: CARNIVORE,
        lives: ["Wales"],
        lives_precise: ["Blue Lias"],
        wikipedia: "https://en.wikipedia.org/wiki/Dracoraptor",
    },
    ["Dromaeosauroides bornholmensis"]: {
        year_max: 140,
        year_min: 140,
        eats: PISCIVORE_OR_CARNIVORE, // Coprolites containing fish remains found in the Jydegaard Formation may belong to Dromaeosauroides.
        lives: ["Denmark"],
        lives_precise: ["Jydegaard Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Dromaeosauroides",
    },
    ["Dubreuillosaurus valesdunensis"]: {
        year_max: 168,
        year_min: 166,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Calcaire de Caen"],
        wikipedia: "https://en.wikipedia.org/wiki/Dubreuillosaurus",
    },
    ["Duriatitan humerocristatus"]: {
        year_max: 150,
        year_min: 150,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Kimmeridge Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Duriatitan",
    },
    ["Duriavenator hesperis"]: {
        year_max: 168,
        year_min: 168,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Inferior Oolite"],
        wikipedia: "https://en.wikipedia.org/wiki/Duriavenator",
    },
    ["Echinodon becklesii"]: {
        year_max: 143.1, // Early Cretaceous, Berriasian 
        year_min: 137.05,
        eats: HERBIVORE_OR_OMNIVORE,
        lives: ["England"],
        lives_precise: ["Purbeck Group"],
        wikipedia: "https://en.wikipedia.org/wiki/Echinodon",
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
    ["Eotyrannus lengi"]: {
        year_max: 130,
        year_min: 130,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Eotyrannus",
    },
    ["Eousdryosaurus nanohallucis"]: {
        year_max: 152,
        year_min: 152,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Eousdryosaurus",
    },
    ["Erectopus superbus"]: {
        year_max: 113.0, // Early Cretaceous, Albian 
        year_min: 100.5,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["La Penthiève Beds"],
        wikipedia: "https://en.wikipedia.org/wiki/Erectopus",
    },
    ["Eucamerotus foxi"]: {
        year_max: 125.77, // Early Cretaceous, Barremian
        year_min: 121.4,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Eucamerotus",
    },
    // Eucercosaurus: dubious name
    ["Euronychodon portucalensis"]: {
        year_max: 92,
        year_min: 70,
        eats: INSECTIVORE_OR_CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Argiles et sables de Taveiro"],
        wikipedia: "https://en.wikipedia.org/wiki/Euronychodon",
    },
    ["Europasaurus holgeri"]: {
        year_max: 154,
        year_min: 151,
        eats: HERBIVORE,
        lives: ["Lower Saxony"], // island
        lives_precise: ["Süntel Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Europasaurus",
    },
    ["Europatitan eastwoodi"]: {
        year_max: 125,
        year_min: 125,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Castrillo de la Reina Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Europatitan",
    },
    ["Europelta carbonensis"]: {
        year_max: 113.0,
        year_min: 113.0,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Escucha Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Europelta",
    },
    ["Eustreptospondylus oxoniensis"]: {
        year_max: 166,
        year_min: 154,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Oxford Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Eustreptospondylus",
    },
    ["Fylax thyrakolasus"]: {
        year_max: 66.052,
        year_min: 66,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Figuerola Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Fylax",
    },
    ["Galvesaurus herreroi"]: {
        year_max: 150,
        year_min: 146,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Villar del Arzobispo Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Galvesaurus",
    },
    ["Garrigatitan meridionalis"]: {
        year_max: 74,
        year_min: 70,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Argiles et Grès à Reptiles Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Garrigatitan",
    },
    ["Garumbatitan morellensis"]: {
        year_max: 125.77, // Early Cretaceous, Barremian
        year_min: 121.4,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Arcillas de Morella Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Garumbatitan",
    },
    ["Genusaurus sisteronis"]: {
        year_max: 106,
        year_min: 106,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Bevons Beds"],
        wikipedia: "https://en.wikipedia.org/wiki/Genusaurus",
    },
    ["Gideonmantellia amosanjuanae"]: {
        year_max: 125.77, // Early Cretaceous, Barremian
        year_min: 121.4,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Camarillas Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Gideonmantellia",
    },
    ["Gigantosaurus megalonyx"]: {
        year_max: 154.8,
        year_min: 149.2,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Kimmeridge Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Gigantosaurus",
    },
    ["Haestasaurus becklesii"]: {
        year_max: 140,
        year_min: 140,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wealden Group"],
        wikipedia: "https://en.wikipedia.org/wiki/Haestasaurus",
    },
    // Halticosaurus: nomen dubium
    // Heptasteornis andrewsi: dubious genus
    ["Hesperonyx martinhotomasorum"]: {
        year_max: 154.8, // Late Jurassic, late Kimmeridgian
        year_min: 149.2, // this is whole Kimmeridgian
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Hesperonyx",
    },
    ["Histriasaurus boscarollii"]: {
        year_max: 135,
        year_min: 125,
        eats: HERBIVORE,
        lives: ["Croatia"],
        wikipedia: "https://en.wikipedia.org/wiki/Histriasaurus",
    },
    ["Horshamosaurus rudgwickensis"]: {
        year_max: 125.77, // Early Cretaceous, Barremian 
        year_min: 121.4,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Weald Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Horshamosaurus",
    },
    ["Hungarosaurus tormai"]: {
        year_max: 85,
        year_min: 85,
        eats: HERBIVORE,
        lives: ["Hungary"],
        lives_precise: ["Csehbánya Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Hungarosaurus",
    },
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
    // Hypselosaurus priscus: dubious genus
    ["Hypselospinus fittoni"]: {
        year_max: 140,
        year_min: 140,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wadhurst Clay Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Hypselospinus",
    },
    ["Hypsilophodon foxii"]: {
        year_max: 130,
        year_min: 125,
        eats: HERBIVORE_OR_OMNIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Hypsilophodon",
    },
    ["Iberospinus natarioi"]: {
        year_max: 129.4,
        year_min: 125,
        eats: PISCIVORE_OR_CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Papo Seco Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Iberospinus",
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
    // Iliosuchus incognitus: dubious genus
    // Iuticosaurus: nomen dubious
    ["Juratyrant langhami"]: {
        year_max: 149.3,
        year_min: 149,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Kimmeridge Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Juratyrant",
    },
    ["Juravenator starki"]: {
        year_max: 152, // text says "about 151 or 152", infobox says 151.5
        year_min: 151,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Painten Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Juravenator",
    },
    ["Lexovisaurus durobrivensis"]: {
        year_max: 165.7,
        year_min: 164.7,
        eats: HERBIVORE,
        lives: ["England", "Metropolitan France"],
        lives_precise: ["Oxford Clay", "Normandy"],
        wikipedia: "https://en.wikipedia.org/wiki/Lexovisaurus",
    },
    ["Liliensternus liliensterni"]: {
        year_max: 228,
        year_min: 201.3,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Trossingen Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Liliensternus",
    },
    ["Lirainosaurus astibiae"]: {
        year_max: 72,
        year_min: 70,
        eats: HERBIVORE,
        lives: fuse(["Metropolitan France", _continents["Peninsular Spain"]]),
        lives_precise: ["Marnes Rouges Inférieures Formation", "Sierra Perenchiza Formation", "Sobrepena Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lirainosaurus",
    },
    ["Lohuecotitan pandafilandi"]: {
        year_max: 72,
        year_min: 72,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Villalba de la Sierra Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lohuecotitan",
    },
    ["Lophostropheus airelensis"]: {
        year_max: 205.6,
        year_min: 196.5,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Moon-Airel Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lophostropheus",
    },
    ["Loricatosaurus priscus"]: {
        year_max: 164.7,
        year_min: 161.2,
        eats: HERBIVORE,
        lives: ["England", "Metropolitan France"],
        lives_precise: ["Oxford Clay", "Marnes à Belemnopsis latesulcatus Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Loricatosaurus",
    },
    ["Losillasaurus giganteus"]: {
        year_max: 157.3,
        year_min: 145,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Villar del Arzobispo Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Losillasaurus",
    },
    ["Lourinhanosaurus antunesi"]: {
        year_max: 150,
        year_min: 150,
        eats: CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lourinhanosaurus",
    },
    ["Lourinhasaurus alenquerensis"]: {
        year_max: 150,
        year_min: 150,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lourinhasaurus",
    },
    ["Lusotitan atalaiensis"]: {
        year_max: 152,
        year_min: 152,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lusotitan",
    },
    ["Lusovenator santosi"]: {
        year_max: 154,
        year_min: 144.7,
        eats: CARNIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Lusovenator",
    },
    ["Macrurosaurus semnus"]: {
        year_max: 105,
        year_min: 100,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Cambridge Greensand"],
        wikipedia: "",
    },
    ["Magnamanus soriaensis"]: {
        year_max: 130,
        year_min: 130,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Golmayo Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Magnamanus",
    },
    ["Magyarosaurus dacus"]: {
        year_max: 71,
        year_min: 66,
        eats: HERBIVORE,
        lives: ["Romania"], // Hungary at the time of discovery
        lives_precise: ["Sânpetru Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Magyarosaurus",
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
    // Marmarospondylus robustus: dubious genus
    ["Matheronodon provincialis"]: {
        year_max: 74,
        year_min: 72,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Argiles et Grès à Reptiles Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Matheronodon",
    },
    ["Megalosaurus bucklandii"]: {
        year_max: 166,
        year_min: 165,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Chipping Norton Limestone", "Taynton Limestone Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Megalosaurus",
    },
    ["Megalosaurus nethercombensis"]: { // genus Magnosaurus
        year_max: 169.7,
        year_min: 169.5,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Inferior Oolite"],
        wikipedia: "https://en.wikipedia.org/wiki/Magnosaurus",
    },
    ["Metriacanthosaurus parkeri"]: {
        year_max: 160,
        year_min: 160,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Oxford Clay"],
        wikipedia: "https://en.wikipedia.org/wiki/Metriacanthosaurus",
    },
    ["Miragaia longicollum"]: {
        year_max: 150,
        year_min: 150,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Miragaia_longicollum",
    },
    ["Mochlodon suessi"]: {
        year_max: 85,
        year_min: 80,
        eats: HERBIVORE,
        lives: ["Austria"],
        lives_precise: ["Gosau Group"],
        wikipedia: "https://en.wikipedia.org/wiki/Mochlodon",
    },
    ["Mochlodon vorosi"]: {
        year_max: 85,
        year_min: 80,
        eats: HERBIVORE,
        lives: ["Hungary"],
        lives_precise: ["Csehbánya Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Mochlodon",
    },
    ["Morelladon beltrani"]: {
        year_max: 130,
        year_min: 130,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Arcillas de Morella Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Morelladon",
    },
    ["Morinosaurus typus"]: {
        year_max: 154.8, // Upper Jurassic, Kimmeridgian
        year_min: 149.2,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["unnamed formation from Boulogne-sur-Mer, Département du Pas-de-Calais"],
        wikipedia: "https://en.wikipedia.org/wiki/Morinosaurus",
    },
    // Neosodon: no formal species given
    ["Neovenator salerii"]: {
        year_max: 130,
        year_min: 125,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Neovenator",
    },
    ["Normanniasaurus genceyi"]: {
        year_max: 113,
        year_min: 107,
        eats: HERBIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Poudingue Ferrugineux"],
        wikipedia: "https://en.wikipedia.org/wiki/Normanniasaurus",
    },
    ["Notatesseraeraptor frickensis"]: {
        year_max: 209,
        year_min: 209,
        eats: CARNIVORE,
        lives: ["Switzerland"],
        lives_precise: ["Klettgau Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Notatesseraeraptor",
    },
    ["Nuthetes destructor"]: {
        year_max: 143,
        year_min: 143,
        eats: CARNIVORE,
        lives: ["England", "Metropolitan France"],
        lives_precise: ["Lulworth Formation", "Angeac-Charente bonebed"],
        wikipedia: "https://en.wikipedia.org/wiki/Nuthetes",
    },
    ["Oblitosaurus bunnueli"]: {
        year_max: 154.8, // Late Jurassic, Kimmeridgian–Tithonian
        year_min: 143.1,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Villar del Arzobispo Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Oblitosaurus",
    },
    ["Oceanotitan dantasi"]: {
        year_max: 149,
        year_min: 149,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Lourinhã Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Oceanotitan",
    },
    ["Ohmdenosaurus liasicus"]: {
        year_max: 182,
        year_min: 182,
        eats: HERBIVORE,
        lives: ["Germany"],
        lives_precise: ["Posidonia Shale"],
        wikipedia: "https://en.wikipedia.org/wiki/Ohmdenosaurus",
    },
    ["Oplosaurus armatus"]: {
        year_max: 130,
        year_min: 125,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Oplosaurus",
    },
    ["Ornithodesmus cluniculus"]: {
        year_max: 125,
        year_min: 125,
        eats: CARNIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ornithodesmus",
    },
    ["Ornithopsis hulkei"]: {
        year_max: 125.77, // Early Cretaceous, Barremian
        year_min: 121.4,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wealden Group"],
        wikipedia: "https://en.wikipedia.org/wiki/Ornithopsis",
    },
    // Orthomerus: dubious genus
    ["Ostromia crassipes"]: {
        year_max: 150.8,
        year_min: 145.5,
        eats: CARNIVORE,
        lives: ["Germany"],
        lives_precise: ["Painten Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Ostromia",
    },
    ["Owenodon hoggii"]: {
        year_max: 143.1, // Early Cretaceous, Berriasian 
        year_min: 137.05,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Lulworth Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Owenodon",
    },
    ["Paludititan nalatzensis"]: {
        year_max: 70.6,
        year_min: 66,
        eats: HERBIVORE,
        lives: ["Romania"],
        lives_precise: ["Sânpetru Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Paludititan",
    },
    ["Pararhabdodon isonensis"]: {
        year_max: 66,
        year_min: 66,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Tremp Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Pararhabdodon",
    },
    ["Pareisactus evrostos"]: {
        year_max: 72.1, // Late Cretaceous, lower Maastrichtian
        year_min: 66.0, // this is whole Maastrichtian
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Tremp Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Pareisactus",
    },
    ["Pelecanimimus polyodon"]: {
        year_max: 130,
        year_min: 130,
        eats: HERBIVORE_OR_OMNIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["La Huérguina Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Pelecanimimus",
    },
    ["Pelorosaurus brevis"]: {
        year_max: 132,
        year_min: 132,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Tunbridge Wells Sand Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Pelorosaurus",
    },
    ["Pendraig milnerae"]: {
        year_max: 215,
        year_min: 201,
        eats: CARNIVORE,
        lives: ["Wales"],
        lives_precise: ["Pant-y-Ffynnon Quarry"], // potentially insular
        wikipedia: "https://en.wikipedia.org/wiki/Pendraig",
    },
    ["Phyllodon henkeli"]: {
        year_max: 155,
        year_min: 155,
        eats: HERBIVORE,
        lives: ["Portugal"],
        lives_precise: ["Alcobaça Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Phyllodon",
    },
    ["Piveteausaurus divesensis"]: {
        year_max: 164.7,
        year_min: 161.2,
        eats: CARNIVORE,
        lives: ["Metropolitan France"],
        lives_precise: ["Marnes de Dives"],
        wikipedia: "https://en.wikipedia.org/wiki/Piveteausaurus",
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
    ["Pneumatoraptor fodori"]: {
        year_max: 85,
        year_min: 85,
        eats: CARNIVORE_OR_OMNIVORE,
        lives: ["Hungary"],
        lives_precise: ["Csehbánya Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Pneumatoraptor",
    },
    ["Poekilopleuron bucklandii"]: {
        year_max: 167.7,
        year_min: 166.1,
        eats: CARNIVORE, // potentially found near fish remains, but wikipedia's source for that (http://lesdinos.free.fr/D2005.pdf) is unclear on that iirc.
        lives: ["Metropolitan France"],
        lives_precise: ["Calcaire de Caen"],
        wikipedia: "https://en.wikipedia.org/wiki/Poekilopleuron",
    },
    ["Polacanthus foxii"]: {
        year_max: 130,
        year_min: 125,
        eats: HERBIVORE,
        lives: ["England"],
        lives_precise: ["Wessex Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Polacanthus",
    },
    ["Portellsaurus sosbaynati"]: {
        year_max: 130,
        year_min: 129,
        eats: HERBIVORE,
        lives: _continents["Peninsular Spain"],
        lives_precise: ["Margas de Mirambell Formation"],
        wikipedia: "https://en.wikipedia.org/wiki/Portellsaurus",
    },
    // only Germany-flagged dinosaurs below this line
    /* template:
    ["species"]: {
        year_max: ,
        year_min: ,
        eats: INSECTIVORE CARNIVORE HERBIVORE OMNIVORE HERBIVORE_OR_OMNIVORE CARNIVORE_OR_OMNIVORE INSECTIVORE_OR_CARNIVORE PISCIVORE PISCIVORE_AND_CARNIVORE PISCIVORE_OR_CARNIVORE,
        lives: ["Germany"] _continents["Peninsular Spain"],
        lives_precise: [""], // optional
        wikipedia: "",
    },
    */
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
