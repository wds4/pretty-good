Go back to [overview of curated lists page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/overview.md)

# Ratings of Items

View all item ratings for the selected list.

<span style="display:inline-block" >
  <img
    width="100%"
    src="../../../.erb/img/ratingsOfItems.png"
  />
</span>

## Rate item: an example

Ratings are encoded as JSON according to the [DCoSL protocol](https://github.com/wds4/DCoSL).

<span style="display:inline-block" >
  <img
    width="100%"
    src="../../../.erb/img/ratingOfItem_word.png"
  />
</span>

The above JSON is wrapped and broadcast as a kind 39901 event (Parameterized Replaceable Event). Parameterized Replaceable Events are utilized so that the rater can update or delete the rating. Setting regularSliderRating to null is interpreted as a deleted rating.

Several tags are employed to increase the efficiency of finding ratings of a desired category, e.g. ratings of a particular item, of items on a particular list, etc.

<span style="display:inline-block" >
  <img
    width="100%"
    src="../../../.erb/img/ratingOfItem_event.png"
  />
</span>

