import { useState } from 'react';
import { useNostr, useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';

const CountReposts = ({parentEvent, myPubkey, setHaveIReposted}) => {
  const parentEventID = parentEvent.id;

  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [6],
      '#e': [parentEventID],
    },
  });
  for (let x=0; x<events.length; x++) {
    if (myPubkey == events[x]?.pubkey) {
      setHaveIReposted(1);
    }
  }
  return (
    <>
      <span className="replyNumberContainer" style={{ marginLeft: '7px' }}>{events.length}</span>
    </>
  )
}

const RepostButton = ({parentEvent}) => {
  const [haveIReposted, setHaveIReposted] = useState(0);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitRepost = () => {
    // TODO: add relay URL as third item in eTag (array?)
    const eTag = ["e",parentEvent.id];
    const pTag = ["p",parentEvent.pubkey];

    const aTags = [eTag,pTag];

    const event: NostrEvent = {
      content: JSON.stringify(parentEvent),
      kind: 6,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);
    if (event.hasOwnProperty("id")) {
      // console.log("qwerty: "+JSON.stringify(event,null,4))
      publish(event);
      alert("Reposted")
    }
  }
  if (haveIReposted == 0) {
    return (
      <>
        <span
          onClick={submitRepost}
        >
          🔄
          <CountReposts
            parentEvent={parentEvent}
            myPubkey={myPubkey}
            setHaveIReposted={setHaveIReposted}
          />
        </span>
      </>
    )
  }
  if (haveIReposted == 1) {
    return (
      <>
        <span
          style={{border: '1px solid red'}}
          className="actionButtonAlreadyActivated"
        >
          🔄
          <CountReposts
            parentEvent={parentEvent}
            myPubkey={myPubkey}
            setHaveIReposted={setHaveIReposted}
          />
        </span>
      </>
    )
  }
  return <></>;

}
export default RepostButton;
