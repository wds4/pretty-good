# Pretty Good

A nostr desktop client, based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) and similar to [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), with an extra reputational layer on top.

As of April 2023: *** still in alpha ***

## Curated Lists

Curation of items on a list by a decentralized web of trust

<img src=".erb/img/listCuration1.png" width="40%" />
<img src=".erb/img/listCuration2.png" width="40%" />

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
