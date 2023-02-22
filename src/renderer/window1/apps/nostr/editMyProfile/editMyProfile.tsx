import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix, useNostrEvents, useProfile } from 'nostr-react';
import { type Event as NostrEvent, getEventHash, signEvent } from 'nostr-tools';
import {
  updateName,
  updateDisplayName,
  updatePictureUrl,
  updateBannerUrl,
  updateWebsite,
  updateAbout,
  updateNip05,
  updateLud06,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { returnMostRecentEvent } from 'renderer/window1/lib/nostr';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateMyActiveNostrProfileInSql } from '../../../lib/pg/sql';
import ToggleMultiClientAccess from './toggleMultiClientAccess';

function PublishProfile() {
  const { publish } = useNostr();
  const dispatch = useDispatch();

  const myNostrProfile = useSelector((state) => state.myNostrProfile);

  const onPost = async (broadcast) => {
    const myPrivkey = myNostrProfile.privkey;
    const myPubkey = myNostrProfile.pubkey_hex;

    if (!myPrivkey) {
      alert('no private key provided');
      // return;
    }
    const oMyNostrProfileInfo = {};

    const e_name = document.getElementById('nameContainer');
    let name = '';
    if (e_name) {
      name = e_name.value;
    }
    oMyNostrProfileInfo.name = name;
    dispatch(updateName(name));

    const e_display_name = document.getElementById('displayNameContainer');
    let display_name = '';
    if (e_display_name) {
      display_name = e_display_name.value;
    }
    oMyNostrProfileInfo.display_name = display_name;
    dispatch(updateDisplayName(display_name));

    const e_picture_url = document.getElementById('profilePictureUrlContainer');
    let picture_url = '';
    if (e_picture_url) {
      picture_url = e_picture_url.value;
    }
    oMyNostrProfileInfo.picture = picture_url;
    dispatch(updatePictureUrl(picture_url));

    const e_banner_url = document.getElementById('bannerUrlContainer');
    let banner_url = '';
    if (e_banner_url) {
      banner_url = e_banner_url.value;
    }
    oMyNostrProfileInfo.banner = banner_url;
    dispatch(updateBannerUrl(banner_url));

    const e_website = document.getElementById('websiteContainer');
    let website = '';
    if (e_website) {
      website = e_website.value;
    }
    oMyNostrProfileInfo.website = website;
    dispatch(updateWebsite(website));

    const e_about = document.getElementById('aboutMeContainer');
    let about = '';
    if (e_about) {
      about = e_about.value;
    }
    oMyNostrProfileInfo.about = about;
    dispatch(updateAbout(about));

    const e_lud06 = document.getElementById('btcLightningTipsContainer');
    let lud06 = '';
    if (e_lud06) {
      lud06 = e_lud06.value;
      // lud06 = e_lud06.value ? e_lud06.value : "";
    }
    oMyNostrProfileInfo.lud06 = lud06;
    dispatch(updateLud06(lud06));

    const e_nip05 = document.getElementById('nip05VerificationContainer');
    let nip05 = '';
    if (e_nip05) {
      nip05 = e_nip05.value;
    }
    oMyNostrProfileInfo.nip05 = nip05;
    dispatch(updateNip05(nip05));

    const sProfileInfo = JSON.stringify(oMyNostrProfileInfo);

    const event: NostrEvent = {
      content: sProfileInfo,
      kind: 0,
      tags: [],
      created_at: dateToUnix(),
      pubkey: myPubkey,
    };
    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    console.log(`sProfileInfo: ${sProfileInfo}; broadcast: ${broadcast}`);
    console.log(`event: ${JSON.stringify(event, null, 4)}`);

    if (broadcast) {
      publish(event);
    }
    await updateMyActiveNostrProfileInSql(oMyNostrProfileInfo);
  };
  return (
    <div style={{ marginBottom: '10px' }}>
      <div>
        <div onClick={() => onPost(true)} className="doSomethingButton">
          Save & Submit your profile!
        </div>
        * update in redux, and sql, and publish event to nostr relays
      </div>
      <div>
        <div onClick={() => onPost(false)} className="doSomethingButton">
          Save your profile! (local storage only)
        </div>
        * update in redux and sql, but do not publish event to nostr relays
      </div>
      <div
        id="newEventContainer"
        className="newEventContainer"
        style={{ display: 'none' }}
      >
        newEventContainer
      </div>
    </div>
  );
}

