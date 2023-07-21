import { useSelector } from 'react-redux';

const ContextTree = () => {
  const { topics, relationships, contentByTopic } = useSelector(
    (state) => state.myNostrProfile.curatedChannelsData
  );
  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">Content Curation: Graph of Context Tree</div>
        <div>topics: {JSON.stringify(topics,null,4)}</div>
        <div>relationships: {JSON.stringify(relationships,null,4)}</div>
      </div>
    </>
  )
}

export default ContextTree;
