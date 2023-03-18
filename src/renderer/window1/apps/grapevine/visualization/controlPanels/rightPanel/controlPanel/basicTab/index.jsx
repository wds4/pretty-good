import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRigor } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const BasicTab = () => {
  const dispatch = useDispatch();
  const { rigor } = useSelector(
    (state) => state.controlPanelSettings
  );
  const [rig, setRig] = useState(rigor);

  const updateRigorSliderValue = () => {
    const e1 = document.getElementById('rigorSliderElem');
    const e2 = document.getElementById('rigorValueContainer');
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setRig(e1.value);
      dispatch(updateRigor(e1.value))
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#CFCFCF', marginTop: '10px' }}>
        <div style={{ textAlign: 'left', marginTop: '10px', fontSize: '12px' }}>
          Currently if either the Rigor of the Default Confidence is changed,
          then the other variable is also changed in a manner so that for an
          unvetted user, eht Confidence (set by the user) and the Certainty
          (calculated using the Rigor Equation) are equal. If Confidence goes
          up, Rigor goes down, and vice versa.
        </div>
        Decouple Rigor
        <select id="decoupleRigorFromConfidenceForDefaultsSelector">
          <option value="couple">no, leave coupled</option>
          <option value="uncouple">yes, uncouple</option>
        </select>
      </div>

      <div style={{ backgroundColor: '#CFCFCF', marginTop: '10px' }}>
        <div style={{ textAlign: 'left', marginTop: '10px', fontSize: '12px' }}>
          Rigor is a parameter in the equation that controls the relationship
          between the Input (a.k.a. "Work") and the Certainty of any composite
          score. Currently, the value for Rigor is the same for every composite
          score type, although we may make it possible in the future to use
          different values for different composite score types.
        </div>

        <div
          style={{
            display: 'inline-block',
            border: '1px solid black',
            borderRadius: '5px',
            width: '300px',
            padding: '5px',
          }}
        >
          <div style={{ fontSize: '14px', marginLeft: '5px' }}>rigor:</div>
          <div style={{ marginTop: '10px' }}>
            <div
              id="rigorValueContainer"
              style={{
                display: 'inline-block',
                width: '30px',
                marginLeft: '10px',
              }}
            >
            {rig / 100}
            </div>
            <div
              id="rigorSlider"
              style={{
                display: 'inline-block',
                width: '200px',
                marginLeft: '20px',
              }}
            >
              <input
                onChange={updateRigorSliderValue}
                id="rigorSliderElem"
                type="range"
                min="0"
                max="100"
                className="pgslider"
                defaultValue={rig}
              />
            </div>
          </div>
        </div>
        <div
          id="rigorChartContainer"
          style={{
            width: '600px',
            height: '200px',
            backgroundColor: '#CFCFCF',
            marginTop: '10px',
          }}
        />
      </div>
    </>
  );
};
export default BasicTab;
