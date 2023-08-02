import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';
import { isValidPublicNip51Event } from 'renderer/window1/lib/nip51';
import TechDetailsForNostrNerds from '../components/techDetailsForNostrNerds';

const Kind10000Lists = () => {
  const aKind10000Lists = useSelector(
    (state) => state.nip51.aKind10000
  );
  const oNip51Lists = useSelector(
    (state) => state.nip51.lists
  );
  return (
    <>
      <div>viewing NIP-51 kind 10000 Lists: Mute Lists</div>
      <div>number of Mute Lists: {aKind10000Lists.length}</div>
      <div>
        {aKind10000Lists.map((id)=>{
          const event = oNip51Lists[id].event;
          return (
            <>
              <div>
                <TechDetailsForNostrNerds event={event} />
              </div>
            </>
          )
        })}
      </div>
    </>
  )
};

export default Kind10000Lists;
