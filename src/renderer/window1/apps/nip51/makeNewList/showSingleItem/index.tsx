import { useNostrEvents } from 'nostr-react';
import Post from './post';
import MiniProfile from './miniProfile';

const ShowSingleProfile = ({item, kind}) => {
  const type = item[1];
  let pubkey = "";
  if (type == "npub") {
    pubkey = item[2];
  }
  if (type == "nprofile") {
    pubkey = JSON.parse(item[2]).pubkey;
  }
  return (
    <>
      <MiniProfile pubkey={pubkey} />
    </>
  )
}

const ShowSingleNote = ({item, kind}) => {
  const type = item[1];
  let id = "foo";
  if (type=="nevent") {
    id = JSON.parse(item[2]).id;
  }
  if (type=="note") {
    id = item[2];
  }
  const filter = {
    ids: [id],
  };
  const { events } = useNostrEvents({
    filter,
  });
  return (
    <>
      {events.map((event)=>{
        return (
          <>
            <div style={{textAlign: "left"}}>
              <Post event={event} />
            </div>
          </>
        )
      })}
    </>
  )
}

const ShowSingleItem = ({item, kind}) => {
  if ((kind==10000) || (kind == 30000)) {
    return (
      <>
      <div className="singleItemDataContainer">{JSON.stringify(item)}</div>
        <ShowSingleProfile item={item} kind={kind} />
      </>
    )
  }
  if ((kind==10001) || (kind == 30001)) {
    return (
      <>
       <div style={{ display: 'inline-block', width: '90%' }}>
          <ShowSingleNote item={item} kind={kind} />
        </div>
        <div style={{ display: 'inline-block', width: '10%' }}>
          <button
            type="button"
            style={{
              border: '1px solid grey',
              borderRadius: '5px',
              width: '50px',
              height: '50px',
              fontSize: '26px',
            }}
          >
            ✖️
          </button>
        </div>
      </>
    )
  }
  return <><div>error</div></>
}

export default ShowSingleItem;
