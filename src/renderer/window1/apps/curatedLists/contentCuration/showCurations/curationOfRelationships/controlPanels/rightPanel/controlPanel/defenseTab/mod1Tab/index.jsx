import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStrat1Coeff } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const Mod1Tab = () => {
  const dispatch = useDispatch();
  const { strat1Coeff } = useSelector(
    (state) => state.controlPanelSettings
  );
  const [s1Coeff, setS1Coeff] = useState(strat1Coeff);

  const updateStrat1CoeffValue = () => {
    const e1 = document.getElementById("strat1CoeffSliderElem");
    const e2 = document.getElementById("strat1CoeffValueContainer");
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setS1Coeff(e1.value);
      dispatch(updateStrat1Coeff(e1.value))
    }
  }
  return (
    <>
      <div className="h5" style={{marginBottom:"8px"}}>Defense Modification #1 Tab</div>
      <div style={{marginBottom:"8px"}}>Reference User</div>

      <div>
        <div>
          <div style={{ display: 'inline-block', fontSize: '12px' }}>
            Mod 1 FACTOR:
          </div>
          <div
            id="strat1CoeffValueContainer"
            style={{
              display: 'inline-block',
              marginLeft: '10px',
              width: '30px',
              fontSize: '12px',
            }}
          >
            {s1Coeff / 100}
          </div>
        </div>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '12px',
          }}
        >
          OFF (ref = avg user)
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '200px',
            marginLeft: '10px',
          }}
        >
          <input
            onChange={updateStrat1CoeffValue}
            id="strat1CoeffSliderElem"
            type="range"
            min="0"
            max="100"
            className="pgslider"
            defaultValue={s1Coeff}
          />
        </div>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '12px',
          }}
        >
          ON (ref = rater)
        </div>
      </div>

      <div style={{ fontSize: '12px' }}>
        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          All trust scores are (more appropriately) interpreted using the rater
          as the reference (rather than the poorly-defined "average user"). This
          practice is conceptually more appropriate (because the notion of
          average user has problems). This Defense Modification effectively
          sharpens the filter between low-trust and high-trust groups. (However,
          in some ways it may increase vulnerability to attack from bad actors?)
        </div>

        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          Default: 1.00
        </div>
      </div>
    </>
  );
};
export default Mod1Tab;
