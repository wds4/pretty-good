import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg';
import CurationOfTopics from './curationOfTopics';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds1';

const CurationOfTopicsRedux = () => {
  const oControlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );
  // my info
  const oMyNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = oMyNostrProfile.pubkey_hex;

  const oNostrNodes = useSelector((state) => state.channels.conceptGraph.nodes);
  const oNostrNodesByEventID = oNostrNodes.byEventID;

  // fetch all topics from redux
  const oNostrTopicSlugs = oNostrNodes.byWordType.nostrTopic
  const aNostrTopicSlugs = Object.keys(oNostrTopicSlugs);

  // fetch all testnet-2 ratings from redux (not organized by ratings of what)
  const oRatings = useSelector((state) => state.channels.grapevine.byRatingTemplateSlug);

  // rating templates for this page
  const ratingTemplateSlugA = "nostrChannelTopicsTreeStructureCuratorEndorsement";
  const ratingTemplateSlugB = "nostrChannelTopicsInstanceEndorsement";

  // ratings of tree curators
  const aCuratorRatingEventIDs = oRatings[ratingTemplateSlugA].aRatingEventIDs;
  const oRaterOfCuratorPubkeys = oRatings[ratingTemplateSlugA].byRaterUniversalID;
  const aRaterOfCuratorPubkeys = Object.keys(oRaterOfCuratorPubkeys);
  const oRateeOfCuratorPubkeys = oRatings[ratingTemplateSlugA].byRateeUniversalID;
  const aRateeOfCuratorPubkeys = Object.keys(oRateeOfCuratorPubkeys);

  // ratings of topic instances
  const aInstanceRatingEventIDs = oRatings[ratingTemplateSlugB].aRatingEventIDs;
  const oRaterOfInstancePubkeys = oRatings[ratingTemplateSlugB].byRaterUniversalID;
  const aRaterOfInstancePubkeys = Object.keys(oRaterOfInstancePubkeys);
  const oRateeOfInstanceEventIDs = oRatings[ratingTemplateSlugB].byRateeUniversalID;
  const aRateeOfInstanceEventIDs = Object.keys(oRateeOfInstanceEventIDs);

  // merge arrays of raters (of topics and curators) and ratees (curators); also make sure my pubkey is present
  const aSeedUserOptionsPubkeys = removeDuplicatesFromArrayOfStrings(aRaterOfCuratorPubkeys.concat(aRateeOfCuratorPubkeys,aRaterOfInstancePubkeys,[myPubkey]));

  return (
    <>
      <div>
        <CurationOfTopics
          oControlPanelSettings={oControlPanelSettings}
          oMyNostrProfile={oMyNostrProfile}
          oNostrNodes={oNostrNodes}

          aNostrTopicSlugs={aNostrTopicSlugs}

          aCuratorRatingEventIDs={aCuratorRatingEventIDs}
          aRaterOfCuratorPubkeys={aRaterOfCuratorPubkeys}
          aRateeOfCuratorPubkeys={aRateeOfCuratorPubkeys}

          aInstanceRatingEventIDs={aInstanceRatingEventIDs}
          aRaterOfInstancePubkeys={aRaterOfInstancePubkeys}
          aRateeOfInstanceEventIDs={aRateeOfInstanceEventIDs}

          aSeedUserOptionsPubkeys={aSeedUserOptionsPubkeys}
        />
        <TechDetailsForNostrNerds
          aNostrTopicSlugs={aNostrTopicSlugs}

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

export default CurationOfTopicsRedux;
