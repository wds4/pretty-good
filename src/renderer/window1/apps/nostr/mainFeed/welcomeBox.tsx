import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

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

  return (
    <>
      <div className={followingClassName}>
        <div className="h2">Welcome to Pretty Good nostr!</div>
      </div>
    </>
  );
};
export default WelcomeBox;
