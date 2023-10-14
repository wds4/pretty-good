import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromChannelsByAddrList,
  addToChannelsByAddrList,
  populateChannelByAddrList,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const ChannelButton = ({ naddr, aTags_p }) => {
  const dispatch = useDispatch();
  const autoImportNip51 = useSelector(
    (state) => state.myNostrProfile.autoImportNip51
  );

  const { listsByNaddr } = useSelector(
    (state) => state.myNostrProfile.curatedChannelsData
  );
  const aListsByNaddr = Object.keys(listsByNaddr);

  let buttonClass = 'addToChannelsButton';
  let currentState = 'notFollowing';

  const aPubkeys = [];
  const fooFxn = () => {
    for (let x=0;x<aTags_p.length;x++) {
      const pk = aTags_p[x][1];
      aPubkeys.push(pk);
    }
    // console.log("populateChannelByAddrList; aPubkeys: "+JSON.stringify(aPubkeys));
    // dispatch(populateChannelByAddrList({naddr,aPubkeys}));
  }

  /*
  useEffect(() => {
    console.log("populateChannelByAddrList; aPubkeys: "+JSON.stringify(aPubkeys));
    dispatch(populateChannelByAddrList({naddr,aPubkeys}));
  }, aPubkeys);
  */

  if (aListsByNaddr.includes(naddr)) {
    // I am already using this list as a channel
    buttonClass = 'removeFromChannelsButton';
    currentState = 'following';
    // TODO: update redux store with list of pubkeys
    if (autoImportNip51) {
      // add aTags_p:
      // state.myNostrProfile.curatedChannelsData.listsByNaddr[naddr] = aTags_p
      fooFxn();
    }
  }

  const toggleChannel = (currentState) => {
    let newState = 'following';
    if (currentState == 'following') {
      newState = 'notFollowing';
      dispatch(removeFromChannelsByAddrList(naddr));
    }
    if (currentState == 'notFollowing') {
      newState = 'following';
      dispatch(addToChannelsByAddrList(naddr));
    }
  };

  return (
    <>
      <button
        type="button"
        value={currentState}
        onClick={({ target: { value } }) => toggleChannel(value)}
        className={buttonClass}
      />
    </>
  );
};
export default ChannelButton;
