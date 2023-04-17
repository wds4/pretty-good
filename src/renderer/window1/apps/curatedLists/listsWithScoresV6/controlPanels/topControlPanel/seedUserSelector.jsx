import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import { nodes, aAllUserNodes, } from '../../grapevineVisualization';

const SeedUserSelector = ({oMyNostrProfileData,aProfileCompScoreData}) => {
  const updateSeedUser = () => {
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
            onChange={()=>updateSeedUser()}
          >
            {aProfileCompScoreData.map((oProfileData)=>{
              const pk = oProfileData.pubkey;
              let selected = false;
              if (oMyNostrProfileData.pubkey == pk) {
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
