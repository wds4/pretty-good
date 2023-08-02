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
      const aTab = ["p",id];
      aTags.push(aTab);
    }
    if (type == "note") {
      const id = aItem[2];
      const aTab = ["p",id];
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
  // };
  return (
    <>
      <div id="newPostTextareaContainer" style={{ marginTop: '50px' }}>
        <textarea id="newNoteTextarea" value={JSON.stringify(event_,null,4)} className="newPostTextarea" />
      </div>
    </>
  )
}
export default NewListEventContainer;
