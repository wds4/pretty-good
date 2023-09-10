import { useSelector, useDispatch } from 'react-redux';
import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { updateAutoImportNip51 } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const ProcessImportsToggle = ({aTags_a}) => {
  const initState = useSelector(
    (state) => state.myNostrProfile.autoImportNip51
  );
  const dispatch = useDispatch();
  const processStateChange_autoImportNip51 = (newState) => {
    dispatch(updateAutoImportNip51(newState));
  };
  if (aTags_a.length == 0) {
    return <></>;
  }
  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <div style={{display: 'inline-block', color: 'grey', fontSize: '14px', marginLeft: '5px', textAlign: 'right'}}>
          process list imports<br/>(recursively)
        </div>
        <div style={{display: 'inline-block', marginLeft: '5px'}}>
          <ToggleSwitch
            label="autoImportNip51"
            processStateChange={(newState) =>
              processStateChange_autoImportNip51(newState)
            }
            initState={initState}
          />
        </div>
      </div>
    </>
  );
};
export default ProcessImportsToggle;
