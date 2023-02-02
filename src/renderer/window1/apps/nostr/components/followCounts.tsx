import { NavLink } from 'react-router-dom';
import { useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const FollowCounts = ({ pubkey }) => {
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0, // all new events from now
      kinds: [3],
    },
  });
  let aFollowing = [];
  if (events.length > 0) {
    const event = returnMostRecentEvent(events);
    if (event && doesEventValidate(event)) {
      if (event.hasOwnProperty('tags')) {
        aFollowing = event.tags;
      }
    }
  }
  return (
    <>
      <div className="followCountContainer">
        <NavLink className="followsNavLink" to="/NostrHome/NostrFollowingList">
          <div style={{ display: 'inline-block', marginRight: '5px' }}>
            {aFollowing.length}
          </div>
          following
        </NavLink>
        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
          <div style={{ display: 'inline-block', marginRight: '5px' }}>?</div>
          followers
        </div>
        <NavLink
          className="followsNavLink"
          to="/NostrHome/NostrUserRelaysList"
          style={{ marginLeft: '10px' }}
        >
          <div style={{ display: 'inline-block', marginRight: '5px' }}>?</div>
          relays
        </NavLink>
      </div>
    </>
  );
};
export default FollowCounts;
