import { Tooltip } from 'react-tooltip';

const TooltipDemo = () => {
  return (
    <>
      <div>
        <a className="my-anchor-element" data-tooltip-content="Hello world!">
          ◕‿‿◕
        </a>
        <a
          className="my-anchor-element"
          data-tooltip-content="Hello to you too!"
        >
          ◕‿‿◕
        </a>
        <Tooltip anchorSelect=".my-anchor-element" />
      </div>
    </>
  );
};
export default TooltipDemo;
