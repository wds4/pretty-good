# Overview of Curated Lists on nostr

This page displays screenshots from the [Pretty Good Apps desktop client](https://github.com/wds4/pretty-good), [v0.2.1-alpha](https://github.com/wds4/pretty-good/releases/tag/v0.2.1-alpha) to show how lists are curated by your web of trust using the [DCoSL protocol](https://github.com/wds4/DCoSL).

We will be using the list of *Nostr Clients* for illustration purposes.

## Curated Lists main page

<span style="display:inline-block" >
  <img src="../../.erb/img/curatedListsMainPage2.png" width="100%" display="inline-block" />
</span>

## View all existing Curated Lists

Curated Lists main page, left column

<span style="display:inline-block" >
  <img src="../../.erb/img/viewLists.png" width="100%" display="inline-block" />
</span>

## View all items on the selected list

Curated Lists main page, right column 

Your web of trust decides which items are ACCEPTED, which are REJECTED, and which are still pending review.

<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg2.png" width="100%" display="inline-block" />
</span>

## Create a new list

<span style="display:inline-block" >
  <img src="../../.erb/img/createNewList.png" width="100%" display="inline-block" />
</span>

Once a new list is created, it is stored in nostr as a kind 9901 event. See the [list overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/singleListDetails.md) for technical details.

## Add an item to a list

<span style="display:inline-block" >
  <img src="../../.erb/img/createInstance.png" width="100%" display="inline-block" />
</span>

Once a new list item (also called a list "instance") is created, it is stored in nostr as a kind 9901 event. See the [item overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/singleListItemDetails.md) for technical details.

## Rate items

The item rating systems allows users to attest that item X belongs or does not belong on list Y.

<span style="display:inline-block" >
  <img src="../../.erb/img/endorseOrBlockAnItem.png" width="100%" display="inline-block" />
</span>

Ratings are encoded according to the [DCoSL protocol]() and stored in nostr as a kind 39901 event. See [item rating overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/rateItem.md) for technical details.

## Rate curators

The curator rating systems allows users to attest that Alice should or should not be trusted to curate a specific list X.

<span style="display:inline-block" >
  <img src="../../.erb/img/endorseOrBlockACurator.png" width="100%" display="inline-block" />
</span>

To access the ratings buttons, make sure the square Grapevine button (top right) is toggled ON.

Ratings are encoded according to the [DCoSL protocol](https://github.com/wds4/DCoSL) and stored in nostr as a kind 39901 event. See [this page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/rateCurator.md) for technical details.

## List Curation Overview

For any given list, items are either approved or rejected by your grapevine. See the [calculations overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/calculationsOverview.md) to see how the calculations are done.

<span style="display:inline-block" >
  <img src="../../.erb/img/listCurationMainPageWds4.png" width="100%" display="inline-block" />
</span>

## List Curation: web of trust

<span style="display:inline-block" >
  <img src="../../.erb/img/listCurationWds4WoT.png" width="100%" display="inline-block" />
</span>

- Circles represent users. Size of circle = how much influence that user has on curation of this list.
- Arrows represent ratings of users (blue arrows) or of list items (green arrows). Thick arrows = accept; thin = reject.
- Diamonds represent items on the list. Vertical position reflects that item's average score.

## List Curation Results

<span style="display:inline-block" >
  <img src="../../.erb/img/listCurationResults_items.png" width="100%" display="inline-block" />
</span>

<div>
  <span style="display:inline-block" >
    <img
      align="top"
      width="48%"
      src="../../.erb/img/listCurationResults_itemScores.png"
    />
  </span>
  <span style="display:inline-block" >
    <img
      align="top"
      width="48%"
      src="../../.erb/img/listCurationResults_curatorScores.png"
    />
  </span>
</div>

## List Curation Control Panel

Users have tremendous control over how the data is processed. Why? To deal with sybil attacks and bad actors. Most settings range between two extremes: "more permissive" versus "more stringent." The default settings will work in most cases. But in the case of sybil attacks, users may want to learn about these various settings and make adjustments accordingly.

Control Panel: Users and Items

<div>
  <span style="display:inline-block" >
    <img
      align="top"
      width="49%"
      src="../../.erb/img/listCurationControlPanel_users.png"
    />
  </span>

  <span style="display:inline-block" >
    <img
      align="top"
      width="49%"
      src="../../.erb/img/listCurationControlPanel_items.png"
    />
  </span>
</div>

Control Panel: Display

<div>
  <span style="display:inline-block" >
    <img src="../../.erb/img/listCurationControlPanel_display.png" width="49%" display="inline-block" />
  </span>
</div>

Control Panel: Sybil Mitigation: Overview and Rigor

<div>
  <span style="display:inline-block" >
    <img
      align="top"
      width="49%"
      src="../../.erb/img/listCurationControlPanel_sybilMitigation_overview.png"
    />
  </span>

  <span style="display:inline-block" >
    <img
      align="top"
      width="49%"
      src="../../.erb/img/listCurationControlPanel_sybilMitigation_rigor.png"
    />
  </span>
</div>

Control Panel: Sybil Mitigation: Defense

<div style="border:1px solid red;" >
  <span style="display:inline-block" >
    <img 
      align="top"
      width="30%"
      src="../../.erb/img/listCurationControlPanel_sybilMitigation_defense_mod1.png"
    />
  </span>
  
  <span style="display:inline-block" >
    <img
      align="top"
      width="30%"
      src="../../.erb/img/listCurationControlPanel_sybilMitigation_defense_mod2.png"
    />
  </span>
  
  <span style="display:inline-block" >
    <img
      align="top"
      width="30%"
      src="../../.erb/img/listCurationControlPanel_sybilMitigation_defense_mod3.png"
    />
  </span>
</div>

