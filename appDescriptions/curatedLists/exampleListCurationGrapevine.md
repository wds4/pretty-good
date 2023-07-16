The [previous page](exampleListCuration.md) showed an example of list curation from the perspective of two seed users: one (wds4) a regular user, and the other (joker4) a putative bad actor. Notably, the items that were accepted or rejected from the list were not the same for the two seed users.

In this page, we ask: Why do they see different results? How does wds4 know that joker is a bad actor? How are the lists sorted? The panels below illustrate how these determinations are made.

A common practice would be to rely upon "scraped data," such as a follows list, coupled with the inference that following a profile equals trusting that profile. Such inferences are frequently (or even usually) wrong, which is why DCoSL adopts [DIP-02](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/02.md) which explicitly rejects the use of scraped data in favor of explicit statements. In this example, there are two types of explicit statements: 1) endorsements (or rejection) of users as curators of this list, and 2) endorsements (or rejection) of list items (nostr clients) as belonging (or not belonging) to the list.

The below two panels illustrate curation of the list of nostr clients from the perspective of the user "tonyStark," set as the seed user. Circles represent users, with circle radius being proportional to the amoount of <i>influence</i> that user carries on the curation of the list in question. The diamonds indicate list items. Arrows represent endorsements from user to user or user to list item, with the thickness of the arrow indicating whether the endorsement is favorable / acceptance (thick) or unfavorable / rejection (thin). The opacity of circles, arrows, and diamonds indicates the degree of certainty your grapevine has in the relevant average score, so that a score calculated using a higher number of ratings from trusted users will grab your attention more than one calculated from a small number of ratings from relatively untrusted users.

<span style="display:inline-block" >
  <img src="../../.erb/img/listCuration1.png" width="49%" display="inline-block" />
</span>
<span style="display:inline-block" >
  <img src="../../.erb/img/listCuration2.png" width="49%" display="inline-block" />
</span>

LEFT PANEL: Average scores for each item (diamonds) are shown in the table and also depicted in the graph using the vertical scale. In place of the "number of ratings," which is what you might see on a site like Amazon, here you see the "input" which is a sum of the influence of each user who provided a rating for that item. RIGHT PANEL: The default scores of unvetted users are being adjusted in the Control Panel. Note that "joker3", an accomplice of "joker4", has some influence on the right panel but zero influence (zero radius) on the left panel. This is the result of adjustments in the default user scores. By increasing the defaults, the unvetted user joker3 has managed to slightly increase the score of "scammy fake client" from 0 to about 0.2. In any given setting, user defaults could be set to 0 if bad actors are presumed to be aplenty, or to some positive number if bad actors are presumed scarce. 

If you want to delve into the precise details of the various calculations, a panel is made available in the app to do that. (Will add screenshots later.)

