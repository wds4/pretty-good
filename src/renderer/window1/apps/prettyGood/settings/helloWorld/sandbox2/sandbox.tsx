import {
  useState,
} from 'react';
import { useNostrEvents } from 'nostr-react';
import GlobalFeedFetchPostsInBackground from 'renderer/window1/apps/nostr/mainFeed/globalFeedFetchPostsInBackground';

const ParentSandbox = () => {
  const [eventIDsData, setEventIDsData] = useState(["a","b"]);
  console.log("qwertyy Parent another Sandbox")
  const updateParentSandbox = (id) => {
    let aFoo = JSON.parse(JSON.stringify(eventIDsData));
    console.log("qwerty updateParentSandbox called; id: "+id)
    setEventIDsData(aFoo.push(id));
  }
  return (
    <>
      <div>
        Parent Sandbox; eventIDsData: {eventIDsData.length}
      </div>
      <ChildSandbox updateParentSandbox={updateParentSandbox} eventIDsData={eventIDsData} />
    </>
  )
}
export default ParentSandbox;

const ChildSandbox = ({ updateParentSandbox, eventIDsData }) => {
  const filter = {
    kinds: [1,6,30023],
    since: 0,
  };

  const aFoo = JSON.parse(JSON.stringify(eventIDsData));

  /*
  const { events } = useNostrEvents({
    filter,
  });
  for (let x=0;x<events.length;x++) {
    if (aFoo) {
      if (aFoo.isArray()) {
        if (!aFoo.includes(events[x].id)) {
          updateParentSandbox(events[x].id);
        }
      }
    }
  }
  */

  console.log("qwerty Child another Sandbox")

  return (
    <>
      <div>
        Child Sandbox
        <GlobalFeedFetchPostsInBackground filter={filter} mainNostrFeedFilter="mainNostrFeedFilter" />
      </div>
    </>
  );
};

