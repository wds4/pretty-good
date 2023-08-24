import { useSelector } from 'react-redux';
import EndorsementListener from "./endorsementListener";
import ThisUserProfileListener from "./thisUserProfileListener";

// This selects whether to listen to the nostr network for updates:
// 1. to the user profile being viewed (ThisUserProfileListener), versus:
// 2. updates to endorsements by me (EndorsementListener)
// (Too many listeners seem to interfere with each other  ... )
const SelectListener = ({pubkey}) => {
  const isNostrGrapevineOn = useSelector((state) => state.nostrSettings.nostrGrapevineSettings.active);
  if (!isNostrGrapevineOn) {
    return (
      <>
        <ThisUserProfileListener pubkey={pubkey} />
      </>
    )
  }
  return (
    <>
      <EndorsementListener pubkey={pubkey} />
    </>
  )
}
export default SelectListener;
