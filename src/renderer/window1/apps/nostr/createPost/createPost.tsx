import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

export default function CreatePost() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const e2 = document.getElementById("successMessageContainer");
  const e3 = document.getElementById("newEventContainer");

  const clearFields = () => {
    if (e2 && e3) {
      e2.innerHTML = "";
      e3.innerHTML = "";
    }
  }

  const onPost = async () => {
    if (!myPrivkey) {
      alert('no private key provided');
      return;
    }

    let message = "";
    const e1 = document.getElementById("newPostTextarea");
    if (e1) {
      message = e1.value;
    }

    if (!message) {
      alert('no message provided');
      return;
    }

    const event: NostrEvent = {
      content: message,
      kind: 1,
      tags: [],
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    publish(event);
    if (e1) {
      e1.value = "";
    }

    const e2 = document.getElementById("successMessageContainer");
    const e3 = document.getElementById("newEventContainer");
    if (e2) {
      e2.innerHTML = 'Your message has been submitted to the nostr network!';
    }

    if (e3) {
      e3.innerHTML = `Here it is:<br/><br/>${JSON.stringify(event, null, 4)}`
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', width: '90%' }}
    >
      <div id="newPostTextareaContainer">
        <textarea id="newPostTextarea" className="newPostTextarea" onChange={clearFields} />
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
      <div
        id="newEventContainer"
        className="newEventContainer"
        style={{
          fontSize: '14px',
          marginTop: '20px',
          width: '80%',
          height: '250px',
          overflow: 'scroll',
          padding: '5px',
        }}
      />
    </div>
  );
}
