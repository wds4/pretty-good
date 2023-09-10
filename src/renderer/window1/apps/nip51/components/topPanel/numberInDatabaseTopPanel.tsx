import { Tooltip } from 'react-tooltip';

const NumberInDatabaseTopPanel = ({ aKind, kind }) => {
  let html = '<div style=font-size:16px; >';
  html += 'number of lists of this type in the local database';
  html += '</div>';
  const id = `numInDatabase_${kind}`;
  const anchorSelect = `#numInDatabase_${kind}`;
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
        <div style={{ display: 'inline-block' }}>({aKind.length})</div>
      </a>
    </>
  );
};
export default NumberInDatabaseTopPanel;
