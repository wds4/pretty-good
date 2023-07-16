import { useSelector } from 'react-redux';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds1';

const CurationOfTopicsContent = () => {
  // my info
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;

  const oNostrNodes = useSelector((state) => state.channels.conceptGraph.nodes);
  const oNostrNodesByEventID = oNostrNodes.byEventID;

  // fetch all topics from redux
  const oNostrTopicSlugs = oNostrNodes.byWordType.nostrTopic
  const aNostrTopicSlugs = Object.keys(oNostrTopicSlugs);

  // fetch all testnet-2 ratings from redux (not organized by ratings of what)
  const oRatings = useSelector((state) => state.channels.grapevine.byRatingTemplateSlug);

  // rating templates for this page
  const ratingTemplateSlugA = "nostrChannelTopicsCuratorEndorsement";
  const ratingTemplateSlugB = "nostrChannelTopicContentCreatorEndorsement";

  // ratings of curators
  const aCuratorRatingEventIDs = oRatings[ratingTemplateSlugA].aRatingEventIDs;
  const oRaterOfCuratorPubkeys = oRatings[ratingTemplateSlugA].byRaterUniversalID;
  const aRaterOfCuratorPubkeys = Object.keys(oRaterOfCuratorPubkeys);
  const oRateeOfCuratorPubkeys = oRatings[ratingTemplateSlugA].byRateeUniversalID;
  const aRateeOfCuratorPubkeys = Object.keys(oRateeOfCuratorPubkeys);

  // channelTopicFocusID
  const topicFocusID = useSelector(
    (state) => state.channels.channelTopicFocusID
  );
  /*
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  */

  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">Curation of CONTENT (pk list) for each TOPIC</div>
        <TechDetailsForNostrNerds
          aNostrTopicSlugs={aNostrTopicSlugs}

          aCuratorRatingEventIDs={aCuratorRatingEventIDs}
          aRaterOfCuratorPubkeys={aRaterOfCuratorPubkeys}
          aRateeOfCuratorPubkeys={aRateeOfCuratorPubkeys}
        />
      </div>
    </>
  )
}

export default CurationOfTopicsContent;
