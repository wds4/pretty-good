import { useDispatch, useSelector } from 'react-redux';
import { addDirectMessageToSqlAndReduxStore } from 'renderer/window1/redux/features/nostr/directMessages/slice';
import { updateExtendedFollowing } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const ExtendedFollowingCalculation = ({  }) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aExtendedFollowing = [];
  const aMyFollowing = myNostrProfile.following;
  const kind3NostrProfiles = useSelector(
    (state) => state.nostrProfiles.kind3NostrProfiles
  );

  if (aMyFollowing) {
    aExtendedFollowing = JSON.parse(JSON.stringify(aMyFollowing));
    /*
    for (let x = 0; x < aMyFollowing.length; x++) {
      const pk = aMyFollowing[x];
      console.log("pk ?: "+pk)
      if (kind3NostrProfiles.hasOwnProperty(pk)) {
        console.log("pk YES: "+pk)
        const kind3Event = kind3NostrProfiles[pk];
        const aTags = kind3Event.tags;

        return (
          <>
            <div>pk: {pk}</div>
          </>
        )
        for (let t = 0; t < aTags.length; t++) {
          const aFoo = aTags[t];
          if (aFoo[0] == 'p') {
            aExtendedFollowing.push(aFoo[1]);
          }
        }

      }
    }
    */
  }
  // dispatch(updateExtendedFollowing(aExtendedFollowing));

  return (
    <>
      <div>ExtendedFollowingCalculatio; aMyFollowing.length: {aMyFollowing.length} aExtendedFollowing.length: {aExtendedFollowing.length} </div>
      {aMyFollowing.map((pk) => {
        let aTags = [];
        if (kind3NostrProfiles.hasOwnProperty(pk)) {
          const kind3Event = kind3NostrProfiles[pk];
          aTags = kind3Event.tags;
        }
        return (
          <>
          <div>pk: {pk}; num tags: {aTags.length}</div>
          </>
        )
      })}
    </>
  );
};

export default ExtendedFollowingCalculation;
