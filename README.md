# Pretty Good

A nostr desktop client for linux, mac, and windows.

The goal of this project is to build a decentralized web of trust using a model for decentralized knowledge representation and curation that I call the <i>threaded tapestry</i>.

This is a fork of my older project, [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

As of May 2023: *** still in alpha ***
This is not quite ready for use by regular users. Still too many bugs and it's not always obvious how to find some of the features that do work. To any devs who are interested in decentralized web of trust: I am happy to get on a video call and walk you through how this works and what it can do. My long term goal is to see widespread adoption of the ideas and methods illustrated in this repo. (Not my code, but the ideas behind the code.)

## Nostr

Basic nostr functionality is currently available. Features include:
<li>create new profile
<li>import profile
<li>edit profile
<li>manage multiple profiles
<li>main feed
<li>following, extended following, and "firehose" options all available for the main feed
<li>post new note
<li>find new users
<li>look at user profiles
<li>send / receive direct messages
<li>manage relays

However, this is still very much in alpha! Expect things to break, even if they are currently working.

Incomplete list of known issues:
<li>extended following list seems to freeze up -- authors list too big?
<li>cannot yet reply to existing note
<li>view thread does not always pull the entire thread
<li>likes, zaps not yet implemented
<li>render images in notes: not yet implemented
<li>for the main feed, data persistence using redux works but is exceedingly slow; therefore currently off by default (can turn it on in settings)
<li>the follow list updates correctly locally but broadcasts the wrong version to the network

## Curated Lists: decentralized web of trust

You won't find this anywhere else.

Curation of items on a list by a decentralized web of trust. This is the simplest demonstration of the threaded tapestry model I have been able to devise so far that demonstrates knowledge representation as well as knowledge curation.

Current features:
<li>anyone can create a new list
<li>anyone can add items to any list
<li>anyone can endorse (thumbs up or down) any item on any list
<li>anyone can endorse (thumbs up or down) any user as a trusted curator of a given list
<li>calculate weighted average scores of list items
<li>calculate weighted average scores of curators (to determine influence)
<li>graphical visualization of how average scores are calculated (see image below)

Incomplete
<li>listener functions need to be moved to the background
<li>lots of other things

Known issues/bugs
<li>summary views are incomplete and/or hard to find
<li>several deprecated pages that need to be removed
<li>may others, to be added

In the example shown below (currently live, although still in testnet), your web of trust tells you which nostr clients are the best nostr clients! Hooray Iris!

<img src=".erb/img/listCuration1.png" width="100%" />

Anyone can rate items on any list. For now, ratings consist of a simple thumbs up or down. The system is designed so that more complex ratings (e.g., rate from 1-5 stars or rate 0-100) will be simple to incorporate.

Users can designate other users to be trusted curators. Again, for now, attestations are simple thumbs up or down. Attestations are designated to apply to a specified list (currently working) or to lists in general (in progress).

<img src=".erb/img/listCuration2.png" width="100%" />

One of the principle functions of the grapevine is to resist influence by sybil attacks or other bad actors. Multiple adjustable parameters are provided, some of which are depicted in the screenshots above, including the default user parameters which determine how much influence to allow for completely unvetted users.

There is no universal arbiter of truth. Instead, all calculations are performed from the perspective of a given user, the "seed user." By default, the seed user is YOU, but different seed users can be selected, as depicted in the screenshot.

## the threaded tapestry model ##

The threaded tapestry model is broken down into two parts: 1) decentralized knowledge representation and 2) decentralized knowledge curation.

### decentralized knowledge representation: the concept graph ###

A list is a stripped-down version of what I call a concept. Eventually, this will mature into what I call the concept graph.

### decentralized knowledge curation: the grapevine

When calculating weighted average scores, the trick is to determine how much weight to give to any single user's rating, to do so in a way that is contextual, and to do so in a way that resists sybil and other forms of attacks. Calculation of these weights is the purvue of the grapevine. A working implementation of the grapevine is seen in the above screenshots.

## abstract overview of the threaded tapestry model

### knowledge representation in the TT model

Knowledge is represented in a graph, where nodes in the graph are chunks of information, and edges in the graph are specialised relationships between those chunks of information. In the decentralized web, a chunk is typically a file. (I speculate that in the cerebral cortex -- another example of a decentralized, distributed system -- a cortical column [an arrangement of typically about 1000 neurons] may play the role of a chunk. Axonal projections from one column directly to another would naturally function as edges.)

Any relationship between two chunks is called a hop.

Any continguous series of hops is called a thread.

There are many categories of threads. The threaded tapestry model relies upon a special category of thread, called the <i>class thread</i>. The hallmark feature of a class thread is that the node at one end of the thread (the <i>class node</i>) provides information on how information is encoded in the node at the opposite end of the thread (the <i>instance node</i>).

As an example of a class thread, consider the class node "dog" and the instance node "Fido," each of which is a JSON file, with the class node stipulating that each instance node contains a property called "name" (Fido) and "owner" (Alice).

Any given class node likely gives rise to multiple class threads. The collection of all class threads emanating from one class node is called a concept.

The class thread is so named because it may be thought of as a generalization of the notion of a <i>class</i> in an object oriented programming language such as javascript. In the above example, consider a javascript Class called "dog" with instances "Fido," "Spot," etc. 

Class threads connect to each other in a variety of ways. A collection of interconnected class threads may be referred to as a tapestry, or (equivalently) a concept graph. Class threads provide the scaffolding for the concept graph. Although other categories of threads exist, the class thread is the most important category of thread.

### knowledge curation in the TT model

(best way to understand this is to see it in action. Which is why I'm coding this app. See the screenshots above showing how the grapevine curates a list.)

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
