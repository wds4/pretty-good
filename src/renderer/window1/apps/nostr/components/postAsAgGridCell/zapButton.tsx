import { useState } from 'react';
import { useNostr, useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';

const CountZaps = ({parentEvent, myPubkey, setHaveIZapped}) => {
  const parentEventID = parentEvent.id;

  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [9735],
      '#p': [parentEvent.pubkey],
      '#e': [parentEventID],
    },
  });

  let totalMillisats = 0;
  let oInvoice = {};
  for (let x=0; x<events.length; x++) {
    const aTags_description = events[x].tags.filter(([k, v]) => k === 'description' && v && v !== '');
    if (aTags_description.length == 1) {
      const sInvoice = aTags_description[0][1];
      oInvoice = JSON.parse(sInvoice);
      if (oInvoice && oInvoice.kind == 9734) {
        const aTags_amount = oInvoice.tags.filter(([k, v]) => k === 'amount' && v && v !== '');
        if (aTags_amount.length == 1) {
          const amount = parseInt(aTags_amount[0][1]);
          totalMillisats += amount;
        }
      }
    }
    if (myPubkey == events[x]?.pubkey) {
      setHaveIZapped(1);
    }
  }
  const totalSats = totalMillisats / 1000;
  return (
    <>


      <span className="replyNumberContainer" style={{ marginLeft: '7px' }}>{events.length} ({totalSats} sats)</span>
    </>
  )
}

/*
      {events.map((event)=>{
        return (
          <>
            <div style={{border: '1px solid purple', padding: '5px'}}>
              <div>{JSON.stringify(event,null,4)}</div>
              <hr />
              <div style={{color: 'green'}}>{JSON.stringify(oInvoice,null,4)}</div>
            </div>
          </>
        )
      })}
      */


const ZapButton = ({parentEvent, showQrCode, setShowQrCode}) => {
  const [haveIZapped, setHaveIZapped] = useState(0);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitZap = () => {
    if (showQrCode==0) { setShowQrCode(1) }
    if (showQrCode==1) { setShowQrCode(0) }

    /*
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
      console.log("qwerty: "+JSON.stringify(event,null,4))
      // publish(event);
      alert("zap button not yet activated")
    }
    */
  }
  if (haveIZapped == 0) {
    return (
      <>
        <span
          onClick={submitZap}
        >
          ⚡
          <CountZaps
            parentEvent={parentEvent}
            myPubkey={myPubkey}
            setHaveIZapped={setHaveIZapped}
          />
        </span>
      </>
    )
  }
  if (haveIZapped == 1) {
    return (
      <>
        <span
          className="actionButtonAlreadyActivated"
          onClick={submitZap}
        >
          ⚡
          <CountZaps
            parentEvent={parentEvent}
            myPubkey={myPubkey}
            setHaveIZapped={setHaveIZapped}
          />
        </span>
      </>
    )
  }
  return <></>;

}
export default ZapButton;
