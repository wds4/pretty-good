import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNostr, useNostrEvents, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { secsToTime, isValidObjString } from 'renderer/window1/lib/pg';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';

import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';

const CreatePrettyGoodApps = () => {
  // const initNote = {}
  // const [note, setNote] = useState(initNote);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const oMessage = {
    "name": "pretty good apps",
    "display_name": "Pretty Good Apps",
    "nip05": "",
    "picture": "https://nostr.build/i/526388ddd33d990e17c0d8a1915a07b234a47fa3ebc65400cf2e2249f7d61d18.jpg",
    "banner": "",
    "about": "Pretty Good Apps 🦉 The nostr client 🤙 for building decentralized reputation & web of trust with dcosl: decentralized curation of simple lists 🌐 https://github.com/wds4/dcosl (win, linux, macOS)",
    "lud16": "prettygood@getalby.com",
    "website": "https://github.com/wds4/pretty-good",
  }

  const message = JSON.stringify(oMessage);
  const created_at = dateToUnix();
  const aTags = [
    [ "d", JSON.stringify(Date.now()) ],
    [ "published_at", JSON.stringify(created_at) ],
    [ "k", "0" ],
    [ "k", "1" ],
    [ "k", "3" ],
    [ "k", "4" ],
    [ "k", "9901" ],
    [ "k", "39901" ],
    [
      "desktop",
      "<bech32>",
      ""
    ],
  ];
  const event: NostrEvent = {
    content: message,
    created_at,
    id: null,
    kind: 31990,
    pubkey: getPublicKey(myPrivkey),
    sig: null,
    tags: aTags,
  };
  event.id = getEventHash(event);

  event.sig = getSignature(event, myPrivkey);

  // const event_ = JSON.parse(JSON.stringify(event));
  // console.log("onChangeMessage; event_: "+JSON.stringify(event_))


  const onPost = async () => {
    // setNote(event_)
    // publish(event);
    console.log("onPost: "+JSON.stringify(event,null,4))
  };

  return (
    <>
      <button
        type="button"
        onClick={onPost}
        className="doSomethingButton"
      >
        Submit PGA to nostrapp
      </button>
      <div style={{border: '1px solid purple', padding: '10px'}}>{JSON.stringify(event,null,4)}</div>
    </>
  )
}
const NameFromPubkey = ({pubkey}) => {
  const filter = {
    kinds: [0],
    authors: [pubkey],
    since: 0,
  };
  const { events } = useNostrEvents({
    filter,
  });
  const event = returnMostRecentEvent(events);
  let name_pk = "";
  let displayName_pk = "";
  if (event && doesEventValidate(event)) {
    if (event?.content && isValidObjString(event.content)) {
      const oContent = JSON.parse(event.content);
      name_pk = `@${oContent?.name}`;
      displayName_pk = oContent?.display_name;
    }
  }
  return (
    <>
      <div style={{display: 'inline-block'}}>
        {name_pk}, {displayName_pk}
      </div>
    </>
  )
}

const NostrAppShowLiveEvents = () => {
  const filter = {
    kinds: [31990],
    since: 0,
  };
  // if extendedFollowing or firehose, show notes as they arrive
  const { events } = useNostrEvents({
    filter,
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div>Number of apps: {events.length}</div>
      {events.map((event, index) => {
        let name = "";
        if (doesEventValidate(event)) {
          const displayTime = secsToTime(event.created_at);

          if (event.content) {
            const oContent = JSON.parse(event.content);
            if (oContent) {
              name = oContent?.name;
            }
          }
          return (
            <>
              <div style={{fontSize: '10px', border: '1px dashed grey', marginBottom: '10px', padding: '10px'}}>
                <div style={{display: 'inline-block', fontSize: '18px', width: '200px', marginLeft: '250px'}}>{name}</div>
                <div style={{display: 'inline-block', fontSize: '18px'}}><NameFromPubkey pubkey={event.pubkey} /></div>
                <div style={{float: 'right', display: 'inline-block'}}>{displayTime}</div>
                <TechDetailsForNostrNerds1 event={event} />
                <TechDetailsForNostrNerds2 event={event} />
              </div>
            </>
          );
        }
      })}
    </>
  );
};

const NostrApp = ({  }) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);

  return (
    <>
      <CreatePrettyGoodApps />
      <NostrAppShowLiveEvents />
    </>
  );
};

export default NostrApp;
