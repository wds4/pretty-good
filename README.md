# Pretty Good Apps

This is a refactor of my older project, [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

Pretty Good Apps is a desktop client (linux, mac, windows), embedded currently with two apps (and a third on the way):
- Curated Lists: an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists). Currently functional although bugs exist and UX is poor.
- Pretty Good Nostr, a standard nostr client with basic functionality
- Curated Nostr Channels (under construction)

The fundamental purpose of Pretty Good Apps is to provide a proof of concept that genuinely decentralized, web of trust-based curation of knowledge is something that can be done, despite the fact that as of today, we still haven't truly done it. And once we do, it be incredibly useful! Of course, this hinges on the question: what do we mean by "genuine decentralization?" I hope this app will stimulate an examination of that question. See [DCoSL](https://github.com/wds4/DCoSL) for an introduction to this topic.

As of late June 2023, I am in the process of using the basic tools of Curated Lists and building a third app: Curated Nostr Channels. With the Channels app, the user can select a topic (a "channel") such as monetary policy, nostr development, entertainment, sports, etc, and see a nostr feed focused on that topic. Don't see a topic you like? Add it! The list of topics, their arrangement in a hierarchy (e.g. movies is a subcategory of entertainment), and pubkeys that associate with a given topic will all be <i>curated by your web of trust</i> following the principles and methods described in DCoSL. Among other things, this will be a great tool to discover new users to follow.

tl;dr: My goal is for Curated Lists to prove that genuinely decentralized curation of knowledge is possible <i>in theory</i>, and for the Channels app to prove <i>utility</i>. Once those two points have been (hopefully) demonstrated convincingly, the next step will be to make an implementation that is sleek, snazzy, bug free, with good UX.

# overviews of specific apps

## [Pretty Good Nostr](appDescriptions/pgnostr)

## [Curated Lists: decentralized web of trust](appDescriptions/curatedLists)

- [Curated Lists Example: Curation of a list of nostr clients](appDescriptions/curatedLists/exampleListCuration.md)

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
