import { useSelector } from 'react-redux';
import React, { useState } from 'react';

const TopicSelector = ({selectorID}) => {
  const [selectedTopicSlug,setSelectedTopicSlug] = useState("initialTopic");
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
    <div>TopicSelector selectedTopicSlug: {selectedTopicSlug}</div>
      <select
        onChange={()=>setSelectedTopicSlug("newTopic")}
        id={selectorID}
      >
        <option
          data-topicslug="allTopics"
          data-topicname="all topics"
          data-topiceventid="allTopics"
        >-- all topics --</option>
        {aNostrTopics.map((nostrTopicWordSlug) => {
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
          const successMessageContainerElem = `successMessageContainer_${event_id}`;
          return (
            <>
              <option
                data-topicslug={slug}
                data-topicname={name}
                data-topiceventid={event_id}
              >{name}</option>
            </>
          )
        })}
      </select>
    </>
  )
}

export default TopicSelector;
