import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDefaultInstanceBaselineAverageScore,
  updateDefaultInstanceBaselineConfidence,
} from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const InstancesTab = () => {
  const dispatch = useDispatch();
  const {
    defaultInstanceBaselineAverageScore,
    defaultInstanceBaselineConfidence,
  } = useSelector((state) => state.controlPanelSettings);
  const [defAvg, setDefAvg] = useState(defaultInstanceBaselineAverageScore);
  const [defCon, setDefCon] = useState(defaultInstanceBaselineConfidence);

  const updateDefaultInstanceAverageSliderValue = () => {
    const e1 = document.getElementById(
      'instancesDefaultAverageScoreSliderElem'
    );
    const e2 = document.getElementById(
      'instancesDefaultAverageScoreValueContainer'
    );
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setDefAvg(e1.value);
      dispatch(updateDefaultInstanceBaselineAverageScore(e1.value));
    }
  };

  const updateDefaultInstanceConfidenceSliderValue = () => {
    const e3 = document.getElementById('instancesDefaultConfidenceSliderElem');
    const e4 = document.getElementById(
      'instancesDefaultConfidenceValueContainer'
    );
    if (e3 && e4) {
      e4.innerHTML = e3.value / 100;
      setDefCon(e3.value);
      dispatch(updateDefaultInstanceBaselineConfidence(e3.value));
    }
  };
  return (
    <>
      <div style={{ textAlign: 'left', margin: '0px 10px 10px 10px' }}>
        Adjust the default score for an unvetted instance of this curated list.
        This default score functions essentially the same way as it does for an unvetted
        user.
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              border: '1px solid black',
              borderRadius: '5px',
              width: '45%',
              padding: '5px',
            }}
          >
            <div style={{ fontSize: '14px', marginLeft: '5px' }}>
              default avg score:
            </div>
            <div style={{ marginTop: '10px' }}>
              <div
                id="instancesDefaultAverageScoreValueContainer"
                style={{
                  display: 'inline-block',
                  width: '30px',
                  marginLeft: '10px',
                }}
              >
                {defAvg / 100}
              </div>
              <div
                id="instancesDefaultAverageScoreSlider"
                style={{
                  display: 'inline-block',
                  width: '75%',
                  marginLeft: '5px',
                }}
              >
                <input
                  onChange={updateDefaultInstanceAverageSliderValue}
                  id="instancesDefaultAverageScoreSliderElem"
                  type="range"
                  min="0"
                  max="100"
                  className="pgslider"
                  defaultValue={defAvg}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-block',
              border: '1px solid black',
              borderRadius: '5px',
              width: '45%',
              padding: '5px',
              marginLeft: '10px',
            }}
          >
            <div style={{ fontSize: '14px', marginLeft: '5px' }}>
              confidence:
            </div>
            <div style={{ marginTop: '10px' }}>
              <div
                id="instancesDefaultConfidenceValueContainer"
                style={{
                  display: 'inline-block',
                  width: '30px',
                  marginLeft: '10px',
                }}
              >
                {defCon / 100}
              </div>
              <div
                id="instancesDefaultConfidenceSlider"
                style={{
                  display: 'inline-block',
                  width: '75%',
                  marginLeft: '5px',
                }}
              >
                <input
                  onChange={updateDefaultInstanceConfidenceSliderValue}
                  id="instancesDefaultConfidenceSliderElem"
                  type="range"
                  min="0"
                  max="100"
                  className="pgslider"
                  defaultValue={defCon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InstancesTab;
