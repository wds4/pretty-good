## Curated Lists Example: Curation of a list of nostr clients

In this example, a list of nostr clients has been created and curated. The "seed user" selector determines whose perspective is being depicted (whose grapevine is being used for the curation). Results are shown below from the perspectives of two different users: 
- wds4, a regular user
- joker4, a putative bad actor promoting a scam client created with nefarious intent

<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg2.png" width="49%" display="inline-block" />
</span>
<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg1.png" width="49%" display="inline-block" />
</span>

Note that, in accordance with [DIP-01](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/01.md), the results of curation depend upon the choice of seed user. LEFT PANEL: From the perspective of wds4, "scammy fake client" is rejected from the list, with several legit clients accepted onto the list and several others awaiting curation by the grapevine. RIGHT PANEL: From the percpective of the joker, "scammy fake client" is the only one accepted onto the list, with one legit client having been rejected. 

Why do they see different results? How does wds4 know that joker is a bad actor? How are the lists sorted? The panels below illustrate how these determinations are made.

A common practice would be to rely upon "scraped data," such as a follows list, coupled with the inference that following a profile equals trusting that profile. Such inferences are frequently (or even usually) wrong, which is why DCoSL adopts [DIP-02](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/02.md) which explicitly rejects the use of scraped data in favor of explicit statements. In this example, there are two types of explicit statements: 1) endorsements (or rejection) of users as curators of this list, and 2) endorsements (or rejection) of list items (nostr clients) as belonging (or not belonging) to the list.

The below two panels illustrate curation of the list of nostr clients from the perspective of the user "tonyStark," set as the seed user. Circles represent users, with circle radius being proportional to the amoount of <i>influence</i> that user carries on the curation of the list in question. The diamonds indicate list items. Arrows represent endorsements from user to user or user to list item, with the thickness of the arrow indicating whether the endorsement is favorable / acceptance (thick) or unfavorable / rejection (thin). Opacity of circles, arrows, and diamonds is another method to indicate influence: users, ratings, or items that have been rejected by your grapevine are rendered invisible.

<span style="display:inline-block" >
  <img src="../../.erb/img/listCuration1.png" width="49%" display="inline-block" />
</span>
<span style="display:inline-block" >
  <img src="../../.erb/img/listCuration2.png" width="49%" display="inline-block" />
</span>

LEFT PANEL: Average scores for each item (diamonds) are shown in the table and also depicted in the graph using the vertical scale. In place of the "number of ratings," which is what you might see on a site like Amazon, here you see the "input" which is a sum of the influence of each user who provided a rating for that item. RIGHT PANEL: The default scores of unvetted users are being adjusted in the Control Panel. Note that "joker3", an accomplice of "joker4", has some influence on the right panel but zero influence (zero radius) on the left panel. This is the result of adjustments in the default user scores. By increasing the defaults, the unvetted user joker3 has managed to slightly increase the score of "scammy fake client" from 0 to about 0.2. In any given setting, user defaults could be set to 0 if bad actors are presumed to be aplenty, or to some positive number if bad actors are presumed scarce. 
