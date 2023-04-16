import { useDispatch, useSelector } from 'react-redux';
import SourceToggleSwitch from '../../mainFeed/components/sourceToggleSwitch';
import SinceWhenSelectors from './sinceWhenSelectors';

const MainFeedSettings = ({}) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aExtendedFollowing = [];
  const aMyFollowing = myNostrProfile.following;
  const kind3NostrProfiles = useSelector(
    (state) => state.nostrProfiles.kind3NostrProfiles
  );
  return (
    <>
      <div style={{ marginBottom: '5px' }}>
        <SourceToggleSwitch />
      </div>
      <SinceWhenSelectors mainFeedName="following" />
      <SinceWhenSelectors mainFeedName="eFollowing" />
      <SinceWhenSelectors mainFeedName="firehose" />
    </>
  );
};

export default MainFeedSettings;
