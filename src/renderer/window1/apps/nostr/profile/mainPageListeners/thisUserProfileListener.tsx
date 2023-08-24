import { useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { useNostrEvents } from 'nostr-react';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { updateNostrProfiles } from 'renderer/window1/redux/features/nostr/profiles/slice';
import TechDetailsForNostrNerds1 from '../techDetailsForNostrNerds1';

const ThisUserProfileListener = ({pubkey}) => {
  const dispatch = useDispatch();
  ///// STEP 3 ///// Query network for updated profile information and if found, use that instead, and update redux
  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      since: 0,
      kinds: [0],
    },
  });

  const event = returnMostRecentEvent(events);
  if (event && doesEventValidate(event)) {
    dispatch(updateNostrProfiles(event));
    /*
    event_ = JSON.parse(JSON.stringify(event));
    content = JSON.parse(event.content);
    event_.content = content;
    name = content.name;
    displayName = content.display_name;
    website = content.website;
    about = content.about;
    profilePicUrl = content.picture;
    lnurl = content?.lud06;
    if (lnurl) {
      zapButtonClassName = 'zapButton';
    }
    */
  }
  return (
    <>
      <div style={{display:'none'}}>
        listen for profile updates (follows) (might be redundant bc of userData?)
      </div>
      <TechDetailsForNostrNerds1 events={events} event={event} />
    </>
  )
}
export default ThisUserProfileListener;
