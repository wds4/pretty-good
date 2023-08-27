import React from 'react';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { useNostrEvents, useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { asyncLnurlDecode } from 'renderer/window1/lib/pg/asyncLnurlDecode';

const PickSatsButton = ({ onSatsButtonClick, sats, chosenSats }) => {
  const processButtonClick = () => {
    onSatsButtonClick({sats});
  }
  let buttonClass = "pickSatsAmountButton";
  if (sats == chosenSats) {
    buttonClass += " pickSatsAmountButtonActive";
  }
  return (
    <>
      <div
        className={buttonClass}
        style={{
          display: 'inline-block',
          border: '2px solid purple',
          borderRadius: '5px',
          width: '50px',
          height: '50px',
          textAlign: 'center',
          margin: '5px',
        }}
        onClick={processButtonClick}
      >
        {sats}
      </div>
    </>
  );
};

/*
const Bolt11Listener = ({parentEvent}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const filter = {
    kinds: [ 9735 ],
    "#p": [ parentEvent.pubkey ],
    "#e": [ parentEvent.id ],
  }
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div style={{display: 'none'}}>
        {events.map((event, index) => {
          if (doesEventValidate(event)) {
            const aTags_description = event.tags.filter(([k, v]) => k === 'description' && v && v !== '');
            const aTags_bolt11 = event.tags.filter(([k, v]) => k === 'bolt11' && v && v !== '');
            let o9734 = {};
            if (aTags_description.length == 1) {
              const s9734 = aTags_description[0][1];
              o9734 = JSON.parse(s9734);
            }
            let bolt11=  "";
            if (aTags_bolt11.length == 1) {
              bolt11 = aTags_bolt11[0][1];
            }
            // if (myPubkey == o9734?.pubkey) {
            if (1) {
              return (
                <>
                  <div style={{border: '1px dashed orange', marginBottom: '20px'}}>
                    <div>{JSON.stringify(event,null,4)}</div>
                    <div style={{backgroundColor: 'yellow'}}>{JSON.stringify(o9734,null,4)}</div>
                    <div style={{ textAlign: 'center', height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={bolt11}
                        viewBox={`0 0 256 256`}
                      />
                      <div>{bolt11}</div>
                    </div>
                  </div>
                </>
              )
            }
          }
        })}
      </div>
    </>
  )
}
*/

const StepB = ({lud16, decodedLnurl, parentEvent}) => {
  const [posts, setPosts] = useState([]);
  const [callback, setCallback] = useState("");

  // console.log("qwerty StepB");

  // const url = 'https://jsonplaceholder.typicode.com/posts';
  // const url = 'https://livingroomofsatoshi.com/api/v1/lnurl/payreq/4c4f2f51-fd0e-4c4c-92fe-e9eab8052a25?amount=10000&nostr={"kind":9734,"content":"Zap!","tags":[["relays","wss://nostr-pub.wellorder.net","wss://nostr-relay.untethr.me","wss://relay.damus.io","wss://nostr-relay.wlvs.space","wss://nostr.fmt.wiz.biz","wss://nostr.oxtr.dev","ws://monad.jb55.com:8080","wss://nostr.zebedee.cloud"],["p","a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c"],["e","e924e1feb6502cff7b1405d0230d77223d68861a9f48b0556ad8289fdc9c6433"]],"pubkey":"a08175d65051c08b83600abf6f5c18efd455114b4863c65959c92b13ee52f87c","created_at":1692243319,"id":"899aa91da86ad0b1de9f262ef2859c6b65d738b9cf54ae7c95b45e03d8113721","sig":"16361812c99826514daea6e1b6bf985400e90f2ab52540a44bbb76f43af8a9eb92bef49fe87d5e469b496b568b2ae93af1a073861eb5e4bb0be77f9466b860ac"}&lnurl=LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHH2MN4WDJKGANFDAKXZWPKY4NTAH';
  // const url = "https://api.zebedee.io/v0/request-static-charges/23e96a94-dfc6-48ba-ad4a-5d769451ff60";
  try {
    if (lud16) {
      // console.log("qwerty StepB a");
      const aFoo = lud16.split("@");
      const fetchFromUrl = "https://"+aFoo[1]+"/.well-known/lnurlp/"+aFoo[0];
      if (fetchFromUrl.length > 0) {
        useEffect(() => {
          fetch(fetchFromUrl)
          .then((res) => res.json())
          .then((data) => {
            // console.log("qwerty StepB lud16: "+data);
            setPosts(data);
            setCallback(data.callback)
          })
          .catch((err) => {
            console.log(err.message);
          });
        }, []);
      }
    } else {
      // console.log("qwerty StepB b");
      useEffect(() => {
        fetch(decodedLnurl)
        .then((res) => res.json())
        .then((data) => {
          // console.log("qwerty StepB: "+data);
          setPosts(data);
          setCallback(data.callback)
        })
        .catch((err) => {
          console.log(err.message);
        });
      }, []);
    }
  } catch (error) { console.log(error.message) }

  if (callback == "") {
    return <><div>awaiting first response ... </div></>;
  }
  return (
    <>
      <div>decodedLnurl: {decodedLnurl}, callback: {callback}</div>
      <StepC parentEvent={parentEvent} callback={callback}/>
    </>
  );
};

const StepD = ({secondUrl, parentEvent}) => {
  const [posts, setPosts] = useState([]);
  const [lnbcString, setLnbcString] = useState("");

  useEffect(() => {
    fetch(secondUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log("qwerty StepD: "+data);
      setPosts(data);
      setLnbcString(data.pr);
      // setCallback(data.callback)
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, []);
  if (lnbcString=="") {
    return (
      <>
        <div>awaiting second response ... </div>
      </>
    )
  }
  return (
    <>
      <div style={{width: '50%', textAlign: 'center'}}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={lnbcString}
          viewBox={`0 0 256 256`}
        />
        <div>{lnbcString}</div>
      </div>

    </>
  );
};

export class StepA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedLnurl: "",
    };
  }

  async componentDidMount() {
    if (this.props.lnurl) {
      try {
        const decodedLnurl = await asyncLnurlDecode(this.props.lnurl)
        // console.log("qwerty this.setState decodedLnurl A; typeof decodedLnurl: "+typeof decodedLnurl)
        // console.log("qwerty this.setState decodedLnurl A; decodedLnurl: "+JSON.stringify(decodedLnurl,null,4))
        if (typeof decodedLnurl == "string") {
          this.setState({decodedLnurl: decodedLnurl})
          // console.log("qwerty this.setState decodedLnurl B")
        }
      } catch (err) { console.log(err.message) }
    }
  }
  // if (this.state.decodedLnurl == "") { return <>blank decodedLnurl</> }
  render() {
    if ( (this.state.decodedLnurl == "") && (!this.props.lud16) ) { return <>blank decodedLnurl</> }
    return (
      <>
        <div style={{}}>
          <div>decodedLnurl: {this.state.decodedLnurl}</div>
          <div>lud16: {this.props.lud16}</div>
          <StepB
            lud16={this.props.lud16}
            decodedLnurl={this.state.decodedLnurl}
            parentEvent={this.props.parentEvent}
          />
        </div>
      </>
    );
  }
}

