import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const List = () => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  const filter = {
    kinds: [1985],
    since: 0,
    "#L": ["social.coracle.ontology"],
  };
  const { events } = useNostrEvents({
    filter,
  });

  for (let x=0; x<events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      // dispatch(addList(event));
    }
  }

  return (
    <>
      <div>
        Temporarilty: NIP-32 explorer
      </div>
      <div>kind 1985; number of events: {events.length}</div>
      <div>
        {events.map((event)=>{
          const aTags_L = event.tags.filter(([k, v]) => k === 'L' && v && v !== '');
          let Ltag = "---- no L tag ----";
          if (aTags_L.length > 0) {
            Ltag = aTags_L[0][1];
          }
          if (Ltag != "ugc") {
            return (
              <>
                <div>{Ltag}</div>
                <div>{JSON.stringify(event,null,4)}</div>
              </>
            )
          }
          return <></>
        })}
      </div>
    </>
  )
};

export default List;
