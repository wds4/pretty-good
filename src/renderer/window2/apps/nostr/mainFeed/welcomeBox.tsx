import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateShowWelcomeBox } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import NostrMiniProfile from '../components/miniProfile';

const WelcomeBox = () => {
  const dispatch = useDispatch();
  // const [welcomeBoxClassName, setWelcomeBoxClassName] = useState('block_hide');
  const showWelcomeBox = useSelector(
    (state) => state.myNostrProfile.showWelcomeBox
  );
  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = [];
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }
  let hideWelcomeBoxButtonClassName = 'block_show';
  if (mainNostrFeedFilter === 'following' && aFollowing.length === 0) {
    // setWelcomeBoxClassName('block_show')
    console.log("aFollowing.length: "+aFollowing.length)
    dispatch(updateShowWelcomeBox(true));
    hideWelcomeBoxButtonClassName = 'block_hide';
  }
  let welcomeBoxClassName = 'block_hide';

  if (showWelcomeBox) {
    welcomeBoxClassName = 'block_show';

  }

  const hideWelcomeBox = () => {
    dispatch(updateShowWelcomeBox(false));
  }

  const aSuggestedProfiles = [
    'e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f', // me
    '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2', // jack
    '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245', // Will
    '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d', // fiatjaf
  ];

  return (
    <>
      <div className={welcomeBoxClassName}>
        <div className="h2">Welcome to Pretty Good nostr!</div>
        <div className={hideWelcomeBoxButtonClassName} style={{float:'right',marginRight:'20px'}}>
          hide welcome box:
          <span onClick={()=>hideWelcomeBox()} className="xButton" style={{marginLeft:'5px',border:'1px solid black',padding:'2px'}}>X</span>
        </div>
        <p>
          If you have a private key from another client, you can add it
          <NavLink to="/NostrHome/NostrProfiles" style={{ marginLeft: '5px' }}>
            here
          </NavLink>
          .
        </p>
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
