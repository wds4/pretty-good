import { useSelector } from 'react-redux';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import RelationshipRatingPanel from './relationshipRatingPanel';
import MiniProfile from './miniProfile';

const TableOfRelatinshipsRedux = () => {
  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }
  const oNostrNodes = useSelector((state) => state.channels.conceptGraph.nodes);
  const oNostrNodesByEventID = oNostrNodes.byEventID;
  let oNostrRelationships = {};
  let oNostrNodesByWordType = {};
  if (oNostrNodes.byWordType.relationship) {
    oNostrRelationships = oNostrNodes.byWordType.relationship;
    oNostrNodesByWordType = oNostrNodes.byWordType;
  }
  const aNostrRelationships = Object.keys(oNostrRelationships);
  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">Table of Topic Relationships (redux)</div>
        <div style={{ color: 'grey', margin: '20px' }}>
          This is a list of all topic relationships that have been proposed. Use
          this page to submit whether you accept or reject any given
          relationship.
        </div>

        <div>number of relationships: {aNostrRelationships.length}</div>
        {aNostrRelationships.map((slug) => {
          const oNodeData = oNostrRelationships[slug];
          const event_id = oNodeData.versionIndependent;
          const oEvent = oNostrNodes.byEventID[event_id].event;
          const oWord = oNostrNodes.byEventID[event_id].word;
          const { summary } = oWord.relationshipData;
          const author_pk = oEvent.pubkey;
          const successMessageContainerElem = `successMessageContainer_${event_id}`;
          return (
            <>
              <div
                style={{
                  position: 'relative',
                  border: '1px solid purple',
                  padding: '5px',
                  marginTop: '10px',
                }}
              >
                <div style={{ fontSize: '22px', marginLeft: '40px' }}>
                  {summary}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                  }}
                >
                  <MiniProfile pubkey={author_pk} />
                </div>
                <div >
                  <RelationshipRatingPanel
                    oWord={oWord}
                    event={oEvent}
                    event_id={event_id}
                    oNostrNodesByEventID={oNostrNodesByEventID}
                  />
                                  <div
                  id={successMessageContainerElem}
                  style={{ display: 'none', marginBottom: '20px' }}
                >
                  <div id="ratingTypeContainer" style={{color: 'grey', marginLeft: '20px'}} >
                    <div>Rating submitted successfully to the nostr network.</div>
                    <div>(It may take a moment for the rating to be reflected in the button appearance.)</div>
                  </div>
                </div>
                </div>

                <TechDetailsForNostrNerds1 oWord={oWord} event_id={event_id} />
              </div>
              <div className={devElemClass}>
                <div>oNodeData:</div>
                <div>{JSON.stringify(oNodeData, null, 4)}</div>
                <div>oEvent:</div>
                <div>{JSON.stringify(oEvent, null, 4)}</div>
                <div>oWord:</div>
                <div>{JSON.stringify(oWord, null, 4)}</div>
              </div>
            </>
          );
        })}
        <div className={devElemClass}>
          <div>oNostrRelationships:</div>
          <div>{JSON.stringify(oNostrRelationships, null, 4)}</div>
        </div>
      </div>
    </>
  );
};

export default TableOfRelatinshipsRedux;