const StepC = ({ parentEvent, callback }) => {
  const [secondUrl, setSecondUrl] = useState("");
  const [chosenSats, setChosenSats] = useState(0);
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  let aMyRelays = [];
  const relays = useSelector((state) => state.nostrSettings.nostrRelays);
  if (relays) {
    aMyRelays = Object.keys(relays);
  }
  aMyRelays.unshift("relays");

  const { pubkey } = parentEvent;
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let oProfileContent = {};
  let lnurl = '';
  let lud16 = '';
  if (nostrProfiles.hasOwnProperty(parentEvent.pubkey)) {
    oProfileContent = JSON.parse(nostrProfiles[parentEvent.pubkey].content);
    if (oProfileContent.lud06) {
      lnurl = oProfileContent.lud06;
    }
    if (oProfileContent.lud16) {
      lud16 = oProfileContent.lud16;
    }
  }

  const onSatsButtonClick = ({sats}) => {
    setChosenSats(sats);
    const amount = sats * 1000;
    const aAmount = ['amount', amount.toString()];
    const aLnurl = ['lnurl', lnurl];
    const aPubkey = ['p', parentEvent.pubkey];
    const aEvent = ['e', parentEvent.id];

    const event: NostrEvent = {
      kind: 9734,
      content: "You've just been zapped from the Pretty Good desktop client!",
      tags: [aMyRelays, aAmount, aLnurl, aPubkey, aEvent],
      pubkey: getPublicKey(myPrivkey),
      created_at: dateToUnix(),
    };
    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);

    console.log("onSatsButtonClick; sats: "+sats+"; event: "+JSON.stringify(event,null,4));
    // publish(event);
    const fetchJson = `${callback}?amount=${amount}&nostr=${JSON.stringify(event)}&lnurl=${lnurl}`;
    console.log("qwerty onSatsButtonClick; fetchJson: "+fetchJson);
    setSecondUrl(fetchJson);
  }

  const aSats = [1, 2, 5, 10, 21, 42, 69, 2121];

  if (secondUrl=="") {
    return (
      <>
        <div style={{ display: 'block' }}>
          <div>chosenSats: {chosenSats}</div>
          {aSats.map((s) => {
            return (
              <>
                <PickSatsButton onSatsButtonClick={onSatsButtonClick} sats={s} chosenSats={chosenSats} />
              </>
            );
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ display: 'block' }}>
        <div>chosenSats: {chosenSats}</div>
        {aSats.map((s) => {
          return (
            <>
              <PickSatsButton onSatsButtonClick={onSatsButtonClick} sats={s} chosenSats={chosenSats} />
            </>
          );
        })}
      </div>
      <StepD secondUrl={secondUrl} />
    </>
  );
};

const ZapPanelWithQrCode = ({ parentEvent }) => {
  const { pubkey } = parentEvent;
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let oProfileContent = {};
  let lnurl = '';
  let lud16 = '';
  if (nostrProfiles.hasOwnProperty(parentEvent.pubkey)) {
    oProfileContent = JSON.parse(nostrProfiles[parentEvent.pubkey].content);
    if (oProfileContent.lud06) {
      lnurl = oProfileContent.lud06;
    }
    if (oProfileContent.lud16) {
      lud16 = oProfileContent.lud16;
      // lnurl = oProfileContent.lud16;
    }
  }

  return (
    <>
      <div style={{border: '1px solid purple', borderRadius: '5px', textAlign: 'center'}}>
        <StepA lnurl={lnurl} lud16={lud16} parentEvent={parentEvent} />
      </div>
    </>
  );
};
export default ZapPanelWithQrCode;
