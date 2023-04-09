import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateStrat3Coeff,
  updateStrat4Coeff,
  updateStrat5Coeff,
} from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const Mod3Tab = () => {
  const dispatch = useDispatch();
  const { strat3Coeff, strat4Coeff, strat5Coeff } = useSelector(
    (state) => state.controlPanelSettings
  );
  const [s3Coeff, setS3Coeff] = useState(strat3Coeff);
  const [s4Coeff, setS4Coeff] = useState(strat4Coeff);
  const [s5Coeff, setS5Coeff] = useState(strat5Coeff);

  const updateStrat3CoeffValue = () => {
    const e1 = document.getElementById('strat3CoeffSliderElem');
    const e2 = document.getElementById('strat3CoeffValueContainer');
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setS3Coeff(e1.value);
      dispatch(updateStrat3Coeff(e1.value));
    }
  };

  const updateStrat4CoeffValue = () => {
    const e3 = document.getElementById('strat4CoeffSliderElem');
    const e4 = document.getElementById('strat4CoeffValueContainer');
    if (e3 && e4) {
      e4.innerHTML = e3.value / 100;
      setS4Coeff(e3.value);
      dispatch(updateStrat4Coeff(e3.value));
    }
  };

  const updateStrat5CoeffValue = () => {
    const e5 = document.getElementById('strat5CoeffSliderElem');
    const e6 = document.getElementById('strat5CoeffValueContainer');
    if (e5 && e6) {
      e6.innerHTML = e5.value / 100;
      setS5Coeff(e5.value);
      dispatch(updateStrat5Coeff(e5.value));
    }
  };
  return (
    <>
      <div className="h5" style={{ marginBottom: '8px' }}>
        Defense Modification #3 Tab
      </div>
      <div style={{ marginBottom: '8px' }}>Extreme Ratings</div>

      <div style={{ fontSize: '12px' }}>
        <div
          style={{
            textAlign: 'left',
            padding: '5px',
            fontStyle: 'italic',
          }}
        >
          Problem: What if Malicious User #1 rates Malicious User #2 with some
          ridiculously high score, like 10 million?
        </div>

        <div
          style={{
            textAlign: 'left',
            marginTop: '10px',
            padding: '5px',
          }}
        >
          Solution: Extreme (high or low) trust ratings are given less weight.
          (And each user gets to decide what constitutes "unreasonable.")
        </div>

        <div style={{ backgroundColor: '#CFCFCF', marginTop: '10px' }}>
          <div>
            <div>
              <div style={{ display: 'inline-block', fontSize: '12px' }}>
                Mod 3 FACTOR:
              </div>
              <div
                id="strat3CoeffValueContainer"
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  width: '30px',
                  fontSize: '12px',
                }}
              >
                {s3Coeff / 100}
              </div>
            </div>

            <div>
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
                  marginLeft: '10px',
                }}
              >
                <input
                  onChange={updateStrat3CoeffValue}
                  id="strat3CoeffSliderElem"
                  type="range"
                  min="0"
                  max="100"
                  className="pgslider"
                  defaultValue={s3Coeff}
                />
              </div>
              <div
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '12px',
                }}
              >
                ON
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px' }}>
            <div style={{ textAlign: 'left', marginTop: '10px' }}>
              Default: 1.00
            </div>
          </div>
        </div>
      </div>






      <div style={{ backgroundColor: '#CFCFCF', marginTop: '10px' }}>
        <div>
          <div>
            <div style={{ display: 'inline-block', fontSize: '12px' }}>
              Mod 4 FACTOR:
            </div>
            <div
              id="strat4CoeffValueContainer"
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                width: '30px',
                fontSize: '12px',
              }}
            >
              {s4Coeff / 100}
            </div>
          </div>

          <div>
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
                marginLeft: '10px',
              }}
            >
              <input
                onChange={updateStrat4CoeffValue}
                id="strat4CoeffSliderElem"
                type="range"
                min="0"
                max="500"
                className="pgslider"
                defaultValue={s4Coeff}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                fontSize: '12px',
              }}
            >
              ON
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px' }}>
          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            A parameter to modify the strength of Strategy 3.
          </div>

          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            Default: 2.00
          </div>
        </div>
      </div>






      <div style={{ backgroundColor: '#CFCFCF', marginTop: '10px' }}>
        <div>
          <div>
            <div style={{ display: 'inline-block', fontSize: '12px' }}>
              Mod 5 FACTOR:
            </div>
            <div
              id="strat5CoeffValueContainer"
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                width: '40px',
                fontSize: '12px',
              }}
            >
              {s5Coeff / 100}
            </div>
          </div>

          <div>
            <div
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                fontSize: '12px',
              }}
            >
              strict
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '200px',
                marginLeft: '10px',
              }}
            >
              <input
                onChange={updateStrat5CoeffValue}
                id="strat5CoeffSliderElem"
                type="range"
                min="101"
                max="2000"
                className="pgslider"
                defaultValue={s5Coeff}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                marginLeft: '10px',
                fontSize: '12px',
              }}
            >
              loose
            </div>
          </div>
        </div>

        <div style={{ fontSize: '12px' }}>
          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            A parameter to specify Strategy 3's boundary between a reasonably and an unreasonably high credibility score.
          </div>

          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            Default: 5.00
          </div>
        </div>
      </div>
    </>
  );
};
export default Mod3Tab;
