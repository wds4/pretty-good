import { useNostr, NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';

const AppNostr = () => {
  const { connectedRelays } = useNostr();
  const oRelaysData = useSelector((state) => state.nostrSettings.nostrRelays);
  return (
    <NostrProvider
      relayUrls={Object.keys(oRelaysData)}
      debug
      autoReconnect={true}
      connectedRelays={connectedRelays}
    >
      <AppRoutes />
    </NostrProvider>
  );
}

export default AppNostr;
