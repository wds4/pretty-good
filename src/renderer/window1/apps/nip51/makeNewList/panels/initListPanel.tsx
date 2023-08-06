import NewListName from '../components/newListName';
import NewListTypeSelector from '../components/newListTypeSelector';
import LockListNameButton from '../components/lockListNameButton';
import PublicOrPrivateSelector from '../components/publicOrPrivateSelector';

const LLNButton = ({newListKind, newListName, whichStep, startNewList}) => {
  if (newListKind==0) { return <></>; }
  if (whichStep==1) { return <></>; }
  return (
    <>
      <div
        style={{
          width: '50px',
          flexGrow: '1',
        }}
      >
        <LockListNameButton
          newListKind={newListKind}
          newListName={newListName}
          whichStep={whichStep}
          startNewList={startNewList}
        />
      </div>
    </>
  );
};

const NLN = ({newListKind, setNewListName}) => {
  if (newListKind==0) { return <></>; }
  const fooFxn = () => {
    const e2 = document.getElementById('newListTitle');
    if (e2) {
      setNewListName(e2.value);
    }
  }
  return (
    <>
      <div
        style={{
          flexGrow: '999',
        }}
        onChange = {fooFxn}
      >
        <NewListName
          newListKind={newListKind}
          setNewListName={setNewListName}
        />
      </div>
    </>
  )
}

const InitListPanel = ({
  newListKind,
  newListName,
  whichStep,
  setNewListName,
  handleToggleWhichStep,
  startOver,
  setNewListKind,
}) => {
  const startNewList = () => {
    handleToggleWhichStep();
    // startOver();
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div
          style={{
            minWidth: '200px',
            flexGrow: '999',
          }}
        >
          <NewListTypeSelector
            setNewListKind={setNewListKind}
            setNewListName={setNewListName}
            newListKind={newListKind}
          />
        </div>
        <div
          style={{
            width: '150px',
            flexGrow: '1',
          }}
        >
          <PublicOrPrivateSelector />
        </div>
        <NLN
          newListKind={newListKind}
          setNewListName={setNewListName}
        />
        <LLNButton
          newListKind={newListKind}
          newListName={newListName}
          whichStep={whichStep}
          startNewList={startNewList}
        />
      </div>
    </>
  );
};
export default InitListPanel;
