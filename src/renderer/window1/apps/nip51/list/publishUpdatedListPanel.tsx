const PublishUpdatedListPanel = ({editListState, event, updatedEvent}) => {
  if (!editListState) {
    return <></>;
  }
  return (
    <>
      <div style={{border: '1px dashed grey', marginTop: '250px'}}>
        PublishUpdatedListPanel
        <div>
          <div>new list</div>
          <div style={{width: '100%', height: '200px', fontSize: '10px'}}>
            {JSON.stringify(updatedEvent,null,4)}
          </div>
        </div>
        <div>
          <div>old list</div>
          <div style={{width: '100%', height: '200px', fontSize: '10px'}}>
            {JSON.stringify(event,null,4)}
          </div>
        </div>
      </div>
    </>
  )
}
export default PublishUpdatedListPanel;
