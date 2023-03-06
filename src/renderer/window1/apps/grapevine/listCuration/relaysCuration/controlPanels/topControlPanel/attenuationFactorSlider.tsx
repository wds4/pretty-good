import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';

const AttenuationFactorSelector = () => {
  const e1 = document.getElementById("attenuationFactorSliderElem");
  const e2 = document.getElementById("attenuationFactorValueContainer");
  const updateSliderValue = () => {
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
    }
  }

  return (
    <>
      <Tooltip
        anchorSelect="#attenuationFactor"
        html={tooltipContent.attenuationFactor}
        clickable
        className="reactTooltip"
        place="right"
      />
      <a id="attenuationFactor" style={{ display: 'inline-block', fontSize: '12px' }}>
        ATTENUATION FACTOR
      </a>

      <div
        id="attenuationFactorValueContainer"
        style={{
          display: 'inline-block',
          marginLeft: '10px',
          width: '30px',
          fontSize: '12px',
        }}
      >
        0.80
      </div>
      <div
        style={{
          display: 'inline-block',
          marginLeft: '10px',
          fontSize: '12px',
        }}
      >
        OFF
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '200px',
          marginLeft: '20px',
        }}
      >
        <input onChange={updateSliderValue} id="attenuationFactorSliderElem" type="range" min="0" max="100" className="pgslider" defaultValue={80} />
      </div>

      <div
        style={{
          display: 'inline-block',
          marginLeft: '20px',
          fontSize: '12px',
        }}
      >
        ON
      </div>
    </>
  );
}
export default AttenuationFactorSelector;
