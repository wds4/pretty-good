import { useSelector } from 'react-redux';
import NotesReceived from './notesReceived';

const Notes = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  return (
    <>
      <div className={devModeClassName}>
        <div className="h4">notes</div>
        <NotesReceived />
      </div>
    </>
  );
};

export default Notes;
