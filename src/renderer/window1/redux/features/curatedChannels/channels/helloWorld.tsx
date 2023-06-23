import { useSelector } from 'react-redux';

export const CuratedChannelsHelloWorld = () => {
  const oChannels = useSelector((state) => state.channels);

  return (
    <>
      <div className="h4">Curated Channels Hello World (Redux)</div>
      <div>number of nodes: {oChannels.aThreadedTapestryEventIDs.length}</div>
      {oChannels.aThreadedTapestryEventIDs.map((event_id)=>{
        if (oChannels.conceptGraph.nodes.byEventID[event_id]) {
          const oEvent = oChannels.conceptGraph.nodes.byEventID[event_id]?.event;
          const oWord = oChannels.conceptGraph.nodes.byEventID[event_id]?.word;
          const wordSlug = oWord.wordData.slug;
          return (
            <>
              <div style={{marginLeft: '20px'}}>{wordSlug}</div>
              <div style={{display:'none'}}>{JSON.stringify(oWord,null,4)}</div>
            </>
          )
        } else { return <></> }

      })}
      <div className="reduxStoreOverviewContainer">
        <div style={{ fontSize: '12px' }}>
          {JSON.stringify(oChannels, null, 4)}
        </div>
      </div>
    </>
  );
};

