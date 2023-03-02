import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateMainNostrFeedFilter } from '../../../redux/features/nostr/settings/slice';

const MainFeedTypeSelector = () => {
  const dispatch = useDispatch();

  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = [];
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }

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
    const e = document.getElementById('landingPageButton');
    if (e) {
      e.click();
    }
  };
  let followingClassName = 'block_show';
  if (!followingSelected) {
    followingClassName = 'block_hide';
  }

  return (
    <>
      <NavLink
        to="/NostrHome/NostrLandingPage"
        id="landingPageButton"
        style={{ display: 'none' }}
      />
      <div>
        <div
          style={{
            display: 'inline-block',
            marginRight: '10px',
            textDecoration: 'none',
          }}
        >
          <NavLink
            to="/NostrHome/NostrMyFollowingList"
            id="landingPageButton"
            className={followingClassName}
            style={{textDecoration:"none"}}
          >
            following: {aFollowing.length} profiles
          </NavLink>
        </div>

        <select
          id="mainFeedTypeSelector"
          onChange={(e) => processMainNostrFeedTypeChange(e.target.value)}
        >
          <option value="following" selected={followingSelected}>
            following list
          </option>
          <option value="eFollowing" selected={eFollowingSelected} style={{display:"none"}}>
            Extended following list
          </option>
          <option value="firehose" selected={firehoseSelected}>
            firehose
          </option>
          <option value="grapevine" selected={grapevineSelected}>
            grapevine (testnet)
          </option>
        </select>
      </div>
    </>
  );
};
export default MainFeedTypeSelector;
