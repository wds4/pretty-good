import React from 'react';

const ToggleSwitch = ({ label, processStateChange, initState, aux }) => {
  const processToggle = (newState,aux) => {
    processStateChange(newState,aux);
  };
  return (
    <div className="grapevineSettingsToggleSwitchSmallContainer" data-label={label}>
      <div className="toggle-switch-source-small">
        <input
          type="checkbox"
          className="checkbox"
          checked={initState}
          name={label}
          id={label}
          value={aux}
          onChange={(e) => processToggle(e.target.checked,e.target.value)}
        />
        <label className="label-source-small" htmlFor={label}>
          <span className="inner-source-small" />
          <span className="switch-source-small" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
