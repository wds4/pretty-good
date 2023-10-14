import { useSelector } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import AllLists from "./allLists";
import Kind10000Lists from './kind10000Lists';
import Kind10001Lists from './kind10001Lists';
import Kind30000Lists from './kind30000Lists';
import Kind30001Lists from './kind30001Lists';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const ShowCurrentListsNumbers = () => {
  const oNip51 = useSelector(
    (state) => state.nip51
  );
  const { aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } = oNip51
  return (
    <>
      <div>
        <div className="listsLoaderHeaderElem" >number of lists: {aListEventIDs.length}</div>
        <div className="listsLoaderHeaderElem">people: {aKind30000.length}</div>
        <div className="listsLoaderHeaderElem">general purpose: {aKind30001.length}</div>
        <div className="listsLoaderHeaderElem">mute: {aKind10000.length} (disabled)</div>
        <div className="listsLoaderHeaderElem">pin: {aKind10001.length} (disabled)</div>
      </div>
    </>
  )
}

const Lists = () => {
  const title = "imported Nostr Devs";
  return (
    <>
      <div>
        <div>loading lists (People or Bookmark) with title: 'Nostr Devs' or 'imported Nostr Devs'</div>
        <Kind30000Lists title={title} />
        <Kind30001Lists title={title} />
      </div>
    </>
  );
};
export default Lists;

/*
<Kind10000Lists />
<Kind10001Lists />
*/

/*
<AllLists />

<Kind10000Lists />
<Kind10001Lists />
<Kind30000Lists />
<Kind30001Lists />
*/
