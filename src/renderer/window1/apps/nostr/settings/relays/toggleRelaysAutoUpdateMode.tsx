import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateRelaysAutoUpdate } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';

const ToggleRelaysAutoUpdateMode = () => {
  const initState = useSelector(
    (state) => state.myNostrProfile.relaysAutoUpdate
  );
  const dispatch = useDispatch();
  const processStateChange = async (newState) => {
    dispatch(updateRelaysAutoUpdate(newState));
    const sql = ` UPDATE myNostrProfile SET relaysAutoUpdate = ${newState} WHERE active = true `;
    console.log(`processStateChange callback; ${newState}; sql: ${sql}`);
    // const res = await asyncSql(sql);
  };
  return (
    <>
      <div >
        <ToggleSwitch
          label="relaysAutoUpdateMode"
          processStateChange={(newState) => processStateChange(newState)}
          initState={initState}
        />
      </div>
    </>
  );
};
export default ToggleRelaysAutoUpdateMode;
