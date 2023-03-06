import { NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';

const AppNostr = () => {
  let aActiveRelayUrls = [];
  const relays = useSelector((state) => state.nostrSettings.nostrRelays);
  if (relays) {
    const aRelays = Object.keys(relays);
    for (let x=0;x<aRelays.length;x++) {
      if (relays[aRelays[x]].read) {
        aActiveRelayUrls.push(aRelays[x])
      }
    }
  }
  return (
    <NostrProvider relayUrls={aActiveRelayUrls} debug>
      <AppRoutes />
    </NostrProvider>
  );
};

export default AppNostr;
