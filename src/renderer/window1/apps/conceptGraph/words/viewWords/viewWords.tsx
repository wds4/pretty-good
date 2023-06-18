import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';

const ViewWords = () => {
  const pk = "c51a542e4f93afe6f45e5bef002f7a0efcc0a47460a736654c0bee5402c482fa"; // Pretty Good Apps Steward 1
  const filter = {
    since: 0,
    kinds: [9902],
    authors: [pk],
    // "#c": [ "concept-graph-testnet-902" ],
    // "#w": [ "word" ],
  };
  const { events } = useNostrEvents({
    filter,
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div>ViewWords</div>
      <div>number of events: {events.length}</div>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          const oWord = JSON.parse(event.content);
          const slug = oWord.wordData.slug;
          return (
            <>
              <div>{slug}</div>
              <TechDetailsForNostrNerds1 event={event} />
              <TechDetailsForNostrNerds2 event={event} />
            </>
          );
        }
      })}
    </>
  )
}

export default ViewWords;
