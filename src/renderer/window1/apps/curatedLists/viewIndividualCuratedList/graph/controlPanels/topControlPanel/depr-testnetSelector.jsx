import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const TestnetSelector = () => {
  return (
    <>
      <Tooltip
        anchorSelect="#testnetSelector"
        html={tooltipContent.testnetSelector}
        clickable
        className="reactTooltip"
        place="right"
      />
      <div>
        <a id="testnetSelector" style={{display:'inline-block'}}>testnet?:</a>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select>
            <option selected>testnet (kind: 39901)</option>
            <option disabled>production (kind: ?)</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default TestnetSelector;
