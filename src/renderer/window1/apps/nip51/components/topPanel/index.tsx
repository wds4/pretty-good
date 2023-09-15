import { useSelector } from 'react-redux';
import QuestionMarkTopPanel from './questionMarkTopPanel';
import NumberInDatabaseTopPanel from './numberInDatabaseTopPanel';
import Nip51Listener from './nip51Listener';

const TopPanel = () => {
  const oNip51 = useSelector((state) => state.nip51);
  const { byAuthor, aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } = oNip51;
  const aAuthors = Object.keys(byAuthor);
  return (
    <>
      <div
        style={{
          display: 'flex',
          border: '1px solid purple',
          borderRadius: '3px',
          margin: '2px',
          padding: '5px',
          color: 'white',
          backgroundColor: 'black',
        }}
      >

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center', color: 'orange' }}>
          <div>{aAuthors.length}</div>
          <div>Authors</div>
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center', color: 'orange' }}>
          <div>{aListEventIDs.length}</div>
          <div>Lists:</div>
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <NumberInDatabaseTopPanel aKind={aKind30001} kind="30001" />
          <div>
            <QuestionMarkTopPanel content="kind30001" />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <NumberInDatabaseTopPanel aKind={aKind30000} kind="30000" />
          <div>
            <QuestionMarkTopPanel content="kind30000" />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <NumberInDatabaseTopPanel aKind={aKind10000} kind="10000" />
          <div>
            <QuestionMarkTopPanel content="kind10000" />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <NumberInDatabaseTopPanel aKind={aKind10001} kind="10001" />
          <div>
            <QuestionMarkTopPanel content="kind10001" />
          </div>

        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <Nip51Listener />
        </div>

      </div>
    </>
  )
}
export default TopPanel;

/*
<div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
  <Nip51Listener />
</div>
*/
