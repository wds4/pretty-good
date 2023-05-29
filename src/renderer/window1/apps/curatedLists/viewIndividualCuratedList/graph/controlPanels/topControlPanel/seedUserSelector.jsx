import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nodes, aAllUserNodes, } from '../../grapevineVisualization';
import { updateSeedUser } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const SeedUserSelector = ({oMyNostrProfileData,aProfileCompScoreData}) => {
  const dispatch = useDispatch();
  const { seedUser } = useSelector(
    (state) => state.controlPanelSettings
  );
  const [seedUsr, setSeedUsr] = useState(seedUser);

  const updateSeedUser_X = () => {
    const e = document.getElementById("seedUserSelector")
    if (e) {
      const name = e.options[e.selectedIndex].value;
      const pubkey = e.options[e.selectedIndex].dataset.pubkey;
      console.log("updateSeedUser_X; "+pubkey)
      // dispatch(updateSeedUser(pubkey));
      for (let n=0;n<aAllUserNodes.length;n++) {
        const pk = aAllUserNodes[n]
        const oNode = nodes.get(pk);
        if (pk == pubkey) {
          oNode.seed = true;
        } else {
          oNode.seed = false;
        }
        nodes.update(oNode);
      }
    }
  }
  return (
    <>
      <Tooltip
        anchorSelect="#seedUser"
        html={tooltipContent.seedUser}
        clickable
        className="reactTooltip"
        place="right"
      />
      <div>
        <a id="seedUser" style={{display:'inline-block'}}>seed user:</a>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select
            id="seedUserSelector"
            onChange={()=>{
              updateSeedUser_X()
              const e = document.getElementById("seedUserSelector")
              if (e) {
                // const newSeedUser = e.value;
                const newSeedUser = e.options[e.selectedIndex].dataset.pubkey;
                console.log("updateSeedUser_B; newSeedUser: "+newSeedUser)
                dispatch(updateSeedUser(newSeedUser)); // oProfileData.pubkey ??? or this.value???
              }
            }}
          >
            {aProfileCompScoreData.map((oProfileData)=>{
              const pk = oProfileData.pubkey;
              let selected = false;
              // if (oMyNostrProfileData.pubkey == pk) {
              if (seedUsr == pk) {
                selected = true;
              }
              return (
                <>
                  <option
                    selected={selected}
                    value={oProfileData.name}
                    data-pubkey={oProfileData.pubkey}
                  >{oProfileData.name}</option>
                </>
              )
            })}
          </select>
        </div>
      </div>
    </>
  );
};
export default SeedUserSelector;
