import { useSelector } from 'react-redux';
import Kind10000Lists from './kind10000Lists';
import Kind10001Lists from './kind10001Lists';
import Kind30000Lists from './kind30000Lists';
import Kind30001Lists from './kind30001Lists';

const Nip51ListListener = () => {
  const oNip51 = useSelector(
    (state) => state.nip51
  );

  const { aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } = oNip51
  return (
    <>
      <div style={{border: '1px solid purple', borderRadius: '3px', margin: '2px', padding: '5px'}}>
        <div className="listsLoaderHeaderElem" >{aListEventIDs.length} TOTAL LISTS</div>
        <div className="listsLoaderHeaderElem">people: {aKind30000.length}</div>
        <div className="listsLoaderHeaderElem">bookmarks: {aKind30001.length}</div>
        <div className="listsLoaderHeaderElem">mute: {aKind10000.length}</div>
        <div className="listsLoaderHeaderElem">pin: {aKind10001.length}</div>
        <br/>
        <Kind10000Lists />
        <Kind10001Lists />
        <Kind30000Lists />
        <Kind30001Lists />
      </div>
    </>
  )
}
export default Nip51ListListener;
