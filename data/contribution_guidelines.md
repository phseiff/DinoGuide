# Contribution Guidelines

The following document outlines the contribution guidelines for the project,
specifically for adding dinosaurs to the `_dinos` object.
They will be relevant once the project is open-sourced and has more contributors
(which, of course, is not the case as of now due to the project being an
assignment for university).

The guidelines below differ marginally from the guidelines outlined in the comments inside the code, because the comments describe the status quo and the guidelines express the intended way to handle this project going forward.

## General attitudes

The following considerations underlie all of the procedures detailed throughout this doument:

Best practice:
* Base information inside _dinos on peer-reviewed scientific sources.
* This requires naming the source in a comment.

Okay practice (done for matter of convenience):
* Base information inside _dinos on wikipedia
* This does not require naming the source in a comment since the source is already in the .wikipedia-attribute.
* If wikipedia clashes with scientific sources, these sources take precedence.

Necessary practice (done to fill holes):
* Base information on semi-educated guesses by the contributor
* Necessary if wikipedia has no information or contains questionable information with no source, and finding a study is out of scope
* May never take precedence over peer-reviewed scientific sources or source-backed wikipedia information, if those are available
* Only permitted because adding information based on amateur knowledge is better for the functionality of the site than having it not be usable
* Needs to be noted in a comment!!

The sources page on the website already tells the user to double-check all information provided by the website before using it for scientific purposes,
so this approach should be okay.

## Adding to the _dinos object

! Keep in mind that wikipedia articles usually handle entire genuses, which may include separate species with different "stats".

### The key:

The key in `_dinos` must be the entire binominal name
(unless no species has been named inside the genus, in which case the name of the genus suffices).
"[genus name] sp. ([unnamed|unidentified] species)" also works.
Dubious genuses and nomen nudem may not be added to the list, except for a comment stating that the genus is dubious
to show that it was not forgotten.

### .lives, .lives_extended and .lives_precise

The .lives-attribute is an array filled with the names of places the animal lived in, all of whom have to be present in _places.

How to fill the lives attribute:

Add whatever the wikipedia article says about where the dinosaur lived, with the following modifications:

(a) If the article says "[dinosaur] lived in [rock formation it was found in]", you should generalize that to "lived in [country/state/US-state that the rock formation is in]", UNLESS there are specific reasons to choose a smaller or no generalization (for example because the dinosaur lived only on a tiny island).

(b) If the article says nothing about where the animal lived, treat it as if it said "[dinosaur] lived in [rock formation it was found in]" (implying the need for modifications outlined in (a).)

(c) If the article says "[dinosaur] lived in [country/continent it was found in]", but the source cited makes no such claim, then you should use the information provided in the source instead. If the source says nothing about where the animal lived, ignore the wikipedia article's claims and proceed with (b).

(d) If, after applying the steps above, you end up with multiple locations, AND there is no specific reason to assume that the animal did not live in the space in between these location as well (e.g. because of a statistically conclusive fossil record or oceans/mountains in between the locations), THEN you should add the area in between the locations to the lives_extended attribute.

If following rules a-d as outlined above causes discrepancies between what the wikipedia article says and what you put into the lives attribute, you must put the claim made by the wikipedia article into the lives_precise attribute (which is an array of strings that do not necessarily have to be in _places), UNLESS the information in wikipedia is straightup misinformation rather than a more conservative/liberal estimate, in which case you should add wikipedia's claims in a comment. If your modification results from b-d, then you must also add a comment explaining your modification (in a way that does not rely on the reader having read the text you are reading right now). Said comment must include your sources, ideally in a way resistant to link rot.

If a dinosaur is definitely known not to have left the areas included in its .lives and .lives_extended attributes (e.g. because of insularity), then it must be given the .lives_exclusively attribute.

One can argue -and in fact, it used to be policy- that it would be a good idea to use the lives_extended attribute to hold the entire area that a dinosaur might have lived in based on natural boundaries such as oceans, mountain chains etc., unless there are findings contraindicating such a wide range.
However, after careful re-consideration I have decided against such an approach, because:
(1) it would involve a lot of repetitive work (checking when the dinosaur lived, what the tectonic plates looked like back then, and adding a _continent-reference to that area.
(2) it would make the .lives_extended-attribute essentially say the same for every north america dinosaur, the same for every late cretaceous european dinosaur, etc, meaning the .lives_extended-attributes would take up a lot of RAM space relative to the (relatively small) amount of information they convey.
(3) one can simply search for e.g. "North America" or "Ibero-Armorican Island" or something like that if one wants to find all dinosaurs that might've lived there under the assumption of a wide spread (and the .lives_exclusively attribute will remove ambiguousness that might make such an approach problematic).

<!--
### .lives_extended

An array filled with the names of places the animal *might have* lived in, all of whom have to be present in _places.
Whilst `.lives` attempts to offer a relatively (but not overly) conservative (in the direction of erring on the side of undershooting the animals actual distribution) estimate of where the animal might have lived, `.lives_extended` offers the largest estimate that isn't contraindicated by findings, overwhelming statistical evidence and matters of geography. In other words: Whilst `.lives` errs on the side of "the animal didn't live in xyz place because we haven't found it in this area", `.lives_extended` errs on the side of "the animal could have lived there, so we assume it did."

How to fill the `.lives_extended` attribute:

- Every place in `.lives` should also be in `.lives_extended`.
- If the animal was found in place xyz, and place abc is (a) connected to place xyz by land, (b) not separated from place xyz by seas or mountain ranges, (c) in the same climate zone, (d) had a similar ecosystem (erring on the side of "yes" until informaed better is okay for this point), and (e) is connected by more than just a tiny land bridge, THEN we add place abs to `.lives_extended`.
- The above bullet point does not apply if there are reasons to assume otherwise. A qualified scientist or a study expressing (or having expressed) a sentiment that differs from the amateur contributor's judgement counts as a reason to assume otherwise.
-->

### .year_min and .year_max

How to fill the year_min and year_max attribute:

- both contain a value in "million of years ago". year_min holds the smaller and year_max holds the larger absolute value. EXAMPLE: year_min=67.6, year_max=72 means that the animal lived from 72 million years ago to 67.6 million years ago.
- if our source (by default wikipedia) says "lived xyz million years ago" rather than "lived from xy million years ago to yz million years ago", then you treat that as "lived from xyz to xyz million years ago."
- if a source says something like "lived xyz million years ago" (point in time rather than time span) or "lived in the [name of a period of time such as 'Late Cretaceous']" (vague by virtue of being normed towards a nameable area), then we consider this claim "vague". if wikipedia's claim is vague, but its scientific source it cites (or any other scientific source) is not, then we use said source rather than wikipedia. the same applies as well if wikipedia is blatantly wrong, ofc.
- if the above case applies, you must add a comment explaining why (in a way that does not rely on the reader having read the text you are reading right now). said comment must include your sources, ideally in a way resistant to link rot.