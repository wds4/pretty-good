import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const SeedUserSelector = ({oMyNostrProfileData}) => {
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
          <select>
            <option selected>{oMyNostrProfileData?.name}</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default SeedUserSelector;
