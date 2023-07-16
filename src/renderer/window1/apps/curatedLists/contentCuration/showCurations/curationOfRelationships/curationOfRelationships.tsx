import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds1';

const CurationOfRelationships = () => {
  // TO DO:
  //
  // create two new rating templates:
  // nostrChannelTopicsRelationshipInstanceEndorsement
  // nostrChannelTopicsRelationshipCuratorEndorsement
  // (model these after nostrChannelTopicsInstanceEndorsement and nostrChannelTopicsCuratorEndorsement)
  // put both of them in contentCuration/const folder with the other ratingTemplate skeletons
  // also put them both in DCoSL dips/grapevine/ratingsSkeletons with other ratingTemplate skeletons
  // Apply these two rels to the pages where rels and rel curators are endorsed:
  // - topic relationships (redux) page, showCurations/curationOfRelationships (nostrChannelTopicsRelationshipInstanceEndorsement)
  // - user profile page (nostrChannelTopicsRelationshipCuratorEndorsement) * DEPRECATED
  // Make sure new ratings can get made
  // make sure new ratings are properly categorized in slice
  // make sure they show up in Content Curation, settings, redux
  // make sure existing ratings register on the pages where they are created (see above)
  // THEN get back to work on THIS PAGE (curationOfRelationships) and the sibling page, curationOfTopics page
  // Work on both of these two pages in parallel:
  // gather all relevant data
  // show nodes and edges in graph
  // reconstitute the calculations page
  // store results on calculations in redux

  // NOTE: nostrChannelTopicsRelationshipCuratorEndorsement is being DEPRECATED. This function is taken care of by nostrChannelTopicsTreeStructureCuratorEndorsement

  // my info
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;

  const oNostrNodes = useSelector((state) => state.channels.conceptGraph.nodes);
  const oNostrNodesByEventID = oNostrNodes.byEventID;

  // fetch all topics from redux
  const oNostrTopicSlugs = oNostrNodes.byWordType.nostrTopic
  const aNostrTopicSlugs = Object.keys(oNostrTopicSlugs);

  // fetch all relationships from redux
  const oNostrRelationships = oNostrNodes.byWordType.relationship;
  const aNostrRelationships = Object.keys(oNostrRelationships);

  // fetch all testnet-2 ratings from redux (not organized by ratings of what)
  const oRatings = useSelector((state) => state.channels.grapevine.byRatingTemplateSlug);

  // rating template for this page
  const ratingTemplateSlugA = "nostrChannelTopicsTreeStructureCuratorEndorsement";
  const ratingTemplateSlugB = "nostrChannelTopicsRelationshipInstanceEndorsement";

  // ratings of tree curators
  const aCuratorRatingEventIDs = oRatings[ratingTemplateSlugA].aRatingEventIDs;
  const oRaterOfCuratorPubkeys = oRatings[ratingTemplateSlugA].byRaterUniversalID;
  const aRaterOfCuratorPubkeys = Object.keys(oRaterOfCuratorPubkeys);
  const oRateeOfCuratorPubkeys = oRatings[ratingTemplateSlugA].byRateeUniversalID;
  const aRateeOfCuratorPubkeys = Object.keys(oRateeOfCuratorPubkeys);

  // ratings of relationship instances
  const aInstanceRatingEventIDs = oRatings[ratingTemplateSlugB].aRatingEventIDs;
  const oRaterOfInstancePubkeys = oRatings[ratingTemplateSlugB].byRaterUniversalID;
  const aRaterOfInstancePubkeys = Object.keys(oRaterOfInstancePubkeys);
  const oRateeOfInstanceEventIDs = oRatings[ratingTemplateSlugB].byRateeUniversalID;
  const aRateeOfInstanceEventIDs = Object.keys(oRateeOfInstanceEventIDs);

  // merge arrays of raters (of topics and curators) and ratees (curators); also make sure my pubkey is present
  const aSeedUserOptionsPubkeys = removeDuplicatesFromArrayOfStrings(aRaterOfCuratorPubkeys.concat(aRateeOfCuratorPubkeys,aRaterOfInstancePubkeys,[myPubkey]));

  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">Curation of the list of Topic to Topic RELATIONSHIPS</div>
        <TechDetailsForNostrNerds
          aNostrTopicSlugs={aNostrTopicSlugs}
          aNostrRelationships={aNostrRelationships}

          aCuratorRatingEventIDs={aCuratorRatingEventIDs}
          aRaterOfCuratorPubkeys={aRaterOfCuratorPubkeys}
          aRateeOfCuratorPubkeys={aRateeOfCuratorPubkeys}

          aInstanceRatingEventIDs={aInstanceRatingEventIDs}
          aRaterOfInstancePubkeys={aRaterOfInstancePubkeys}
          aRateeOfInstanceEventIDs={aRateeOfInstanceEventIDs}

          aSeedUserOptionsPubkeys={aSeedUserOptionsPubkeys}
        />
      </div>
    </>
  )
}

export default CurationOfRelationships;
