import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateViewEventsLoadStoredData } from 'renderer/window1/redux/features/nostr/settings/slice';
import ToggleSwitchSmall from './toggleSwitchSourceSmall';

const SourceToggleSwitch = ({}) => {
  const viewEventsLoadStoredData = useSelector(
    (state) => state.nostrSettings.viewEventsLoadStoredData
  );
  const dispatch = useDispatch();
  const toggleSwitchLabel = 'viewEventsLoadStoredData';
  const initState = viewEventsLoadStoredData;
  const processStateChange = (newState) => {
    console.log(`processStateChange; newState: ${newState}`);
    dispatch(updateViewEventsLoadStoredData(newState));
  };
  return (
    <>
      <div
        style={{ border: '1px solid black', padding: '5px', margin: '10px' }}
      >
        data source:
        <ToggleSwitchSmall
          label={toggleSwitchLabel}
          processStateChange={(newState) => processStateChange(newState)}
          initState={initState}
        />
        <li>nostr: load live streaming data from nostr</li>
        <li>SQL: load data from redux which has been preloaded from SQL</li>
        <div>
          The goal of using redux and SQl is data persistence. Currently this is
          functional but very slow, so nostr is the default setting.
        </div>
      </div>
    </>
  );
};

export default SourceToggleSwitch;
