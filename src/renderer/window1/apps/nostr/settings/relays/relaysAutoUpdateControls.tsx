import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { updateRelaysAutoUpdate, updateRelaysAutoMerge } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const ToggleRelaysAutoUpdateMode = () => {
  const initStateA = useSelector(
    (state) => state.myNostrProfile.relaysAutoUpdate
  );
  const initStateB = useSelector(
    (state) => state.myNostrProfile.relaysAutoMerge
  );
  const dispatch = useDispatch();
  const processStateChangeA = async (newState) => {
    dispatch(updateRelaysAutoUpdate(newState));
    const sql = ` UPDATE myNostrProfile SET relaysAutoUpdate = ${newState} WHERE active = true `;
    console.log(`processStateChange callback; ${newState}; sql: ${sql}`);
    // const res = await asyncSql(sql);
  };
  const processStateChangeB = async (newState) => {
    dispatch(updateRelaysAutoMerge(newState));
    const sql = ` UPDATE myNostrProfile SET relaysAutoMerge = ${newState} WHERE active = true `;
    console.log(`processStateChange callback; ${newState}; sql: ${sql}`);
    // const res = await asyncSql(sql);
  };
  return (
    <>
      <div style={{border: '1px dashed grey', marginBottom: '5px', padding: '5px'}} >

        <div style={{ marginBottom: '5px' }}>
          <div style={{display: 'inline-block', width: '200px'}} >
            <a id="relaysAutoUpdateButton">relays auto update:</a>
            <Tooltip
              anchorSelect="#relaysAutoUpdateButton"
              html={tooltipContent.relaysAutoUpdateButton}
              clickable
              className="reactTooltip"
            />
          </div>
          <div style={{display: 'inline-block', width: '200px'}} >
            <ToggleSwitch
              label="relaysAutoUpdateMode"
              processStateChange={(newState) => processStateChangeA(newState)}
              initState={initStateA}
            />
          </div>
        </div>


        <div style={{ marginBottom: '5px' }}>
          <div style={{display: 'inline-block', width: '200px'}} >
            <a id="mergeRelayAutoUpdateButton">merge recommended relays to my list:</a>
            <Tooltip
              anchorSelect="#mergeRelayAutoUpdateButton"
              html={tooltipContent.mergeRelayAutoUpdateButton}
              clickable
              className="reactTooltip"
            />
          </div>
          <div style={{display: 'inline-block', width: '200px'}} >
            <ToggleSwitch
              label="mergeRelayAutoUpdateRecs"
              processStateChange={(newState) => processStateChangeB(newState)}
              initState={initStateB}
            />
          </div>
        </div>

      </div>
    </>
  );
};
export default ToggleRelaysAutoUpdateMode;
