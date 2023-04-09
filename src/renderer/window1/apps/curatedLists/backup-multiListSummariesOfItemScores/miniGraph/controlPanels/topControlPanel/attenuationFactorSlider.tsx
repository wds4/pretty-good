import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import { useSelector, useDispatch } from 'react-redux';
import { updateAttenuationFactor } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const AttenuationFactorSelector = () => {
  const dispatch = useDispatch();
  const { attenuationFactor } = useSelector(
    (state) => state.controlPanelSettings
  );
  const [attFac, setAttFac] = useState(attenuationFactor);

  const updateSliderValue = () => {
    const e1 = document.getElementById("attenuationFactorSliderElem");
    const e2 = document.getElementById("attenuationFactorValueContainer");
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setAttFac(e1.value);
      dispatch(updateAttenuationFactor(e1.value))
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
        ATTENUATION FACTOR:
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
        {attFac / 100}
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
        <input onChange={updateSliderValue} id="attenuationFactorSliderElem" type="range" min="0" max="100" className="pgslider" defaultValue={attFac} />
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
