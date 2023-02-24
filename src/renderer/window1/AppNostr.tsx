import { NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import { aDefaultRelayUrls } from 'main/const/nostr';

const AppNostr = () => {
  const relays = useSelector((state) => state.nostrSettings.nostrRelays);
  return (
    <NostrProvider relayUrls={Object.keys(relays)} debug>
      number of active relayUrls: {Object.keys(relays).length}
      <AppRoutes />
    </NostrProvider>
  );
};

export default AppNostr;
