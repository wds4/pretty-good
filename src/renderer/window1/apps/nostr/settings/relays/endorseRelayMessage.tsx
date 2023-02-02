import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';
import { endorseMyRelayList } from 'renderer/window1/apps/grapevine/attestationTemplates/endorseMyRelayList';

const EndorseRelayMessage = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();
  const currentState = useSelector((state) => state.nostrGlobalState.nostrRelayManagement.endorseMyNostrRelays);

  const e2 = document.getElementById('successMessageContainer');
  const e3 = document.getElementById('newEventContainer');

  const clearFields = () => {
    if (e2 && e3) {
      e2.innerHTML = '';
      e3.innerHTML = '';
    }
  };

  const onPost = async () => {
    if (!myPrivkey) {
      alert('no private key provided');
      return;
    }

    /*
    let message = '';
    const e1 = document.getElementById('newPostTextarea');
    if (e1) {
      message = e1.value;
    }
    */

    endorseMyRelayList.attestationData.authorData.nostr.pubkey_hex = myNostrProfile.pubkey_hex;
    endorseMyRelayList.attestationData.authorData.nostr.pubkey_bech32 = myNostrProfile.pubkey_bech32;
    endorseMyRelayList.attestationData.authorData.nostr.name = myNostrProfile.name;
    endorseMyRelayList.attestationData.authorData.nostr.display_name = myNostrProfile.display_name;
    endorseMyRelayList.attestationData.attestationFieldsData.listLocation.pubkey_hex = myNostrProfile.pubkey_hex;
    // endorseMyRelayList.attestationData.attestationFieldsData.context = "generic";
    /*
    if (currentState) {
      endorseMyRelayList.attestationData.attestationFieldsData.type = "endorse";
    } else {
      endorseMyRelayList.attestationData.attestationFieldsData.type = "rescind";
    }
    */
    endorseMyRelayList.metaData.timestamp = Date.now();
    const e1 = document.getElementById('newPostTextarea');
    const message = JSON.stringify(endorseMyRelayList);
    e1.value = JSON.stringify(endorseMyRelayList,null,4);

    if (!message) {
      alert('no message provided');
      return;
    }

    // kind: may want to choose NIP-16 REPLACEABLE EVENT, with 10000 <= n < 20000
    const event: NostrEvent = {
      content: message,
      kind: 1971,
      tags: [["g", "grapevine"]],
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    // publish(event);
    /*
    if (e1) {
      e1.value = '';
    }
    */

    const e2 = document.getElementById('successMessageContainer');
    const e3 = document.getElementById('newEventContainer');
    if (e2) {
      e2.innerHTML = 'Your message has been submitted to the nostr network!';
    }

    if (e3) {
      e3.innerHTML = `Here it is:<br/><br/>${JSON.stringify(event, null, 4)}`;
    }
  };
  return (
    <>
      <div
        style={{ position: 'relative', display: 'inline-block', width: '90%' }}
      >
        <div id="newPostTextareaContainer">
          <textarea
            id="newPostTextarea"
            className="newPostTextarea"
            onChange={clearFields}
          />
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
    </>
  );
};
export default EndorseRelayMessage;
