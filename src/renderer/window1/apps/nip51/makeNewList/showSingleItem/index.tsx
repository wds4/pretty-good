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
  if (item[2]) {
    if (type=="nevent") {
      id = JSON.parse(item[2]).id;
    }
    if (type=="note") {
      id = item[2];
    }
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

const DeleteButton = ({showDeleteButton}) => {
  if (!showDeleteButton) { return <></> }
  return (
    <>
      <div style={{ flexGrow: '1' }}>
        <button
          type="button"
          className="nip51Button"
          style={{
            border: '1px solid red',
            borderRadius: '5px',
            width: '50px',
            height: '50px',
            fontSize: '26px',
          }}
        >
          ❌
        </button>
      </div>
    </>
  )
}

const ShowSingleItem = ({item, kind, showDeleteButton}) => {
  if (item == "" ) {
    return <></>;
  }
  if (!item) {
    return <></>;
  }

  const type = item[1];
  if (type == "plainText") {
    const itemText = item[0];
    if (!itemText) { return <></> }
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              fontSize: "22px",
              padding: "10px",
              textAlign: "left",
              flexGrow: '999',
            }}
            >
            {itemText}
          </div>
          <DeleteButton showDeleteButton={showDeleteButton} />
        </div>
      </>
    )
  }
  // if type != plainText, then it should be: npub, nprofile, nevent, or note
  if ((kind==10000) || (kind == 30000)) {
    return (
      <>
        <div style={{ display: 'inline-block', width: '90%' }}>
          <ShowSingleProfile item={item} kind={kind} />
        </div>
        <div style={{ display: 'inline-block', width: '10%' }}>
          <DeleteButton />
        </div>
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
          <DeleteButton />
        </div>
      </>
    )
  }
  return <><div>error</div></>
}

export default ShowSingleItem;
