# Pretty Good Apps

This is a refactor of my older project, [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

Pretty Good Apps is a desktop client (linux, mac, windows), embedded currently with two apps:
- Curated Lists: an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists). Currently functional although bugs exist and UX is poor.
- Pretty Good Nostr, a standard nostr client, currently with limited functionality

The fundamental purpose of Pretty Good Apps is to provide a proof of concept that genuinely decentralized, web of trust-based curation of knowledge is something that can be done, despite the fact that as of today, we still haven't truly done it. And once we do, it be incredibly useful! Of course, this hinges on the question: what do we mean by "genuine decentralization?" I hope this app will stimulate an examination of that question. See [DCoSL](https://github.com/wds4/DCoSL) for an introduction to this topic.

As of late June 2023, I am in the process of using the basic tools of Curated Lists and building a third app: Curated Nostr Channels. With the Channels app, the user can select a topic (a "channel") such as monetary policy, nostr development, entertainment, sports, etc, and see a nostr feed focused on that topic. Don't see a topic you like? Add it! The list of topics, their arrangement in a hierarchy (e.g. movies is a subcategory of entertainment), and pubkeys that associate with a given topic will all be <i>curated by your web of trust</i> following the principles and methods described in DCoSL. Among other things, this will be a great tool to discover new users to follow.

tl;dr: My goal is for Curated Lists to prove that genuinely decentralized curation of knowledge is possible <i>in theory</i>, and for the Channels app to demonstrate <i>utility</i>.

# overviews of specific apps

## [Pretty Good Nostr](appDescriptions/pgnostr)

Standard nostr client. Functional, but somewhat buugy with poor UI.

## [Curated Lists: decentralized web of trust](appDescriptions/curatedLists)

Proof of concept that DCoSL works in theory. Functional, but buggy with poor UI.

- [Curated Lists Example: Curation of a list of nostr clients](appDescriptions/curatedLists/exampleListCuration.md)

## [Channels](appDescriptions/channels)

An attempt to demonstrate the utility of DCoSL by using it to crowdsource content curation. Not yet complete.

## NIPS implemented

- [x] [NIP-01: Basic protocol flow description](https://github.com/nostr-protocol/nips/blob/master/01.md)<br>
- [x] [NIP-02: Contact List and Petnames](https://github.com/nostr-protocol/nips/blob/master/02.md)<br>
- [ ] [NIP-03: OpenTimestamps Attestations for Events](https://github.com/nostr-protocol/nips/blob/master/03.md)<br>
- [x] [NIP-04: Encrypted Direct Message](https://github.com/nostr-protocol/nips/blob/master/04.md)<br>
- [ ] [NIP-05: Mapping Nostr keys to DNS-based internet identifiers](https://github.com/nostr-protocol/nips/blob/master/05.md)<br>
- [ ] [NIP-06: Basic key derivation from mnemonic seed phrase](https://github.com/nostr-protocol/nips/blob/master/06.md)<br>
- [ ] [NIP-08: Handling Mentions](https://github.com/nostr-protocol/nips/blob/master/08.md)<br>
- [ ] [NIP-10: Conventions for clients' use of `e` and `p` tags in text events](https://github.com/nostr-protocol/nips/blob/master/10.md)<br>
- [x] [NIP-18: Reposts](https://github.com/nostr-protocol/nips/blob/master/18.md)<br>
- [ ] [NIP-19: bech32-encoded entities](https://github.com/nostr-protocol/nips/blob/master/19.md)<br>
- [ ] [NIP-21: `nostr:` URL scheme](https://github.com/nostr-protocol/nips/blob/master/21.md)<br>
- [x] [NIP-25: Reactions](https://github.com/nostr-protocol/nips/blob/master/25.md)<br>
- [x] [NIP-32: Labeling](https://github.com/nostr-protocol/nips/blob/master/32.md)<br>
- [x] [NIP-33: Parameterized Replaceable Events](https://github.com/nostr-protocol/nips/blob/master/33.md)<br>
- [ ] [NIP-51: Lists](https://github.com/nostr-protocol/nips/blob/master/51.md)<br>
- [ ] [NIP-57: Lightning Zaps](https://github.com/nostr-protocol/nips/blob/master/57.md)<br>

# Download and install Pretty Good 

### latest releases will be made available [here](https://github.com/wds4/pretty-good/releases).

### development

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
