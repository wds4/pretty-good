import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addCuratedListEventToSql } from 'renderer/window1/lib/pg/sql';

import List from './list';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const AllListsLoadLive = () => {
  const kind0 = 9901;
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["c","concept-graph-testnet-901"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["s","nostrCuratedList"]; // if t = createInstance; s for slug of the parent concept of the instance (alternate: e for the event id of the parent concept)
  */
 const filter = {
  since: 0,
  kinds: [kind0],
  '#c': ['concept-graph-testnet-901'],
  '#t': ['createInstance'],
  '#s': ['nostrCuratedList'],
 }
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div style={{textAlign: 'center', marginBottom: '10px'}}>Live streaming from nostr:</div>
      <TechDetailsForNostrNerds filter={filter} />
      <div>number of lists: {events.length}</div>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          addCuratedListEventToSql(event);
          return (
            <>
              <List event={event} />
            </>
          );
        }
      })}
    </>
  );
};

export default AllListsLoadLive;
