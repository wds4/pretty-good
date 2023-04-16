# Pretty Good

A nostr desktop client for linux, mac, and windows.

The goal of this project is to build a functional and genuinely useful decentralized web of trust using a new model for decentralized knowledge representation and curation that I call the <i>threaded tapestry</i>.

This is a fork of [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr) and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

As of April 2023: *** still in alpha ***

## Curated Lists: decentralized web of trust

Curation of items on a list by a decentralized web of trust. This is the simplest demonstration of the threaded tapestry model I have been able to devise so far that demonstrates knowledge representation as well as knowledge curation.

<img src=".erb/img/listCuration1.png" width="100%" />
<img src=".erb/img/listCuration2.png" width="100%" />

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
