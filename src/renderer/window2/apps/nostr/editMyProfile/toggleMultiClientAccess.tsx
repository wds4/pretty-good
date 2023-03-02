import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateMultiClientAccess } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';

const ToggleMultiProfilesMode = () => {
  const initState = useSelector(
    (state) => state.myNostrProfile.multiClientAccess
  );
  const dispatch = useDispatch();
  const processStateChange = async (newState) => {
    dispatch(updateMultiClientAccess(newState));
    const sql = ` UPDATE myNostrProfile SET multiClientAccess = ${newState} WHERE active = true `;
    console.log(`processStateChange callback; ${newState}; sql: ${sql}`);
    const res = await asyncSql(sql);
  };
  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <ToggleSwitch
          label="multiProfilesMode"
          processStateChange={(newState) => processStateChange(newState)}
          initState={initState}
        />
      </div>
    </>
  );
};
export default ToggleMultiProfilesMode;
