import { useState } from 'react';
import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';
import { clientTag } from 'renderer/window1/const';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

export default function CreatePost() {
  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  const initNote = {}
  const [note, setNote] = useState(initNote);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const e1 = document.getElementById("newPostTextarea");
  const e2 = document.getElementById("successMessageContainer");
  const e3 = document.getElementById("newEventContainer");

  let event_ = {};

  const onChangeMessage = () => {
    if (e2 && e3) {
      e2.innerHTML = "";
      e3.innerHTML = "";
    }

    let message = "";
    if (e1) {
      message = e1.value;
    }

    const event: NostrEvent = {
      content: message,
      kind: 1,
      // tags: [ clientTag ],
      tags: [ ],
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

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
    <div
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      <div id="newPostTextareaContainer">
        <textarea id="newPostTextarea" className="newPostTextarea" onChange={onChangeMessage} />
      </div>
      <button
        type="button"
        onClick={onPost}
        className="doSomethingButton"
        style={{ position: 'absolute', right: '0px' }}
      >
        Post a message!
      </button>
      <div
        id="successMessageContainer"
        style={{ fontSize: '14px', marginTop: '20px' }}
      />
      <div className={devElemClass}>
        <div
          id="newEventContainer"
          className="newEventContainer"
          style={{
            fontSize: '14px',
            marginTop: '20px',
            width: '80%',
            overflow: 'auto',
            padding: '5px',
          }}
        />
      </div>
      <TechDetailsForNostrNerds event = {note} />
    </div>
  );
}
