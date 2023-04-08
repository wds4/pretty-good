import React from 'react';

const ToggleSwitch = ({ label, processStateChange, initState, aux }) => {
  const processToggle = (newState,aux) => {
    processStateChange(newState,aux);
  };
  return (
    <div className="grapevineSettingsToggleSwitchContainer" data-label={label}>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          checked={initState}
          name={label}
          id={label}
          value={aux}
          onChange={(e) => processToggle(e.target.checked,e.target.value)}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
