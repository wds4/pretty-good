import { useState } from 'react';
import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
  nip04,
} from 'nostr-tools';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

export default function SendDirectMessage() {
  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;

  const initNote = {}
  const [note, setNote] = useState(initNote);

  const { publish } = useNostr();

  const e1 = document.getElementById('newPostTextarea');
  const e2 = document.getElementById('successMessageContainer');
  const e3 = document.getElementById('newEventContainer');

  let event_ = {};

  const onChangeMessage = async () => {
    if (e2) { e2.innerHTML = ''; }
    if (e3) { e3.innerHTML = ''; }
    let message = null;
    if (e1) {
      message = e1.value;
    }

    const ciphertext = await nip04.encrypt(myPrivkey, pubkey, message);

    const event: NostrEvent = {
      id: null,
      kind: 4,
      pubkey: getPublicKey(myPrivkey),
      created_at: dateToUnix(),
      content: ciphertext,
      tags: [['p', pubkey]],
      sig: null,
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);

    event_ = JSON.parse(JSON.stringify(event));
    // console.log("onChangeMessage; event_: "+JSON.stringify(event_))
    setNote(event_)
  }

  const onPost = async () => {
    publish(note);

    if (e1) {
      e1.value = '';
    }

    if (e2) {
      e2.innerHTML = 'Your message has been submitted to the nostr network!';
    }

    if (e3) {
      e3.innerHTML = `Here it is:<br/><br/>${JSON.stringify(note, null, 4)}`
    }

  };

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            paddingBottom: '30px',
          }}
        >
          <div id="newPostTextareaContainer">
            <textarea
              id="newPostTextarea"
              className="newPostTextarea"
              onChange={onChangeMessage}
            />
          </div>

          <button
            type="button"
            onClick={onPost}
            className="doSomethingButton"
            style={{ position: 'absolute', right: '10px', bottom: '0px' }}
          >
            Send this direct message!
          </button>
        </div>
        <div>
          <div
            id="successMessageContainer"
            style={{ fontSize: '14px', marginTop: '20px' }}
          />
          <div
            id="newEventContainer"
            className={devModeClassName}
            style={{
              fontSize: '14px',
              marginTop: '20px',
              width: '80%',
              height: '250px',
              overflow: 'auto',
              padding: '5px',
            }}
          />
        </div>
        <TechDetailsForNostrNerds event={note} />
      </div>
    </>
  );
}