const EditMyProfile = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const myPubkey = myNostrProfile.pubkey_hex;

  // const { data: userData } = useProfile({
  // myPubkey,
  // });
  // const name = userData?.name
  // const e1 = document.getElementById("nameContainer")
  // e1.value = name;

  const { events } = useNostrEvents({
    filter: {
      authors: [myPubkey],
      since: 0, // all new events from now
      kinds: [0],
    },
  });
  const event = returnMostRecentEvent(events);
  let _name = '?';
  let _displayName = '?';
  let _website = '?';
  let _about = '?';
  let _profilePicUrl = '?';
  let _bannerUrl = '?';
  let _btcLightningTips = '?';
  let _nip05Verification = '?';
  if (event && doesEventValidate(event)) {
    const content = JSON.parse(event.content);
    _name = content.name;
    _displayName = content.display_name;
    _website = content.website;
    _about = content.about;
    _profilePicUrl = content.picture;
    _bannerUrl = content.banner;
    _btcLightningTips = content.lud06;
    _nip05Verification = content.nip05;
  }
  const e1 = document.getElementById('nameContainer');
  const e2 = document.getElementById('displayNameContainer');
  const e3 = document.getElementById('websiteContainer');
  const e4 = document.getElementById('aboutMeContainer');
  const e5 = document.getElementById('profilePictureUrlContainer');
  const e6 = document.getElementById('btcLightningTipsContainer');
  const e7 = document.getElementById('nip05VerificationContainer');
  const e8 = document.getElementById('bannerUrlContainer');

  const retrieveProfileFromNetwork = async () => {
    console.log(`retrieveProfileFromNetwork; myPubkey: ${myPubkey}`);
    e1.value = _name;
    e2.value = _displayName;
    e3.value = _website;
    e4.value = _about;
    e5.value = _profilePicUrl;
    e6.value = _btcLightningTips;
    e7.value = _nip05Verification;
    e8.value = _bannerUrl;
  };

  const clearFields = () => {
    e1.value = '';
    e2.value = '';
    e3.value = '';
    e4.value = '';
    e5.value = '';
    e6.value = '';
    e7.value = '';
    e8.value = '';
  };

  return (
    <div>
      <div
        id="clearFieldsButton"
        onClick={clearFields}
        className="doSomethingButton"
      >
        clear all fields
      </div>
      <div
        id="downloadProfileButton"
        onClick={retrieveProfileFromNetwork}
        className="doSomethingButton"
      >
        retrieve profile from network
      </div>
      <br />
      <br />
      <div id="dataFieldsContainer">
        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">PROFILE PICTURE URL</div>
          <textarea
            id="profilePictureUrlContainer"
            className="editProfileRightColContainer"
            placeholder="https://example.com/pic.jpg"
            style={{
              height: '60px',
            }}
          >
            {myNostrProfile.picture_url}
          </textarea>
          <div
            className="editProfileRightColContainer"
            style={{
              maxWidth: '275px',
              color: 'grey',
              fontStyle: 'italic',
              fontSize: '12px',
            }}
          >
            * Need a way to upload and host an image for your profile or
            banner pics? Here is an easy tool:
            <a
              href="http://nostr.build"
              target="_blank"
              style={{ marginLeft: '5px' }}
              rel="noreferrer"
            >
              nostr.build
            </a>
          </div>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">BANNER URL</div>
          <textarea
            id="bannerUrlContainer"
            className="editProfileRightColContainer"
            placeholder="https://example.com/pic.jpg"
            style={{
              height: '60px',
            }}
          >
            {myNostrProfile.banner}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">NAME (username)</div>
          <textarea
            id="nameContainer"
            className="editProfileRightColContainer"
            placeholder="Satoshi Nakamoto"
          >
            {myNostrProfile.name}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">DISPLAY NAME</div>
          <textarea
            id="displayNameContainer"
            className="editProfileRightColContainer"
            placeholder="satoshi"
          >
            {myNostrProfile.display_name}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">WEBSITE</div>
          <textarea
            id="websiteContainer"
            className="editProfileRightColContainer"
            placeholder="https://www.bitcointalk.org"
          >
            {myNostrProfile.website}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">ABOUT ME</div>
          <textarea
            id="aboutMeContainer"
            className="editProfileRightColContainer"
            placeholder="inventor of bitcoin"
          >
            {myNostrProfile.about}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">
            BITCOIN LIGHTNING TIPS
          </div>
          <textarea
            id="btcLightningTipsContainer"
            className="editProfileRightColContainer"
            placeholder="Lightning Address of LNURL"
          >
            {myNostrProfile.lud06}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">NIP05 VERIFICATION</div>
          <textarea
            id="nip05VerificationContainer"
            className="editProfileRightColContainer"
            placeholder="jb55@jb55.com"
          >
            {myNostrProfile.nip05}
          </textarea>
        </div>

        <div className="editProfileFieldContainer">
          <div className="editProfileLeftColContainer">MULTI CLIENT ACCESS</div>
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <ToggleMultiClientAccess />
          </div>
          <div
            style={{
              display: 'inline-block',
              marginLeft: '10px',
              maxWidth: '600px',
              color: 'grey',
              fontStyle: 'italic',
              fontSize: '12px',
            }}
          >
            If you plan to make use of this profile from multiple clients (but don't have nip05 set up), this mode will automatically import and
            update your active profile settings, including following list, from the nostr network. Experimental; may result in loss of data.
          </div>
        </div>
      </div>

      <PublishProfile />

      <div id="successMessageContainer" style={{ fontSize: '14px' }} />
    </div>
  );
};

export default EditMyProfile;
