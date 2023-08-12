import { useState } from 'react';
import { useNostrEvents } from 'nostr-react';

const NostrFilter = ({ kind, run }) => {
  if (run == 0) {
    return (
      <>
        <div>enter a kind</div>
      </>
    );
  }
  const filter = {
    kinds: [kind],
  };
  const { events } = useNostrEvents({
    filter,
  });
  return (
    <>
      <div>
        NostrFilter; kind: {kind} typeof: {typeof kind}
      </div>
      <div>{JSON.stringify(filter, null, 4)}</div>
      <div>run: {run}</div>
      <div>number of events: {events.length}</div>
      <div>
        {events.map((event) => {
          return (
            <>
              <div>{JSON.stringify(event, null, 4)}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

const ExploreNostrNotesByKind = () => {
  const [kind, setKind] = useState(30303);
  const [run, setRun] = useState(0);

  const updateKind = () => {
    const e = document.getElementById('eventKindTextarea');
    if (e) {
      setKind(parseInt(e.value));
      setRun(1);
    }
  };

  const resetFilter = () => {
    setRun(0);
  };

  return (
    <>
      <div>
        <textarea id="eventKindTextarea" />
      </div>
      <button type="button" onClick={updateKind} className="doSomethingButton">
        start
      </button>
      <button type="button" onClick={resetFilter} className="doSomethingButton">
        stop
      </button>
      <NostrFilter kind={kind} run={run} />
    </>
  );
};
export default ExploreNostrNotesByKind;
