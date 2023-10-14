import { useDispatch } from 'react-redux';
import { populateChannelByAddrList } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import MiniProfile from 'renderer/window1/apps/nip51/makeNewList/showSingleItem/miniProfile'; // for items on the list

const SinglePersonPanel = ({
  pubkey,
}) => {
  let border = '1px solid grey';
  let backgroundColor = '#EFEFEF';
  return (
    <div style={{
      display: 'flex',
      gap: '5px',
    }}
    >
      <div
        style={{
          flexGrow: '999',
          border,
          borderRadius: '5px',
          marginBottom: '10px',
          backgroundColor,
        }}
      >
        <MiniProfile pubkey={pubkey} />
      </div>
    </div>
  )
}

const ShowPeoplePanel = ({
  peoplePanelState,
  aTags_p,
  naddr,
}) => {
  //////////////////////////////////
  //////////////////////////////////
  const dispatch = useDispatch();
  const aPubkeys = [];
  for (let x=0;x<aTags_p.length;x++) {
    const pk = aTags_p[x][1];
    aPubkeys.push(pk);
  }
  // console.log("populateChannelByAddrList; aPubkeys: "+JSON.stringify(aPubkeys));
  dispatch(populateChannelByAddrList({naddr,aPubkeys}));
  //////////////////////////////////
  //////////////////////////////////

  if (peoplePanelState == 'open') {
    return (
      <>
        <div>
          {aTags_p.map((oPubkey) => {
            return (
              <>
                <SinglePersonPanel
                  pubkey={oPubkey[1]}
                />
              </>
            );
          })}
        </div>
      </>
    );
  }
  return <></>;
};
export default ShowPeoplePanel;
