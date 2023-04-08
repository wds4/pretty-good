import { useSelector } from 'react-redux';

export default function NostrDirectMessagesHelloWorld() {
  const oProfilesData = useSelector((state) => state.nostrProfiles.nostrProfiles);
  const aProfiles = Object.keys(oProfilesData);

  return (
    <div className="reduxStoreOverviewContainer">
      <div className="h4">Nostr Profiles store</div>
      <div>
        num profiles: <span>{aProfiles.length}</span>
      </div>
    </div>
  );
}
