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
          {aAuthors.length} Authors
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center', color: 'orange' }}>
          {aListEventIDs.length} Lists:
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <span>
            <QuestionMarkTopPanel content="kind30001" />
          </span>{' '}
          <NumberInDatabaseTopPanel aKind={aKind30001} kind="30001" />
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <span>
            <QuestionMarkTopPanel content="kind30000" />
          </span>{' '}
          <NumberInDatabaseTopPanel aKind={aKind30000} kind="30000" />
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <span>
            <QuestionMarkTopPanel content="kind10000" />
          </span>{' '}
          <NumberInDatabaseTopPanel aKind={aKind10000} kind="10000" />
        </div>

        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <span>
            <QuestionMarkTopPanel content="kind10001" />
          </span>{' '}
          <NumberInDatabaseTopPanel aKind={aKind10001} kind="10001" />
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
