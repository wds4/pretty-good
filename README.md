# Pretty Good Apps

This is a refactor of my older project, [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

Pretty Good Apps is a desktop client (linux, mac, windows), embedded currently with two apps:
- Curated Lists: an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists)
- Pretty Good Nostr, a standard nostr client with basic functionality

## Pretty Good Nostr

Basic [nostr](https://github.com/nostr-protocol/nostr) functionality is currently available. (List of supported [NIPs](https://github.com/nostr-protocol/nips) is coming soon.) Features include:
- create new profiles
- import profiles
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

Forthcoming / under consideration:
- likes, reposts, and zaps
- mentions (via NIP-27)
- fixes to thread view
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

## Download and install Pretty Good 

The latest releases will be made available [here](https://github.com/wds4/pretty-good/releases).

### MacOS

For Apple Silicon macs (released from late 2020 to now), download and install PrettyGood-[version]-arm64.dmg, e.g. PrettyGood-0.1.1-alpha-arm64.dmg.

For intel macs (between 2005 and 2021), download and install PrettyGood-[version].dmg, e.g. PrettyGood-0.1.1-alpha.dmg.

Your mac will probably complain that the downloaded files are from an unidentified developer; instructions on how to address that problem are [here](https://www.macworld.com/article/672947/how-to-open-a-mac-app-from-an-unidentified-developer.html).

### Linux

Download and install PrettyGood-[version].AppImage, e.g. PrettyGood-0.1.1-alpha.AppImage.

### Windows

Coming soon.

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
