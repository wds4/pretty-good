import { NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';

const AppNostr = () => {
  const relays = useSelector((state) => state.nostrSettings.nostrRelays);
  return (
    <NostrProvider relayUrls={Object.keys(relays)} debug>
      <AppRoutes />
    </NostrProvider>
  );
};

export default AppNostr;
