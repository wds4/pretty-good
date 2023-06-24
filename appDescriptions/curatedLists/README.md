Curated Lists
=====

Curated Lists is built as a proof of concept for all of the [core principles and goals](https://github.com/wds4/DCoSL/tree/main/dips/coreProtocol) of DCOSL (with the exception of DIP-infiity), most notably DIPs 01 and 02.

Curated Lists allows any user to create a new list, add an item to any list, endorse or reject any user as a curator of any given list, and accept or reject any submitted item as belonging to the list in question. Submissions and endorsements are stored in nostr using kinds 9901 or -02 (submissions of lists and list items) and 39901 or -02 (for endorsements), following conventions outlined in [the concept graph](https://github.com/wds4/DCoSL/tree/main/dips/conceptGraph). These submissions and endorsements are used to generate lists, following conventions outlined in [the grapevine](https://github.com/wds4/DCoSL/tree/main/dips/grapevine).

### [Curated Lists Example: Curation of a list of nostr clients](exampleListCuration.md)

