import { useSelector } from 'react-redux';

export default function NostrDirectMessagesHelloWorld() {
  // const oProfilesData = useSelector((state) => state.nostrProfiles.nostrProfiles);
  // const aProfiles = Object.keys(oProfilesData);

  const oNostrProfiles = useSelector((state) => state.nostrProfiles);
  const oKind0NostrProfiles = oNostrProfiles.nostrProfiles;
  const oKind3NostrProfiles = oNostrProfiles.kind3NostrProfiles;
  const aKind0Profiles = Object.keys(oKind0NostrProfiles);
  const aKind3Profiles = Object.keys(oKind3NostrProfiles);

  return (
    <div className="reduxStoreOverviewContainer">
      <div className="h4">Nostr Profiles store</div>
      <div>
        num kind0 profiles: <span>{aKind0Profiles.length}</span>
      </div>
      <div>
        num kind3 profiles: <span>{aKind3Profiles.length}</span>
      </div>
    </div>
  );
}
