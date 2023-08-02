import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';
import { isValidPublicNip51Event } from 'renderer/window1/lib/nip51';
import TechDetailsForNostrNerds from '../components/techDetailsForNostrNerds';

const Kind30000Lists = () => {
  const aKind30000Lists = useSelector(
    (state) => state.nip51.aKind30000
  );
  const oNip51Lists = useSelector(
    (state) => state.nip51.lists
  );
  return (
    <>
      <div>viewing NIP-51 kind 30000 Lists: People Lists</div>
      <div>number of Pin Lists: {aKind30000Lists.length}</div>
      <div>
        {aKind30000Lists.map((id)=>{
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

export default Kind30000Lists;
