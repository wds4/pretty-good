import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
  nip04,
} from 'nostr-tools';

export default function SendDirectMessage() {
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;

  const { publish } = useNostr();

  const e2 = document.getElementById('successMessageContainer');
  const e3 = document.getElementById('newEventContainer');
  const clearSuccessFields = () => {
    if (e2) { e2.innerHTML = ''; }
    if (e3) { e3.innerHTML = ''; }
  };
  const onPost = async () => {
    if (!myPrivkey) {
      alert('no private key provided');
      return;
    }

    const e1 = document.getElementById('newPostTextarea');
    let message = null;
    if (e1) {
      message = e1.value;
    }

    const ciphertext = await nip04.encrypt(myPrivkey, pubkey, message);

    if (!message) {
      alert('no message provided');
      return;
    }

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

    publish(event);
    e1.value = '';
    // const e2 = document.getElementById('successMessageContainer');
    e2.innerHTML = 'Your message has been submitted to the nostr network!';
    // const e3 = document.getElementById('newEventContainer');
    e3.innerHTML = `Here it is:<br/><br/>${JSON.stringify(event, null, 4)}`;
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '90%',
          paddingBottom: '30px',
        }}
      >
        <div id="newPostTextareaContainer">
          <textarea
            id="newPostTextarea"
            className="newPostTextarea"
            onChange={clearSuccessFields}
          />
        </div>

        <button
          type="button"
          onClick={onPost}
          className="doSomethingButton"
          style={{ position: 'absolute', right: '0px', bottom: '0px' }}
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
          className="newEventContainer"
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
    </>
  );
}
