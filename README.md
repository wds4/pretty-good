<img src=".erb/img/app-snapshot.png" width="100%" />

A fork of [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) with two additional features:
<li>sqlite3. This repo was initially created as a fork of my template: https://github.com/wds4/electron-react-boilerplate-sqlite3.</li>
<li>multiple separate renderer windows. Each window is functional both in development and in the packaged app. After the above fork, multi windows was added following the same procedure as outlined in the README to my other template: https://github.com/wds4/electron-react-boilerplate-multiple-windows.</li>

<br>

You can turn each window on or off by setting these boolean variables in [main.ts](https://github.com/wds4/erb-sqlite3-multiWindows/blob/main/src/main/main.ts) to true or false:
```
const win1 = true;
const win2 = true;
const win3 = true;
```

## Install erb-sqlite3-multiWindows

Clone this repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/wds4/erb-sqlite3-multiWindows.git your-project-name
cd your-project-name
npm install
```

You MAY also need to do this to install sqlite3, which is a dependency in [release/app/package.json](https://github.com/wds4/electron-react-boilerplate-sqlite3/blob/main/release/app/package.json), but not in [package.json](https://github.com/wds4/electron-react-boilerplate-sqlite3/blob/main/package.json).

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

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)
