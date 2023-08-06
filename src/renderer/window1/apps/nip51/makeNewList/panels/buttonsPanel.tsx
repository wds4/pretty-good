import PublishButton from '../components/publishButton';
import StartOverButton from '../components/startOverButton';

const ButtonsPanel = ({
  startOver,
  aItems,
  whichStep,
  newListKind,
}) => {
  if (whichStep == 0) {
    return <></>;
  }
  if (aItems.length == 0) {
    return (
      <>
        <StartOverButton startOver={startOver} />
      </>
    );
  }
  if (whichStep == 1) {
    return (
      <>
        <div style={{
          display: "flex",
          gap: "10px",
        }}
        >
          <PublishButton />
          <StartOverButton startOver={startOver} />
        </div>
      </>
    );
  }

};
export default ButtonsPanel;
