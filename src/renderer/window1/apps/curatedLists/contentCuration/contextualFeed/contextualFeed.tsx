import TopicSelectorPanel from 'renderer/window1/apps/curatedLists/contentCuration/components/topicSelectorPanel';

const ContextualFeed = () => {
  return (
    <>
      <div style={{border:'1px dashed grey', padding: '5px'}}>
        <div className="h4">Contextual Feed</div>
        <div>Pick a channel; then watch your amazing feed!</div>
        <TopicSelectorPanel />
      </div>
    </>
  )
}

export default ContextualFeed
