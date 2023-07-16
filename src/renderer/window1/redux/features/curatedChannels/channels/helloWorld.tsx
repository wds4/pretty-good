import { useSelector } from 'react-redux';
import TechDetailsforNostrNerdsA from './techDetailsForNostrNerdsA';
import TechDetailsforNostrNerdsB from './techDetailsForNostrNerdsB';
import TechDetailsforNostrNerdsC from './techDetailsForNostrNerdsC';
import TechDetailsforNostrNerdsD from './techDetailsForNostrNerdsD';
import TechDetailsforNostrNerdsE from './techDetailsForNostrNerdsE';
import TechDetailsforNostrNerdsE1 from './techDetailsForNostrNerdsE1';

const CuratedChannelsHelloWorld = () => {
  const oChannels = useSelector((state) => state.channels);
  const oConceptGraph = oChannels.conceptGraph;
  const oGrapevine = oChannels.grapevine;

  return (
    <>
      <div className="h4">Curated Channels Hello World (Redux)</div>
      <TechDetailsforNostrNerdsA oChannels={oChannels} />
      <TechDetailsforNostrNerdsD oChannels={oChannels} />
      <TechDetailsforNostrNerdsC oConceptGraph={oConceptGraph} />
      <TechDetailsforNostrNerdsB oGrapevine={oGrapevine} />
      <TechDetailsforNostrNerdsE oGrapevine={oGrapevine} />
      <hr />
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrChannelTopicsInstanceEndorsement" />
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrChannelTopicsCuratorEndorsement" />
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrChannelTopicContentCreatorEndorsement" />
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrChannelTopicsTreeStructureCuratorEndorsement" />
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrChannelTopicsRelationshipInstanceEndorsement" />
      <hr />
      <div>might be deprecating  nostrCuratedListInstanceGenericRating and nostrCuratedListsCuratorEndorsement (at least for use with Channels)</div>
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrCuratedListInstanceGenericRating" />
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrCuratedListsCuratorEndorsement" />
      <hr />
      <div>deprecating nostrChannelTopicsRelationshipCuratorEndorsement</div>
      <TechDetailsforNostrNerdsE1 oChannels={oChannels} oGrapevine={oGrapevine} ratingTemplateSlug="nostrChannelTopicsRelationshipCuratorEndorsement" />
    </>
  );
};

export default CuratedChannelsHelloWorld;
