Go back to [overview of curated lists page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/overview.md)

# How are calculations performed?

For each list, your web of trust determines which items are ACCEPTED, which are REJECTED, and which are PENDING.

# Screenshots

The PGA desktop app lets you review the raw data and all calculations.

## Curator score

- determines how much influence any given user has over the items on this list, as well as the scores of other curators

<span style="display:inline-block" >
  <img
    width="100%"
    src="../../../.erb/img/calculationsOverview_joker1.png"
  />
</span>

## Item score

- determines whether this item belongs on the accepted, the rejected, or the pending list

<span style="display:inline-block" >
  <img
    width="100%"
    src="../../../.erb/img/calculationsOverview_damus.png"
  />
</span>

# Control Panel settings

See the [overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/overview.md) (scroll to the bottom) for an overview of the control panel settings.

The most important control panel settings are:
- Seed user. YOU are the center of YOUR web of trust. The seed user allows us to switch perspective from one user to another.
- default user trust score and list item score. If a user or item has not been rated by anyone, the default scores kick in.
- attenuation factor. How much do you really want to trust a user who is some very large number of hops away from you in your web of trust? The attenuation factor is a number between 0 and 1 that adjusts how much *weight* you give to each curator trust rating. Setting AF closer to 1 is more permissive; closer to 0 is more stringent.

# How is the data processed?

## Inputs

- lists and list items
- ratings of list items
- ratings of users
- control panel settings

## Basic principles

- For each list like the list of *Nostr Clients*, there are in fact two associated lists: the list of items and the list of curators.
- Average scores are calculated as *weighted* averages.
- The weight for each rating is determined primarily by the *influence* of the rater. A rating by a user with zero trust is therefore given zero weight, i.e. it is ignored.
- Each user has an influence score that is contextual, i.e. in the context of a specific list.
- A user's influence score is used for both purposes: for picking list items and for picking list curators.
- For each user and list score, there is an associated *confidence* parameter that depends on the number of ratings that go into that calculation and on the weight of each of those ratings. Confidence is a number that ranges from 0 to 100%.
- A user's influence is determined not only by that user's average trust score, but also by the *confidence* in that user's trust score.

## Script

There is a script that runs continuously in the background, which iterates through the following steps:

Step 1: calculate curator scores.

Step 2: calculate item scores.

Step 3: distribute items into accepted, rejected, and pending bins based on their scores

You can adjust the various control panel settings and observe the changes in the web of trust in real time.

## Not yet implemented in the v0.2.1-alpha release: trust score hierarchy

A hierarchy of curator scores will be created, with a generic trust score at the top of the hierarchy and with default trust scores inherited from top of the hierarchy (generic) to the bottom (specific). This will have the benefit that when highly specific, niche topic lists are created that may have a paucity of curator trust scores, list items can be processed based on inherited trust scores.

