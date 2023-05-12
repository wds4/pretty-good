import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const ContextSelector = () => {
  return (
    <>
      <Tooltip
        anchorSelect="#contextSelector"
        html={tooltipContent.contextSelector}
        clickable
        className="reactTooltip"
        place="right"
      />
      <div>
        <a id="contextSelector" style={{display:'inline-block'}}>context:</a>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select>
            <option selected>ALL RELAYS</option>
            <option disabled>- free relays</option>
            <option disabled>- paid relays</option>
            <option disabled>- image hosting</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default ContextSelector;
