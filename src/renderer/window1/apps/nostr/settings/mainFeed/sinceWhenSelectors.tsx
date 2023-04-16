import { useDispatch, useSelector } from 'react-redux';
import {
  updateNostrMainFeedFilterSettings,
  restoreDefaultNostrMainFeedFilterSettings,
} from 'renderer/window1/redux/features/nostr/settings/slice';

const SinceWhenSelectors = ({ mainFeedName }) => {
  const dispatch = useDispatch();
  const nostrMainFeedFilterSettings = useSelector(
    (state) => state.nostrSettings.nostrMainFeedFilterSettings
  );
  const { days, hours, minutes } = nostrMainFeedFilterSettings[mainFeedName];
  const selectorUpdate = (e) => {
    const selectorID = e.target.id;
    const newValue = e.target.value;
    const feedName = e.target.dataset.feed;
    const timeUnit = e.target.dataset.timeunit;
    console.log(
      `selectorUpdate; feedName: ${feedName}; timeUnit: ${timeUnit}; newValue: ${newValue}`
    );
    dispatch(
      updateNostrMainFeedFilterSettings({ newValue, feedName, timeUnit })
    );
  };
  const resetDefaults = (e) => {
    const feedName = e.target.dataset.feed;
    console.log(`resetDefaults; feedName: ${feedName};`);
    dispatch(restoreDefaultNostrMainFeedFilterSettings({ feedName }));
  };
  return (
    <>
      <div
        style={{ border: '1px solid black', padding: '5px', margin: '10px' }}
      >
        <div style={{ marginBottom: '10px' }}>
          <span style={{ color: 'grey' }}>filter: </span>
          {mainFeedName}
        </div>
        <div style={{ marginBottom: '10px' }}>
          Shows messages created within the past {days} days, {hours} hours, {minutes} minutes
        </div>
        <div>
          <div style={{ display: 'inline-block', width: '40px' }}>
            <select
              className="mainFeedTimeWindowSelector"
              id="following_days_selector"
              data-feed={mainFeedName}
              data-timeunit="days"
              onChange={(e) => {
                selectorUpdate(e);
              }}
              value={days}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            days
          </div>
        </div>
        <div>
          <div style={{ display: 'inline-block', width: '40px' }}>
            <select
              className="mainFeedTimeWindowSelector"
              id="following_days_selector"
              data-feed={mainFeedName}
              data-timeunit="hours"
              onChange={(e) => {
                selectorUpdate(e);
              }}
              value={hours}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
            </select>
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            hours
          </div>
        </div>
        <div>
          <div style={{ display: 'inline-block', width: '40px' }}>
            <select
              className="mainFeedTimeWindowSelector"
              id="following_days_selector"
              data-feed={mainFeedName}
              data-timeunit="minutes"
              onChange={(e) => {
                selectorUpdate(e);
              }}
              value={minutes}
            >
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
            </select>
          </div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            minutes
          </div>
        </div>
        <button
          type="button"
          className="doSomethingButton"
          data-feed={mainFeedName}
          onClick={(e) => {
            resetDefaults(e);
          }}
        >
          reset defaults
        </button>
      </div>
    </>
  );
};

export default SinceWhenSelectors;
