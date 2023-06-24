Curated Lists
=====

VERSION A

Curated Lists is built as a proof of concept for all of the [core principles and goals](https://github.com/wds4/DCoSL/tree/main/dips/coreProtocol) of DCOSL (with the exception of DIP-infiity), most notably DIPs 01 and 02.

Curated Lists allows any user to create a new list, add an item to any list, endorse or reject any user as a curator of any given list, and accept or reject any submitted item as belonging to the list in question. Submissions and endorsements are stored in nostr using kinds 9901 or -02 (submissions of lists and list items) and 39901 or -02 (for endorsements), following conventions outlined in [the concept graph](https://github.com/wds4/DCoSL/tree/main/dips/conceptGraph). These submissions and endorsements are used to generate lists, following conventions outlined in [the grapevine](https://github.com/wds4/DCoSL/tree/main/dips/grapevine).

VERSION B

This app is an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists; a work in progress). I propose that the ability to curate a simple list in a truly decentralized fashion - no tokens or blockchains, no email or phone number verifications - should be considered not only the <i>atomic unit</i> but also the <i>fundamental building block</i> of the decentralized web. If we can curate <i>simple lists</i>, then the ability to curate <i>data structures of arbitrary complexity</i> will very quickly fall into place. See [DCoSL](https://github.com/wds4/DCoSL) for a more in depth discussion.

In this app, anyone can:
- create a new list
- add items to any list
- accept or reject a specific item on any list
- endorse or reject a user as a trusted curator of any specified list (contextual)

Lists and list items are stored as kind: 9901 (regular events). Endorsements are stored using kind: 39901 (parameterized replaceable events). Your app pulls data from the network, crunches numbers, and shows you which items have been accepted by your web of trust onto any given list.

Curator influence is contextual (list-specific) and transitive. Influence scores are calculated using an algorithm similar in many ways to [PageRank](https://en.wikipedia.org/wiki/PageRank). This was designed to maximize the influence of worthy users while simultaneously screening out bad actors (sybil resistance). The app is designed to allow users to look under the hood (if they so desire) to see how calculations are performed. There are several parameters (such as default user influence scores) that can be adjusted, allowing the user to see how the resulting lists change in real time.

Forthcoming features include:
- the ability for Alice to publish a note saying, in effect: Here is a List of XYZ items, as curated by MY (Alice's) web of trust. This will have interesting applications from a privacy perspective: she will be able to transmit useful information to the wider community that has been gathered by psuedonymous accounts known only to her, in a manner that shields those accounts from being identified.
- the ability to endorse or reject a user as a trusted curator of <i>any</i> list (all contexts). This will be used to calculate a generic (non-contextual) influence score which can then be used as a default influence score if no contextual information about that user is available. If context-specific attestations are available, the default generic score gets overridden.

### [Curated Lists Example: Curation of a list of nostr clients](exampleListCuration.md)

