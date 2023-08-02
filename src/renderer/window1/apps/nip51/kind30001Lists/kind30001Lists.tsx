import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';
import { isValidPublicNip51Event } from 'renderer/window1/lib/nip51';
import TechDetailsForNostrNerds from '../components/techDetailsForNostrNerds';

const Kind30001Lists = () => {
  const aKind30001Lists = useSelector(
    (state) => state.nip51.aKind30001
  );
  const oNip51Lists = useSelector(
    (state) => state.nip51.lists
  );
  return (
    <>
      <div>viewing NIP-51 kind 30001 Lists: Bookmark Lists</div>
      <div>number of Pin Lists: {aKind30001Lists.length}</div>
      <div>
        {aKind30001Lists.map((id)=>{
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

export default Kind30001Lists;
