import { useSelector } from 'react-redux';
import CreateNewRating from './createNewRating';

const TopicSelector = () => {
  const oNostrNodesByEventID = useSelector(
    (state) => state.channels.conceptGraph.nodes.byEventID
  );
  const oNostrTopics = useSelector(
    (state) => state.channels.conceptGraph.nodes.byWordType.nostrTopic
  );
  let aNostrTopics = Object.keys(oNostrTopics);
  if (!aNostrTopics) { aNostrTopics = [] }
  return (
    <>
      <select>
        <option></option>
        {aNostrTopics.map((nostrTopicWordSlug) => {
          const oNostrTopic = oNostrTopics[nostrTopicWordSlug];
          const event_id = oNostrTopic.versionIndependent;
          const oWord = oNostrNodesByEventID[event_id].word;
          const { event } = oNostrNodesByEventID[event_id];
          let name = '';
          if (oWord.hasOwnProperty('nostrTopicData')) {
            name = oWord.nostrTopicData.name;
          }
          const successMessageContainerElem = `successMessageContainer_${event_id}`;
          return (
            <>
              <option>{name}</option>
            </>
          )
        })}
      </select>
    </>
  )
}

const CuratedChannelsBox = ({pubkey, userData}) => {
  const isNostrGrapevineOn = useSelector(
    (state) => state.nostrSettings.nostrGrapevineSettings.active
  );

  if (isNostrGrapevineOn) {
    return (
      <>
        <div style={{ border: '1px solid purple', padding: '5px' }}>
          <div style={{ color: 'grey' }}>
            Curated Channels stuff
          </div>
          <div style={{ color: 'grey' }}>
            Endorse this user to curate the topic graph (accept topics & organize them into subcategories)
          </div>
          <CreateNewRating
            pubkeyFocusID={pubkey}
            userData={userData}
          />

          <div style={{ color: 'grey' }}>
            Endorse this user to associate content to a given topic
            <TopicSelector />
          </div>
          <div style={{ color: 'grey' }}>
            Endorse this user as a content creator for a given topic
            <TopicSelector />
          </div>
        </div>
      </>
    );
  }
  return <></>;
};
export default CuratedChannelsBox;
