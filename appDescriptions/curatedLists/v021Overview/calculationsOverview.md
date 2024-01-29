Go back to [overview of curated lists page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/overview.md)

# How are calculations performed?

For each list, your web of trust determines which items are ACCEPTED, which are REJECTED, and which are PENDING.

# Ratings

There are two types of ratings: ratings of list items and ratings of curators. Each rating is either an endorsement / "thumbs up" score of 100 or a rejection / block  / "thumbs down" score of 0. Future iterations of WoT will show the user a slider and can be any rating between 0 and 100 (or higher -- see below), But for now, to keep things simple, the user sees only a binary option.

A score of 0 is interpreted as a recommendation to give zero weight to the ratee. A score of 100 is defined as a recommendation to give weight to the ratee equal to the weight of the rater. In theory, the score can be higher than 100, if the rater recommends to give the ratee MORE weight than the rater, which would be appropriate if, say, someone is rating Einstein in a physics-related context. This introduces the opportunity for abuse which is addressed through the introduction of an optional attenuation factor that automatically kicks in for ridiculously high ratings.

Each rating is also associated with a "confidence" score, which is a number between 0 % and 100 %. To keep things simple, this option is hidden, and the default score is set to 80%.

# Calculations

## Calculations of curator trust scores

The goal is to calculate, for each user, a quantity called *influence* which is used to determine that user's weight. Each list is its own independent "context"

For each user, an *average score* is first calculated, which will be a number between 0 and 100. The average score is a weighted average, calculated from every trust rating. The weight of each rating is equal to the *influence* of the rater, multiplied by the confidence score of the rating (set to 0.8 for all ratings for now), and multiplied by the *attenuation factor*, which is a user-controlled parameter between 0 and 1. 

For each average score, a variable called *input* is defined as the sum of all of these individual weights. In theory, the input ranges from 0 to infinity. This number is mapped to a score called *certainty* which is a number between 0% and 100%. 

The user's *influence* is defined as the product of the *average rating* and the *certainty* in the average rating. In this manner, an "influencer" with a stupendously large number of endorsements will have only a MARGINALLY higher influence than someone with a small number of endorsements. The equation to convert *input* into *certainty* is controlled by a parameter called *rigor* in the control panel.

Summary:
- *average score*: a weighted average
- *input*: the sum of the weights of all the ratings that make up the average score
- *certainty*: a number between 0 and 100%, calculated from *input*; a certainty of 100% would require infinite input.
- *influence* = average * certainty

## Calculations of list item scores

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

