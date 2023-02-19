import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NostrMiniProfile from '../components/miniProfile';

const WelcomeBox = () => {
  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = [];
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }
  let followingClassName = 'block_hide';
  if (mainNostrFeedFilter === 'following' && aFollowing.length === 0) {
    followingClassName = 'block_show';
  }

  const aSuggestedProfiles = [
    "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2", // jack
    "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245", // Will
  ];

  return (
    <>
      <div className={followingClassName}>
        <div className="h2">Welcome to Pretty Good nostr!</div>
        <p>
          To get started, follow some profiles. You can search for them by
          public key
          <NavLink
            to="/NostrHome/NostrSearchForUser"
            style={{ marginLeft: '5px' }}
          >
            here
          </NavLink>
          . You will then be able to see their posts on this page. (You can also
          view a completely unfiltered feed by selecting "firehose.")
        </p>
        <p>If you don't know who to follow, here are some suggestions:</p>
        {aSuggestedProfiles.map((pk) => {
          return (
            <>
              <NostrMiniProfile pubkey={pk} />
            </>
          );
        })}
      </div>
    </>
  );
};
export default WelcomeBox;
