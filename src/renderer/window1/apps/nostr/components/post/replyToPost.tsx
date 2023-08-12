import { useState } from 'react';
import { useNostr, dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import { clientTag } from 'renderer/window1/const';
import TechDetailsForNostrNerdsReplyBox from './techDetailsForNostrNerdsReplyBox';

const ReplyToPost = ({ parentEvent }) => {
  const { focus } = useSelector(
    (state) => state.nostrSettings.nostrActiveThread
  );

  const parentEventID = parentEvent.id;
  const parentAuthorPubkey = parentEvent.pubkey;

  const initNote = {}
  const [note, setNote] = useState(initNote);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const replyTextareaId = "newPostTextarea_"+parentEventID
  const successId = "successMessageContainer_"+parentEventID;

  const e1 = document.getElementById(replyTextareaId);
  const e2 = document.getElementById(successId);

  let event_ = {};

  const onChangeMessage = () => {
    let message = "";
    if (e1) {
      message = e1.value;
    }

    const replyTag1 = [ 'e', parentEventID, '', 'reply' ];
    const replyTag2 = [ 'p', parentAuthorPubkey];

    const event: NostrEvent = {
      content: message,
      kind: 1,
      tags: [replyTag1, replyTag2],
      // tags: [replyTag1, replyTag2, clientTag],
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);

    event_ = JSON.parse(JSON.stringify(event));
    // console.log("onChangeMessage; event_: "+JSON.stringify(event_))
    setNote(event_)
  }

  const onPost = async () => {
    if (note.hasOwnProperty("id")) {
      publish(note);
      if (e1) {
        e1.value = '';
      }

      if (e2) {
        e2.innerHTML = 'Your message has been submitted to the nostr network!';
      }
    } else {
      if (e2) {
        e2.innerHTML = 'submission failed';
      }
    }

  };

  if (focus == parentEventID) {
    return (
      <>
        <div>
          <textarea
            id={replyTextareaId}
            onChange={onChangeMessage}
            placeholder="Write your reply"
            style={{
              boxSizing: 'border-box',
              border: '2px solid purple',
              borderRadius: '5px',
              padding: '10px',
              margin: '0px',
              width: '100%',
            }}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={onPost}
            className="doSomethingButton"
          >
            Post your reply!
          </button>
        </div>
        <div id={successId}></div>

        <TechDetailsForNostrNerdsReplyBox event={note} />
      </>
    );
  }
  return <></>;
};

export default ReplyToPost;
