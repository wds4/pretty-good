import { useSelector, useDispatch } from 'react-redux';
import {
  setTwoBackSteps,
  setCurrentPage,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
import MainFeedTypeSelector from './mainFeedTypeSelector';
import WelcomeBox from './welcomeBox';
import GlobalFeed from './globalFeed';
import SourceToggleSwitch from './components/sourceToggleSwitch';

const GlobalFeedPre = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const aExtendedFollowing = myNostrProfile.extendedFollowing;
  const dispatch = useDispatch();
  dispatch(setTwoBackSteps());
  dispatch(setCurrentPage('mainFeed'));
  /*
  // This toggle switch is being moved to settings.
  <div style={{ marginBottom: '5px' }}>
    <SourceToggleSwitch />
  </div>
  */
  return (
    <>
      <div style={{ position: 'relative', height: '40px' }}>
        <div className="mainFeedTypeSelector">
          <MainFeedTypeSelector
            following={aFollowing}
            extendedFollowing={aExtendedFollowing}
          />
        </div>
      </div>
      <WelcomeBox />
      <GlobalFeed
        aFollowing={aFollowing}
        aExtendedFollowing={aExtendedFollowing}
      />
    </>
  );
};

export default GlobalFeedPre;
