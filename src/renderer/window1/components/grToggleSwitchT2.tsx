import { useSelector, useDispatch } from 'react-redux';
import { updateNostrGrapevineGeneralSettings } from 'renderer/window1/redux/features/nostr/settings/slice';
/*
export default class ToggleButtonOnOff extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { isOff: false };
  }

  handleClick() {
    this.setState({ isOff: !this.state.isOff });
  }

  render() {
    const { isOff } = this.state;
    const title = this.state.isOff ? 'ON' : 'OFF';
    const className = this.state.isOff
      ? 'grapevineToggleButton grapevineToggleButtonOn'
      : 'grapevineToggleButton grapevineToggleButtonOff';
    return (
      <button type="button" onClick={this.handleClick} className={className}>
        <div style={{ fontSize: '20px' }}>🍇</div>
        <div style={{ fontSize: '10px' }}>{title}</div>
      </button>
    );
  }
}
*/

const ToggleButtonOnOff = ({ }) => {
  const dispatch = useDispatch();
  const initState = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  const title = initState ? 'ON' : 'OFF';
  const className = initState
    ? 'grapevineToggleButton grapevineToggleButtonOn'
    : 'grapevineToggleButton grapevineToggleButtonOff';
  const processToggle = () => {
    // processStateChange(newState);
    const newState = ! initState;
    console.log("processToggle; newState: "+newState)
    const oUpdate = {active: newState }
    dispatch(updateNostrGrapevineGeneralSettings(oUpdate));
  };
  return (
    <div className="grapevineSettingsToggleSwitchContainer" >
      <button value={initState} type="button" onClick={() => processToggle()} className={className}>
        <div style={{ fontSize: '20px' }}>🍇</div>
        <div style={{ fontSize: '10px' }}>{title}</div>
      </button>
    </div>
  );
};

export default ToggleButtonOnOff;

