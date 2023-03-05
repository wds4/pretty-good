import { useSelector } from 'react-redux';
import MiniProfile from './miniProfile';

const FollowingForRelays = () => {
  const oKind3ProfilesData = useSelector(
    (state) => state.nostrProfiles.kind3NostrProfiles
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aProfiles = myNostrProfile.endorseAsRelaysPicker;
  const oRecRelays = {};
  const aRecRelays = [];
  for (let r = 0; r < aProfiles.length; r++) {
    const pk = aProfiles[r];
    if (oKind3ProfilesData.hasOwnProperty(pk)) {
      const oKind3Event = oKind3ProfilesData[pk];
      if (oKind3Event.hasOwnProperty('content') && oKind3Event.content) {
        const oRelays = JSON.parse(oKind3Event.content);
        oRecRelays[pk] = oRelays;
        const aRelays = Object.keys(oRelays);
        for (let x = 0; x < aRelays.length; x++) {
          const url = aRelays[x];
          if (!aRecRelays.includes(url)) {
            aRecRelays.push(url);
          }
        }
      }
    }
  }
  return (
    <>
      <div style={{ width: '100%', border: '1px dashed grey', padding: '5px' }}>
        <div className="h4">Endorse Relay Lists</div>
        list of the profiles whose relay lists I endorse; number:{' '}
        {aProfiles.length}
        <div>
          {aProfiles.map((pk) => {
            return (
              <>
                <div>
                <MiniProfile pubkey={pk} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FollowingForRelays;
