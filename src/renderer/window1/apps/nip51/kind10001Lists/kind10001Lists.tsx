import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';
import { isValidPublicNip51Event } from 'renderer/window1/lib/nip51';
import TechDetailsForNostrNerds from '../components/techDetailsForNostrNerds';

const Kind10001Lists = () => {
  const aKind10001Lists = useSelector(
    (state) => state.nip51.aKind10001
  );
  const oNip51Lists = useSelector(
    (state) => state.nip51.lists
  );
  return (
    <>
      <div>viewing NIP-51 kind 10001 Lists: Pin Lists</div>
      <div>number of Pin Lists: {aKind10001Lists.length}</div>
      <div>
        {aKind10001Lists.map((id)=>{
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

export default Kind10001Lists;
