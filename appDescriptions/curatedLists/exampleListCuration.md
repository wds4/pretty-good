## Curated Lists Example: Curation of a list of nostr clients

In this example, a list of nostr clients has been created and curated. The results of curation are shown below, first from the perspective of "joker4" (a putative bad actor promoting a scam client created with nefarious intent), then from the perspective of "wds4."

<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg2.png" width="49%" display="inline-block" />
</span>
<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg1.png" width="49%" display="inline-block" />
</span>

Note that, in accordance with [DIP-01](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/01.md), the results of curation depend upon the choice of seed user. LEFT PANEL: From the perspective of wds4, "scammy fake client" is rejected from the list, with several legit clients accepted onto the list and several others awaiting curation by the grapevine. RIGHT PANEL: From the percpective of the joker, "scammy fake client" is the only one accepted onto the list, with one legit client having been rejected. 

How does wds4 know that joker is a bad actor? How are the lists sorted? The panels below show how this determination is made.

This example serves to illustrate [DIP-02](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/02.md). A common practice would be to rely upon "scraped data," such as a follows list, coupled with the inference that following a profile equals trusting that profile. Such inferencesare frequently wrong, which is why DCoSL rejects the use of scraped data. In this example, following DIP-02, list curation is based entirely on explicit endorsements (or rejection) of users as curators of this list plus explicit endorsements (or rejection) of list items (nostr clients) as belonging (or not belonging) to the list.

The below two panels illustrate curation of the list of nostr clients from the perspective of the user "tonyStark," set as the seed user. Circles represent users, with circle radius being proportional to the amoount of <i>influence</i> that user carries on the curation of the list being depicted. 

<span style="display:inline-block" >
  <img src="../../.erb/img/listCuration1.png" width="49%" display="inline-block" />
</span>
<span style="display:inline-block" >
  <img src="../../.erb/img/listCuration2.png" width="49%" display="inline-block" />
</span>
