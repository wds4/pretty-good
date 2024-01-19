# Overview of Curated Lists on nostr

This page displays screenshots from the [Pretty Good Apps desktop client](https://github.com/wds4/pretty-good), [v0.2.1-alpha](https://github.com/wds4/pretty-good/releases/tag/v0.2.1-alpha) to show how lists are curated by your web of trust using the [DCoSL protocol](https://github.com/wds4/DCoSL).

See how a typical list -- the list of Nostr Clients -- is created, how items are added to the list, how the list is curated by your web of trust, and how the results are calculated and displayed.

- Anyone can create a new list.
- Anyone can add an item to any list.
- For each list, your web of trust determines which items are ACCEPTED to the list, which are REJECTED, and which items remain PENDING.

## Curated Lists main page

<span style="display:inline-block" >
  <img src="../../.erb/img/curatedListsMainPage2.png" width="95%" display="inline-block" />
</span>

## View all existing Curated Lists

Curated Lists main page, left column

<span style="display:inline-block" >
  <img src="../../.erb/img/viewLists.png" width="50%" display="inline-block" />
</span>

## View all items on the selected list

Curated Lists main page, right column 

<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg2.png" width="50%" display="inline-block" />
</span>

## Create a new list

Each new list needs a name (singular and plural form) and a description. 

<span style="display:inline-block" >
  <img src="../../.erb/img/createNewList.png" height="300px" display="inline-block" />
</span>

Once a new list is created, it is stored in nostr as a kind 9901 event, which is a Regular Event and is not editable or replaceable. Info about the list (including how it is structured as JSON and stored in nostr) can be reviewed in the [list overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/singleListDetails.md)

## Add an item to a list

<span style="display:inline-block" >
  <img src="../../.erb/img/createInstance.png" height="300px" display="inline-block" />
</span>

Once a new list item (also called a list "instance") is created, it is stored in nostr as a kind 9901 event, which is a Regular Event and is not editable or replaceable. Info about the item (including how it is structured as JSON and stored in nostr) can be reviewed in the [item overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/singleListItemDetails.md)

## Endorse or Block an item for a given list

To rate an item as belonging (or not) on the list, go to the List Item information page (below) and toggle the Endorse / Unendorse (thumbs up) or Block / Unblock (thumbs down) buttons under "rate this item."

<span style="display:inline-block" >
  <img src="../../.erb/img/endorseOrBlockAnItem.png" width="90%" display="inline-block" />
</span>

Ratings are encoded according to the [DCoSL protocol]() and stored in nostr as a kind 39901 event, which are replaceable. An example of a rating which endorses Damus as belonging to the list of nostr clients can be found [here](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/rateItem.md).

## Endorse or Block a user as curator for a given list

To rate a user as a curator of the list, go to the View Profile information page (below), select the curated list of interest under "Endorse as Curator for this Nostr List," and toggle the Endorse / Unendorse (thumbs up) or Block / Unblock (thumbs down) buttons. To view these actions, the square Grapevine button (top right) will have to be toggled ON.

<span style="display:inline-block" >
  <img src="../../.erb/img/endorseOrBlockACurator.png" width="90%" display="inline-block" />
</span>

Ratings are encoded according to the [DCoSL protocol]() and stored in nostr as a kind 39901 event, which are replaceable. An example of a rating which endorses Darth McTesty as a trusted curator of the list of nostr clients can be found [here](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/rateCurator.md)

## List Curation Overview

For any given list, items are either approved or rejected by your grapevine. See the [calculations overview page](https://github.com/wds4/pretty-good/blob/main/appDescriptions/curatedLists/v021Overview/calculationsOverview.md) to see how the calculations are done.

<span style="display:inline-block" >
  <img src="../../.erb/img/listCurationMainPageWds4.png" height="300px" display="inline-block" />
</span>

## List Curation: web of trust

<span style="display:inline-block" >
  <img src="../../.erb/img/listCurationWds4WoT.png" height="300px" display="inline-block" />
</span>

## List Curation Results

<span style="display:inline-block" >
  <img src="../../.erb/img/listCurationResults_items.png" width="50%" display="inline-block" />
</span>

<div>
  <span style="display:inline-block" >
    <img
      align="top"
      width="30%"
      src="../../.erb/img/listCurationResults_itemScores.png"
    />
  </span>
  <span style="display:inline-block" >
    <img
      align="top"
      width="30%"
      src="../../.erb/img/listCurationResults_curatorScores.png"
    />
  </span>
</div>

## List Curation Control Panel

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

