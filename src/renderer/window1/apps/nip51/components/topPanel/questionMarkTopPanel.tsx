import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const QuestionMarkTopPanel = ({ content }) => {
  let listType = 'list type';
  if (content == 'kind10000') {
    listType = 'Mute';
  }
  if (content == 'kind10001') {
    listType = 'Pin';
  }
  if (content == 'kind30000') {
    listType = 'People';
  }
  if (content == 'kind30001') {
    listType = 'Bookmarks';
  }
  let html = '<div style=font-size:16px;text-align:left; >';
  html += tooltipContent.lists[content];
  html += '</div>';
  const id = `questionMarkInfoBox_${content}`;
  const anchorSelect = `#questionMarkInfoBox_${content}`;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={html}
        clickable
        className="reactTooltip"
        place="bottom"
      />
      <a id={id}>
        <div style={{ display: 'inline-block', fontSize: '14px' }}>{listType}</div>
      </a>

    </>
  );
};
export default QuestionMarkTopPanel;
