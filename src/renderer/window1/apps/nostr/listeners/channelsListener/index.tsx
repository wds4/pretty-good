import { useSelector } from 'react-redux';
import ChannelsListenerToggle from './channelsListenerToggle';
import ChannelsMasterFilter from './channelsMasterFilter';

const ChannelsListener = () => {
  const activateChannelsBackgroundListener = useSelector(
    (state) => state.channelsSettings.activateChannelsBackgroundListener
  );

  if (activateChannelsBackgroundListener) {
    return (
      <>
        <div className="curatedListsListenerStatusContainer">
          <div style={{ display: 'inline-block', marginBottom: '2px'}}>
            CHANNELS
            <br />
            LISTENERS: ON
          </div>
          <div style={{display: 'inline-block', marginLeft: '3px', paddingRight:'2px'}}>
            <i>(toggle off if app<br/>is running hot)</i>
          </div>

          <br />
          <div style={{ display: 'inline-block' }}>
            <ChannelsListenerToggle />
          </div>
        </div>

        <div style={{ maxHeight: '500px' }}>
          <ChannelsMasterFilter />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="curatedListsListenerStatusContainer">
        <div style={{ display: 'inline-block', marginBottom: '2px' }}>
          CHANNELS
          <br />
          LISTENERS: OFF
        </div>
        <br />
        <div style={{ display: 'inline-block' }}>
          <ChannelsListenerToggle />
        </div>
      </div>

    </>
  );
};

export default ChannelsListener;
