import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateContentTopic } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const ContentTopicSelector = () => {
  const dispatch = useDispatch();

  const oNostrNodesByEventID = useSelector(
    (state) => state.channels.conceptGraph.nodes.byEventID
  );
  const oNostrTopics = useSelector(
    (state) => state.channels.conceptGraph.nodes.byWordType.nostrTopic
  );
  let aNostrTopics = Object.keys(oNostrTopics);
  if (!aNostrTopics) { aNostrTopics = [] }

  const selectedContentTopic = useSelector(
    (state) => state.controlPanelSettings.contentTopic
  );
  return (
    <>
      <div>
        <span>topic:</span>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select
            id="contentTopicSelector"
            onChange={(e)=>{
              const newTopicSlug = e.target.selectedOptions[0].dataset.topicslug;
              const newTopicEventID = e.target.selectedOptions[0].dataset.topiceventid;
              dispatch(updateContentTopic(newTopicEventID));
            }}
          >
            <option
              data-topicslug="allTopics"
              data-topicname="all topics"
              data-topiceventid="allTopics"
            >-- all topics --</option>
            {aNostrTopics.map((nostrTopicWordSlug)=>{
              const oNostrTopic = oNostrTopics[nostrTopicWordSlug];
              const event_id = oNostrTopic.versionIndependent;
              const oWord = oNostrNodesByEventID[event_id].word;
              const { event } = oNostrNodesByEventID[event_id];
              let slug = '';
              let name = '';
              if (oWord.hasOwnProperty('nostrTopicData')) {
                slug = oWord.nostrTopicData?.slug;
                name = oWord.nostrTopicData?.name;
              }
              let selected = false;
              if (selectedContentTopic == event_id) {
                selected = true;
              }
              return (
                <>
                  <option
                    data-topicslug={slug}
                    data-topicname={name}
                    data-topiceventid={event_id}
                    selected={selected}
                  >{name}</option>
                </>
              )
            })}
          </select>
        </div>
      </div>
    </>
  );
};
export default ContentTopicSelector;
