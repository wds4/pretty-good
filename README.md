# Pretty Good

A nostr desktop client for linux, mac, and windows.

The goal of this project is to build a decentralized web of trust using a model for decentralized knowledge representation and curation that I call the <i>threaded tapestry</i>.

This is a fork of [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr) and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

As of April 2023: *** still in alpha ***

## Curated Lists: decentralized web of trust

Curation of items on a list by a decentralized web of trust. This is the simplest demonstration of the threaded tapestry model I have been able to devise so far that demonstrates knowledge representation as well as knowledge curation.

In the example shown below, your web of trust tells you which nostr clients are the best nostr clients! (Take note, this example is drawn from testnet.)

<img src=".erb/img/listCuration1.png" width="100%" />
<img src=".erb/img/listCuration2.png" width="100%" />

## the threaded tapestry model ##

The threaded tapestry model is broken down into two parts: 1) decentralized knowledge representation and 2) decentralized knowledge curation.

### decentralized knowledge representation: the concept graph ###

Anyone can create a new list, and anyone can add items to any list. A list is a stripped-down version of what I call a concept. Eventually, this will mature into what I call the concept graph.

### decentralized knowledge curation: the grapevine ###

When calculating weighted average scores, the trick is to determine how much weight to give to any single user's rating, to do so in a way that is contextual, and to do so in a way that resists sybil and other forms of attacks. Calculationof these weights is the purvue of the grapevine.

Anyone can rate items on any list. For now, ratings consist of a simple thumbs up or down. More complex ratings will be forthcoming.

Users can designate other users to be trusted curators. Again, for now, attestations are simple thumbs up or down. Attestations are designated to apply to a specified list (currently working) or to lists in general (in progress).

There is no universal arbiter of truth. Instead, all calculations are performed from the perspective of a given user, the "seed user." By default, the seed user is YOU, but different seed users can be selected, as depicted in the screenshot.

### Sybil resistance ###

One of the principle functions of the grapevine is to resist influence by sybil attacks or other bad actors. Multiple adjustable parameters are provided, some of which are depicted in the screenshots above, including the default user parameters which determine how much influence to allow for completely unvetted users.

### the threaded tapestry model ###

Knowledge is represented in a graph, where nodes in the graph are chunks of information, and edges in the graph are specialised relationships between those chunks of information. In the decentralized web, a chunk is typically a file.

Any relationship between two chunks is called a hop.

Any continguous series of hops is called a thread.

There are many categories of threads. The threaded tapestry model relies upon a special category of thread, called the <i>class thread</i>. The hallmark feature of a class thread is that the node at one end of the thread provides information on the endoding of information in the node at the opposite end of the thread. 

The class thread may be thought of as a generalization of the notion of a <i>class</i> in an object oriented programming language such as javascript. Class threads connect to each other in a variety of ways. A collection of interconnected class threads may be referred to as a tapestry, or (equivalently) a concept graph. Class threads provide the scaffolding for the concept graph. Although other categories of threads exist, the class thread is the most important category.

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
