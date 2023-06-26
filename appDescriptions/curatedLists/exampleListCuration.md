## Curated Lists Example: Curation of a list of nostr clients

In this example, a list of nostr clients has been created and curated. In addition to submission of the list itself, there are three categories of nostr notes that are relevant to this list:
- list item submission. Anyone can contribute an item to this list.
- curator endorsement. Anyone can endorse any other user (thumbs up or down) as a curator of this list.
- list item endorsement. Anyone can endorse any submitted list item (thumbs up or down) as an item that belongs on this list.

From the above endorsements, each submitted list item is partitioned into the ACCEPTED, the REJECTED or the PENDING (not enough info yet) category. But if Alice and Bob don't "trust" the same people to curate this list, they may not see the same results!

In the panels below, the "seed user" selector determines whose perspective is being depicted (whose grapevine is being used for the curation). Results are shown below from the perspectives of two different users: 
- wds4, a regular user
- joker4, a putative bad actor promoting a scam client created with nefarious intent

Note that, in accordance with [DIP-01](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/01.md), the results of curation depend upon the choice of seed user. 

<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg2.png" width="49%" display="inline-block" />
</span>
<span style="display:inline-block" >
  <img src="../../.erb/img/nostrClientsCurationImg1.png" width="49%" display="inline-block" />
</span>

LEFT PANEL: From the perspective of wds4, "scammy fake client" is rejected from the list, with several legit clients accepted onto the list and several others awaiting curation by the grapevine. RIGHT PANEL: From the perspective of the joker, "scammy fake client" is the only one accepted onto the list, with one legit client having been rejected. 

Why do they see different results? How are the lists sorted? How does wds4 know that joker4 is a bad actor? Short answer: wds4 endorses someone who endorses someone who rejects joker4 as curator for this list. Perhaps multiple such paths exist from wds4 to joker4. This is not too hard to understand, intuitively. Users do not have to dig into the calculational details if they don't want to. Like an automobile, you don't have to know the details of how it works to use it. The take home message for this page is simply that different users do not <i>necessarily</i> see the same results. Ultimately, no one is in charge of this process other than YOU. In this way, <i>there can be no single point of failure</i>.

But for users who are even a little bit curious about how it works under the hood, they will be able to dig in all they want. See [this page](exampleListCurationGrapevine.md) for an overview of how list items are accepted and rejected.


