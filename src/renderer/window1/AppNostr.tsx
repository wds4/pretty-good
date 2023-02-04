import { NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';

const AppNostr = () => {
  const oRelaysData = useSelector((state) => state.nostrSettings.nostrRelays);
  return (
    <NostrProvider relayUrls={Object.keys(oRelaysData)} debug autoReconnect={true}>
      <pre>{JSON.stringify(Object.keys(oRelaysData),null,4)}</pre>
      <AppRoutes />
    </NostrProvider>
  );
}

export default AppNostr;
