import { useNostr, NostrProvider } from 'nostr-react';
import { useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';

const AppNostr = () => {
  const { connectedRelays, onDisconnect } = useNostr();
  const oRelaysData = useSelector((state) => state.nostrSettings.nostrRelays);
  /*
  const onDisconnectCallback = (relay) => {
    console.log("qwerty onDisconnectCallback from AppNostr")
    setTimeout(() => {
      relay
        .connect()
        .then(() => console.log(`qwerty reconnected: ${relay.url}`))
        .catch(() => console.log(`qwerty unable to reconnect: ${relay.url}`));
    }, 30000);

  };
  */
  onDisconnect(() => {
    console.log("qwerty onDisconnect, AppNostr component")
  });


  return (
    <NostrProvider
      relayUrls={Object.keys(oRelaysData)}
      debug
    >
      <AppRoutes />
    </NostrProvider>
  );
}

export default AppNostr;
