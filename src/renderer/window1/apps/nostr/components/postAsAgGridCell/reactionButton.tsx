import { useState } from 'react';
import { useNostr, useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';

const CountReactions = ({parentEvent, myPubkey, setHaveIReacted}) => {
  const parentEventID = parentEvent.id;

  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [7],
      '#p': [parentEvent.pubkey],
      '#e': [parentEventID],
    },
  });
  let numPositiveReactions = 0;
  for (let x=0; x<events.length; x++) {
    if (events[x].content != "-") {
      numPositiveReactions++;
    }
    if (myPubkey == events[x]?.pubkey) {
      setHaveIReacted(1);
    }
  }
  return (
    <>
      <span className="replyNumberContainer" style={{ marginLeft: '7px' }}>{numPositiveReactions}</span>
    </>
  )
}

const ReactionButton = ({parentEvent}) => {
  const [haveIReacted, setHaveIReacted] = useState(0);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitReact = () => {
    // TODO: add relay URL as third item in eTag (array?)
    const eTag = ["e",parentEvent.id];
    const pTag = ["p",parentEvent.pubkey];

    const aTags = [eTag,pTag];

    const event: NostrEvent = {
      content: "+",
      kind: 7,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);
    if (event.hasOwnProperty("id")) {
      // console.log("qwerty: "+JSON.stringify(event,null,4))
      publish(event);
      alert("Reacted")
    }
  }
  if (haveIReacted == 0) {
    return (
      <>
        <span
          onClick={submitReact}
        >
          ♡
          <CountReactions
            parentEvent={parentEvent}
            myPubkey={myPubkey}
            setHaveIReacted={setHaveIReacted}
          />
        </span>
      </>
    )
  }
  if (haveIReacted == 1) {
    return (
      <>
        <span
          className="actionButtonAlreadyActivated"
        >
          ❤️
          <CountReactions
            parentEvent={parentEvent}
            myPubkey={myPubkey}
            setHaveIReacted={setHaveIReacted}
          />
        </span>
      </>
    )
  }
  return <></>;

}
export default ReactionButton;
