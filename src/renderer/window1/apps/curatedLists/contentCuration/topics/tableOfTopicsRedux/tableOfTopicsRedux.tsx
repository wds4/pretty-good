import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import TopicRatingPanel from './topicRatingPanel';

const TableOfTopicsRedux = () => {
  const oNostrNodesByEventID = useSelector(
    (state) => state.channels.conceptGraph.nodes.byEventID
  );
  const oNostrTopics = useSelector(
    (state) => state.channels.conceptGraph.nodes.byWordType.nostrTopic
  );
  const aNostrTopics = Object.keys(oNostrTopics);

  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">Table of Topics (redux)</div>
        <div style={{ color: 'grey', margin: '20px' }}>
          This is a list of all topics that have been submitted to the list of
          nostr topics. Use this page to submit whether you accept or reject any
          given topic as belonging or not belonging on the list. (Reject
          anything that you see as spam.)
        </div>
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
              <div
                style={{
                  padding: '5px',
                  marginBottom: '5px',
                  border: '1px solid blue',
                  borderRadius: '5px',
                }}
              >
                <div style={{}}>
                  <div style={{ display: 'inline-block', width: '25%' }}>
                    <NavLink
                      onClick={() => {
                        // dispatch(updateCuratedListFocus(event_id));
                      }}
                      end
                      to="/CuratedListsHome/ContentCurationSingleTopicHome"
                      style={{ textDecoration: 'none' }}
                    >
                      <div>{name}</div>
                    </NavLink>
                  </div>
                  <div style={{ display: 'inline-block', width: '75%' }}>
                    <TopicRatingPanel
                      oWord={oWord}
                      event={event}
                      event_id={event_id}
                      oNostrNodesByEventID={oNostrNodesByEventID}
                    />
                  </div>
                </div>
                <div
                  id={successMessageContainerElem}
                  style={{ display: 'none', marginBottom: '20px' }}
                >
                  <div
                    id="ratingTypeContainer"
                    style={{ color: 'grey', marginLeft: '20px' }}
                  >
                    <div>
                      Rating submitted successfully to the nostr network.
                    </div>
                    <div>
                      (It may take a moment for the rating to be reflected in
                      the button appearance.)
                    </div>
                  </div>
                </div>
                <TechDetailsForNostrNerds1
                  oNostrTopic={oNostrTopic}
                  oWord={oWord}
                  event_id={event_id}
                />
                <TechDetailsForNostrNerds2 event={event} event_id={event_id} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TableOfTopicsRedux;
