import { useSelector } from 'react-redux';

export default function NostrSettingsHelloWorld() {
  const oRelaysData = useSelector((state) => state.nostrSettings.nostrRelays);
  const aRelayUrls = Object.keys(oRelaysData);

  return (
    <div className="reduxStoreOverviewContainer">
      <div className="h4">Nostr Settings</div>
      <div>
        num relays: <span>{aRelayUrls.length}</span>
        <div className="storeHelloWorldFullDataContainer"><pre>{JSON.stringify(oRelaysData,null,4)}</pre></div>
      </div>
    </div>
  );
}
