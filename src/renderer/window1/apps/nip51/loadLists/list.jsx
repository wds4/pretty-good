import { useNostrEvents } from 'nostr-react';

const List = ({event}) => {
  return (
    <>
      <div style={{border:"1px solid black",borderRadius:"5px",padding:"5px",margin:"5px"}}>
        {JSON.stringify(event,null,4)}
      </div>
    </>
  )
};

export default List;
