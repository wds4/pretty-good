import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import AllLists from "./allLists";
import Kind10000Lists from './kind10000Lists';
import Kind10001Lists from './kind10001Lists';
import Kind30000Lists from './kind30000Lists';
import Kind30001Lists from './kind30001Lists';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const Lists = () => {
  // const dispatch = useDispatch();
  const oNip51 = useSelector(
    (state) => state.nip51
  );
  const title = "Nostr Devs";

  const aListEventIDs = oNip51.aListEventIDs
  return (
    <>
      <div>
        <div>number of aListEventIDs: {aListEventIDs.length}</div>
        <Kind10000Lists />
        <Kind10001Lists />
        <Kind30000Lists title={title} />
        <Kind30001Lists title={title} />
      </div>
      <div>
        <textarea id="titleField" />
      </div>
    </>
  );
};
export default Lists;

/*
<AllLists />

<Kind10000Lists />
<Kind10001Lists />
<Kind30000Lists />
<Kind30001Lists />
*/
