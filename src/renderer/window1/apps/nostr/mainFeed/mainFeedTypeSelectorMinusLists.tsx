import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { nip19 } from 'nostr-tools';
import { updateMainNostrFeedFilter } from '../../../redux/features/nostr/settings/slice';

const MainFeedTypeSelector = ({aFollowing, aExtendedFollowing, aNostrDevs, aFedWatchers}) => {
  const devMode2 = useSelector((state) => state.myNostrProfile.devModes.devMode2);
  // let devElemClass = 'devElemHide';
  let hideOption = true;
  if (devMode2) {
    // devElemClass = 'devElemShow';
    hideOption = false;
  }

  const dispatch = useDispatch();

  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );

  /*
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aFollowing = [];
  if (myNostrProfile.following) {
    aFollowing = myNostrProfile.following;
  }
  let aExtendedFollowing = [];
  if (myNostrProfile.extendedFollowing) {
    aExtendedFollowing = myNostrProfile.extendedFollowing;
  }
  */

  /*
  let aNostrDevs = [];
  let aNostrDevsNpub = ["npub1gcxzte5zlkncx26j68ez60fzkvtkm9e0vrwdcvsjakxf9mu9qewqlfnj5z","npub1t0nyg64g5vwprva52wlcmt7fkdr07v5dr7s35raq9g0xgc0k4xcsedjgqv"];
  // convert pubkeys from bech32 (npub) to hex
  for (let x=0; x < aNostrDevsNpub.length; x++) {
    const npub = aNostrDevsNpub[x];
    const { type, data } = nip19.decode(npub);
    aNostrDevs.push(data)
  }

  let aFedWatchersNpub = ["npub1a2cww4kn9wqte4ry70vyfwqyqvpswksna27rtxd8vty6c74era8sdcw83a","npub1uyz4w2w4rcphk0q5arzkutrecgscxwzajj4dkvh9mjyqjtxslm6qea8632","npub15dqlghlewk84wz3pkqqvzl2w2w36f97g89ljds8x6c094nlu02vqjllm5m"];
  // convert pubkeys from bech32 (npub) to hex
  let aFedWatchers = [];
  for (let x=0; x < aFedWatchersNpub.length; x++) {
    const npub = aFedWatchersNpub[x];
    const { type, data } = nip19.decode(npub);
    // console.log("qwerty type: "+type+"; npub: "+npub+"; data: "+data)
    aFedWatchers.push(data)
  }
  */


  let followingSelected = false;
  let eFollowingSelected = false;
  let firehoseSelected = false;
  let channelNostrDevelopmentSelected = false;
  let channelFedWatchSelected = false;
  let grapevineSelected = false;
  switch (mainNostrFeedFilter) {
    case 'following':
      followingSelected = true;
      break;
    case 'eFollowing':
      eFollowingSelected = true;
      break;
    case 'firehose':
      firehoseSelected = true;
      break;
    case 'channelNostrDevelopment':
      channelNostrDevelopmentSelected = true;
      break;
    case 'channelFedWatch':
      channelFedWatchSelected = true;
      break;
    case 'grapevine':
      grapevineSelected = true;
      break;
    default:
      firehoseSelected = true;
      break;
  }

  const processMainNostrFeedTypeChange = (newType) => {
    // console.log(`processMainNostrFeedTypeChange: ${newType}`);
    dispatch(updateMainNostrFeedFilter(newType));
    const e = document.getElementById('landingPageButton');
    if (e) {
      e.click();
    }
  };

  let followingClassName = 'block_show';
  if (!followingSelected) {
    followingClassName = 'block_hide';
  }

  let extendedFollowingClassName = 'block_show';
  if (!eFollowingSelected) {
    extendedFollowingClassName = 'block_hide';
  }

  let channelNostrDevelopmentClassName = 'block_show';
  if (!channelNostrDevelopmentSelected) {
    channelNostrDevelopmentClassName = 'block_hide';
  }

  let channelFedWatchClassName = 'block_show';
  if (!channelFedWatchSelected) {
    channelFedWatchClassName = 'block_hide';
  }
  let channelsData = {};

  return (
    <>
      <NavLink
        to="/NostrHome/NostrLandingPage"
        id="landingPageButton"
        style={{ display: 'none' }}
      />
      <div>
        <div
          style={{
            display: 'inline-block',
            marginRight: '10px',
            textDecoration: 'none',
          }}
        >
          <NavLink
            to="/NostrHome/NostrMyFollowingList"
            id="landingPageButton"
            className={followingClassName}
            style={{textDecoration:"none"}}
          >
            following: {aFollowing.length} profiles
          </NavLink>
          <NavLink
            to="/GrapevineHome/GrapevineGraphViewExtendedFollowing"
            id="landingPageButton"
            className={extendedFollowingClassName}
            style={{textDecoration:"none"}}
          >
            extended following: {aExtendedFollowing.length} profiles
          </NavLink>
          <NavLink
            to="/NostrHome/ChannelManagement"
            id="landingPageButton"
            className={channelNostrDevelopmentClassName}
            style={{textDecoration:"none"}}
          >
            Nostr Developers: {aNostrDevs.length} profiles
          </NavLink>
          <NavLink
            to="/NostrHome/ChannelManagement"
            id="landingPageButton"
            className={channelFedWatchClassName}
            style={{textDecoration:"none"}}
          >
            Fed Watchers: {aFedWatchers.length} profiles
          </NavLink>
        </div>

        <select
          id="mainFeedTypeSelector"
          onChange={(e) => processMainNostrFeedTypeChange(e.target.value)}
          style={{fontSize:"22px"}}
        >
          <option value="following" selected={followingSelected}>
            following list
          </option>
          <option value="eFollowing" selected={eFollowingSelected} hidden={hideOption} >
            Extended following list
          </option>
          <option value="firehose" selected={firehoseSelected}>
            firehose
          </option>
          <option value="channelNostrDevelopment" selected={channelNostrDevelopmentSelected}>
            Channel: Nostr Development
          </option>
          <option value="channelFedWatch" selected={channelFedWatchSelected}>
            Channel: Fed Watch
          </option>
          <option value="grapevine" selected={grapevineSelected} hidden={hideOption} >
            grapevine (testnet)
          </option>
        </select>
      </div>
    </>
  );
};
export default MainFeedTypeSelector;
