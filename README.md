# Pretty Good Apps

This is a refactor of my older project, [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

Pretty Good Apps is a desktop client (linux, mac, windows), embedded currently with two apps (and a third on the way):
- Curated Lists: an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists). Currently functional although bugs exist and UX is poor.
- Pretty Good Nostr, a standard nostr client with basic functionality
- Curated Nostr Channels (under construction)

The fundamental purpose of Pretty Good Apps is to provide a proof of concept that genuinely decentralized, web of trust-based curation of knowledge is something that can be done, despite the fact that as of today, we still haven't truly done it. And once we do, it be incredibly useful! Of course, this hinges on the question: what do we mean by "genuine decentralization?" I hope this app will stimulate an examination of that question. See [DCoSL](https://github.com/wds4/DCoSL) for an introduction to this topic.

As of late June 2023, I am in the process of using the basic tools of Curated Lists and building a third app: Curated Nostr Channels. With the Channels app, the user can select a topic (a "channel") such as monetary policy, nostr development, entertainment, sports, etc, and see a nostr feed focused on that topic. Don't see a topic you like? Add it! The list of topics, their arrangement in a hierarchy (e.g. movies is a subcategory of entertainment), and pubkeys that associate with a given topic will all be <i>curated by your web of trust</i> following the principles and methods described in DCoSL. Among other things, this will be a great tool to discover new users to follow.

tl;dr: My goal is for Curated Lists to prove that genuinely decentralized curation of knowledge is possible <i>in theory</i>, and for the Channels app to prove <i>utility</i>. Once those two points have been (hopefully) demonstrated convincingly, the next step will be to make an implementation that is sleek, snazzy, bug free, with good UX.

## [Pretty Good Nostr](appDescriptions/pgnostr)

Basic [nostr](https://github.com/nostr-protocol/nostr) functionality is currently available. (List of supported [NIPs](https://github.com/nostr-protocol/nips) is coming soon.) Features include:
- create new profiles
- import profiles (do so with caution -- backup your profile first!)
- edit profiles
- manage multiple profiles
- main feed
- following and "firehose" options for the main feed
- post new note
- reply to notes
- find new users by pubkey
- look at user profiles
- send / receive direct messages
- manage relays

Features not available on most other clients:
- See a list of relays used by your follows list, organized by frequency of usage (demonstrates [DIP-01](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/01.md) but not [DIP-02](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/02.md), because follow != trust to pick relays)
- easy switch between multiple accounts
- basic keyword search of your follow list

standard features not yet implemented in PGA:
- zaps
- likes, reposts, reactions
- notifications
- mentions (NIP-27)
- probably some other commonly used features

## Curated Lists: decentralized web of trust

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

### [Curated Lists Example: Curation of a list of nostr clients](appDescriptions/curatedLists/exampleListCuration.md)

## Developer mode

Under settings, users can activate a mode that allows you to explore the structures of various JSON files according to nostr and dcosl protocols. In the case of dcosl, links to relevant DIPs are provided. To activate this feature, go to Pretty Good settings and toggle `show developer details for nostr nerds` to ON.

## Known issues

Importing private key for a profile should be done with caution. There is a risk of introducing errors into your profile, including loss of following list and/or relays list. Best to back these up first! See this [issue](https://github.com/wds4/pretty-good/issues/4) for details.

## Download and install Pretty Good 

The latest releases will be made available [here](https://github.com/wds4/pretty-good/releases).

## Download and install Pretty Good in development

If you're a developer and/or comfortable with the command line, first check to made sure you have node and node package manager installed on your machine. If you're not sure, use commands: `node --version` and `npm --version` to check, and install them if necessary.

Then clone this repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/wds4/pretty-good.git pretty-good
cd pretty-good
npm install
```

Start the app in the `dev` environment:

```bash
npm start
```

### Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

The packaged app can now be found in release/app/build.

For more packaging options, including packaging for other platforms and debugging production build with devtools, see [erb packaging options](https://electron-react-boilerplate.js.org/docs/packaging).

## License

GNU Affero General Public License v3.0 © [Pretty Good](https://github.com/wds4/pretty-good)
