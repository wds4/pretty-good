import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import MiniProfile from './miniProfile';
import { noProfilePicUrl } from 'renderer/window1/const';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';

export default function FollowingList() {
  const [searchString, setSearchString] = useState("");
  const pubkey = useSelector(
    (state) => state.nostrSettings.nostrProfileFocus
  );
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let name = "?";
  let displayName = "?";
  let avatarUrl = noProfilePicUrl;
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    const profileContent = JSON.parse(nostrProfiles[pubkey].content);
    name = profileContent.name;
    displayName = profileContent.display_name;
    if (profileContent.picture) {
      avatarUrl = profileContent.picture;
    } else {
      avatarUrl = BlankAvatar;
    }
  }

  const devMode = useSelector((state) => state.myNostrProfile.devModes.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [3],
    },
  });
  console.log(
    `FollowingList; ... events.length: ${events.length}; pubkey: ${pubkey}`
  );
  return (
    <>
    <div>kind: 3 events</div>
    <div>numer of events detected: {events.length}</div>
    <div style={{textAlign: 'left'}}>{JSON.stringify(events,null,4)}</div>
    </>
  )
  {events.map((event)=>{
    return (
      <>
      <div>HELLO</div>
      <div>{JSON.stringify(event,null,4)}</div>
      </>
    )
  })}
}
