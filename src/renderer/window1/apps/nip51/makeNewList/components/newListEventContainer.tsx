import { useSelector } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  nip19,
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const NewListEventContainer = ({aItems, newListKind, newListName}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const aTags = [];
  aTags.push(['d', newListName]);

  for (let x=0; x<aItems.length; x++) {
    const aItem = aItems[x];
    const type = aItem[1];
    if (type == "npub") {
      const pk = aItem[2];
      const aTab = ["p",pk];
      aTags.push(aTab);
    }
    if (type == "nprofile") {
      const pk = JSON.parse(aItem[2]).pubkey;
      const aTab = ["p",pk];
      aTags.push(aTab);
    }
    if (type == "nevent") {
      const id = JSON.parse(aItem[2]).id;
      const aTab = ["e",id];
      aTags.push(aTab);
    }
    if (type == "note") {
      const id = aItem[2];
      const aTab = ["e",id];
      aTags.push(aTab);
    }
    if (type == "plainText") {
      const plainTextInput = aItem[0];
      const aTab = ["t",plainTextInput];
      aTags.push(aTab);
    }
    if (type == "anotherList") {
      const existingListName = aItem[2];
      const existingListAuthorPubkey = aItem[3];
      const foo = "30001:"+existingListAuthorPubkey+":"+existingListName;
      const aTab = ["a",foo];
      aTags.push(aTab);
    }
  }

  const event: NostrEvent = {
    content: '',
    kind: newListKind,
    tags: aTags,
    created_at: dateToUnix(),
    pubkey: getPublicKey(myPrivkey),
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, myPrivkey);

  const event_ = JSON.parse(JSON.stringify(event));

  const oWord = {};
  oWord.wordData = {};
  oWord.wordData.wordTypes=[ "word", "list" ];
  oWord.listData = {};
  oWord.listData.name = newListName;

  return (
    <>
      <div id="newPostTextareaContainer" style={{ marginTop: '50px' }}>
        <textarea
          id="newWordTextarea"
          value={JSON.stringify(oWord,null,4)}
          style={{
            boxSizing: 'border-box',
            width: '100%',
            height: '200px',
            border: '2px solid purple',
            borderRadius: '5px',
            padding: '10px',
          }}
        />
        <textarea
          id="newNoteTextarea"
          value={JSON.stringify(event_,null,4)}
          style={{
            boxSizing: 'border-box',
            width: '100%',
            height: '200px',
            border: '2px solid purple',
            borderRadius: '5px',
            padding: '10px',
          }}
        />
      </div>
    </>
  )
}
export default NewListEventContainer;
