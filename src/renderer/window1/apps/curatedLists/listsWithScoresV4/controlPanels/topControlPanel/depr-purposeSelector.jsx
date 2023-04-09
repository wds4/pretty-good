import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const PurposeSelector = () => {
  return (
    <>
      <Tooltip
        anchorSelect="#purposeSelector"
        html={tooltipContent.purposeSelector}
        clickable
        className="reactTooltip"
        place="right"
      />
      <div>
        <a id="purposeSelector" style={{display:'inline-block'}}>Purpose:</a>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select>
            <option disabled>ALL</option>
            <option disabled>- attention</option>
            <option selected>- relays curation</option>
            <option disabled>- ontology</option>
            <option disabled>- advice</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default PurposeSelector;
