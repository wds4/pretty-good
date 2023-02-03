import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateMainNostrFeedFilter } from '../../../redux/features/nostr/settings/slice';

const MainFeedTypeSelector = () => {
  const dispatch = useDispatch();

  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );

  let followingSelected = false;
  let eFollowingSelected = false;
  let firehoseSelected = false;
  let grapevineSelected = false;
  switch (mainNostrFeedFilter) {
    case 'following':
      followingSelected = true;
      break;
    case 'eFollowing':
      eFollowingSelected = true;
      break;
    case 'firehose':
      firehoseSelected = true;
      break;
    case 'grapevine':
      grapevineSelected = true;
      break;
    default:
      firehoseSelected = true;
      break;
  }

  const processMainNostrFeedTypeChange = (newType) => {
    console.log(`processMainNostrFeedTypeChange: ${newType}`);
    dispatch(updateMainNostrFeedFilter(newType));
    const e = document.getElementById("landingPageButton");
    if (e) {
      e.click();
    }
  }

  return (
    <>
      <NavLink
        to="/NostrHome/NostrLandingPage"
        id="landingPageButton"
        style={{ display: 'none' }}
      />
      <div>
        <select
          id="mainFeedTypeSelector"
          onChange={(e) => processMainNostrFeedTypeChange(e.target.value)}
        >
          <option value="following" selected={followingSelected}>
            following list
          </option>
          <option value="eFollowing" selected={eFollowingSelected}>
            Extended following list
          </option>
          <option value="firehose" selected={firehoseSelected}>
            firehose
          </option>
          <option value="grapevine" selected={grapevineSelected}>
            grapevine
          </option>
        </select>
      </div>
    </>
  );
};
export default MainFeedTypeSelector;
