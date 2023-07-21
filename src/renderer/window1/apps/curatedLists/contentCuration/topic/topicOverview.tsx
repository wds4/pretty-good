import { useSelector } from 'react-redux';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';

const TopicOverview = () => {
  const curatedChannelsTopicFocus = useSelector((state) => state.prettyGoodGlobalState.curatedChannelsTopicFocus);
  const oNodes = useSelector((state) => state.channels.conceptGraph.nodes.byEventID);
  let oEvent = {};
  let oWord = {};
  if (oNodes[curatedChannelsTopicFocus]) {
    oEvent = oNodes[curatedChannelsTopicFocus].event;
    oWord = oNodes[curatedChannelsTopicFocus].word;
  }
  let topicName = null;
  let topicDescription = null;
  if (oWord.nostrTopicData) {
    topicName = oWord.nostrTopicData.name;
    topicDescription = oWord.nostrTopicData.description;
  }
  return (
    <>
      <div><span style={{color:"grey"}}>topic name:</span> {topicName}</div>
      <div><span style={{color:"grey"}}>description:</span> {topicDescription}</div>
      <div style={{marginTop:"20px"}}>
        <TechDetailsForNostrNerds1 oWord={oWord} />
        <TechDetailsForNostrNerds2 oEvent={oEvent} />
      </div>
    </>
  );
};
export default TopicOverview;
