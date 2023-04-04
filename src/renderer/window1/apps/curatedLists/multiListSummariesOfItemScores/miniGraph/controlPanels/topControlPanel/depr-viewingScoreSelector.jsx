import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const ViewingScoreSelector = () => {
  return (
    <>
      <Tooltip
        anchorSelect="#scoreSelector"
        html={tooltipContent.scoreSelector}
        clickable
        className="reactTooltip"
        place="right"
      />
      <div>
        <a id="scoreSelector" style={{display:'inline-block'}}>score:</a>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select>
            <option>relay list curator</option>
            <option>relay list curator hunter</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default ViewingScoreSelector;
