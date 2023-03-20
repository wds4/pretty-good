import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToggleSwitchSmall from 'renderer/window1/components/toggleSwitchSmall';
import { updateViewListsLoadStoredData } from 'renderer/window1/redux/features/curatedLists/settings/slice';

const SourceToggleSwitch = ({ }) => {
  const viewListsLoadStoredData = useSelector(
    (state) => state.curatedListsSettings.viewListsLoadStoredData
  );
  const dispatch = useDispatch();
  const toggleSwitchLabel = 'viewListsLoadStoredData';
  const initState = viewListsLoadStoredData;
  const processStateChange = (newState) => {
    console.log(`processStateChange; newState: ${newState}`);
    dispatch(updateViewListsLoadStoredData(newState));
  };
  return (
    <>
      <div style={{ float: 'right' }}>
        load stored data (vs load live from nostr; under construction):{' '}
        <ToggleSwitchSmall
          label={toggleSwitchLabel}
          processStateChange={(newState) => processStateChange(newState)}
          initState={initState}
        />
      </div>
    </>
  );
};

export default SourceToggleSwitch;
