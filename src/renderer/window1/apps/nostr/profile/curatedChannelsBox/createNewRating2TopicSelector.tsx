import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import CreateNewRating from './createNewRating2';

const TopicSelector = ({pubkeyFocusID, userData, selectorID}) => {
  const [selectedTopicSlug,setSelectedTopicSlug] = useState("allTopics");
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
      <select
        onChange={(e)=>setSelectedTopicSlug(e.target.selectedOptions[0].dataset.topicslug)}
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
      <CreateNewRating
        pubkeyFocusID={pubkeyFocusID}
        userData={userData}
        selectedTopicSlug={selectedTopicSlug}
      />
    </>
  )
}

export default TopicSelector;
