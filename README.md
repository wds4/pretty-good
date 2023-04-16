# Pretty Good

A nostr desktop client for linux, mac, and windows.

The goal of this project is to build a functional and genuinely useful decentralized web of trust using a new model for decentralized knowledge representation and curation that I call the <i>threaded tapestry</i>.

This is a fork of [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr) and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

As of April 2023: *** still in alpha ***

## Curated Lists: decentralized web of trust

Curation of items on a list by a decentralized web of trust. This is the simplest demonstration of the threaded tapestry model I have been able to devise so far that demonstrates knowledge representation as well as knowledge curation.

<img src=".erb/img/listCuration1.png" width="100%" />
<img src=".erb/img/listCuration2.png" width="100%" />

### Knowledge Representation: the concept graph ###

Anyone can create a new list, and anyone can add items to any list. A list is a stripped-down version of what I call a concept. Eventually, this will mature into what I call the concept graph.

### Knowledge Curation: the grapevine ###

Anyone can rate items on any list. For now, ratings consist of a simple thumbs up or down. More complex ratings will be forthcoming.

Users can designate other users to be trusted curators. Again, for now, attestations are simple thumbs up or down. Attestations are designated to apply to a specified list (currently working) or to lists in general (in progress).

There is no universal arbiter of truth. Instead, all calculations are performed from the perspective of a given user, the "seed user." By default, the seed user is YOU, but different seed users can be selected, as depicted in the screenshot.

### Sybil resistance ###

One of the principle functions of the grapevine is to resist influence by sybil attacks or other bad actors. Multiple adjustable parameters are provided, some of which are depicted in the screenshots above, including the default user parameters which determine how much influence to allow for completely unvetted users.

## Install Pretty Good

Clone this repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/wds4/pretty-good.git pretty-good
cd pretty-good
npm install
```

You MAY also need to do this to install sqlite3:

```bash
cd release/app
npm install sqlite3
npm run postinstall
cd ../..
```

## Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

The packaged app can now be found in release/app/build.

For more packaging options, including packaging for other platforms and debugging production build with devtools, see [erb packaging options](https://electron-react-boilerplate.js.org/docs/packaging).

## License

GNU Affero General Public License v3.0 © [Pretty Good](https://github.com/wds4/pretty-good)
