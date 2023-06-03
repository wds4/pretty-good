import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import { useSelector, useDispatch } from 'react-redux';
import { updateSeedUser } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const SeedUserSelectorRedo = ({oNostrProfilesData,nodes,aAllUserNodes}) => {
  const dispatch = useDispatch();
  const { seedUser } = useSelector(
    (state) => state.controlPanelSettings
  );
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const [seedUsr, setSeedUsr] = useState(seedUser);
  const updateSeedUser_X = () => {
    const e = document.getElementById("seedUserSelector")
    if (e) {
      const name = e.options[e.selectedIndex].value;
      const pubkey = e.options[e.selectedIndex].dataset.pubkey;
      console.log("updateSeedUser; "+pubkey)
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
      <div style={{display: 'inline-block'}}>
        <Tooltip
          anchorSelect="#seedUser"
          html={tooltipContent.seedUser}
          clickable
          className="reactTooltip"
          place="right"
        />
        <div>
          <div style={{display:'inline-block', marginLeft: '5px'}}>
            <select
              id="seedUserSelector"
              // onChange={()=>updateSeedUser()}

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
              {aAllUserNodes.map((pk)=>{
                let selected = false;
                if (seedUser == pk) {
                  selected = true;
                }
                let name = "..."+pk.substr(-6);
                if (nostrProfiles.hasOwnProperty(pk)) {
                  const profileContent = JSON.parse(nostrProfiles[pk].content);
                  name = `@${profileContent?.name}`;
                }
                return (
                  <>
                    <option
                      selected={selected}
                      value={name}
                      data-pubkey={pk}
                    >{name}</option>
                  </>
                )
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
export default SeedUserSelectorRedo;
