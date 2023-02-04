import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import { type Event as NostrEvent, getEventHash, signEvent } from 'nostr-tools';
import {
  updateName,
  updateDisplayName,
  updatePictureUrl,
  updateWebsite,
  updateAbout,
  updateNip05,
  updateLud06,
} from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { updateMyActiveNostrProfileInSql } from '../../../lib/pg/sql';

function PublishProfile() {
  const { publish } = useNostr();
  const dispatch = useDispatch();

  const myNostrProfile = useSelector((state) => state.myNostrProfile);

  const onPost = async () => {
    const myPrivkey = myNostrProfile.privkey;
    const myPubkey = myNostrProfile.pubkey_hex;

    if (!myPrivkey) {
      alert('no private key provided');
      // return;
    }
    const oMyNostrProfileInfo = {};

    const e_name = document.getElementById('nameContainer');
    if (e_name) {
      const name = e_name.value;
      if (name) {
        oMyNostrProfileInfo.name = name;
        dispatch(updateName(name));
      }
    }
    const e_display_name = document.getElementById('displayNameContainer');
    if (e_display_name) {
      const display_name = e_display_name.value;
      if (display_name) {
        oMyNostrProfileInfo.display_name = display_name;
        dispatch(updateDisplayName(display_name));
      }
    }
    const e_picture_url = document.getElementById('profilePictureUrlContainer');
    if (e_picture_url) {
      const picture_url = e_picture_url.value;
      if (picture_url) {
        oMyNostrProfileInfo.picture = picture_url;
        dispatch(updatePictureUrl(picture_url));
      }
    }
    const e_website = document.getElementById('websiteContainer');
    if (e_website) {
      const website = e_website.value;
      if (website) {
        oMyNostrProfileInfo.website = website;
        dispatch(updateWebsite(website));
      }
    }
    const e_about = document.getElementById('aboutMeContainer');
    if (e_about) {
      const about = e_about.value;
      if (about) {
        oMyNostrProfileInfo.about = about;
        dispatch(updateAbout(about));
      }
    }
    const e_lud06 = document.getElementById('btcLightningTipsContainer');
    if (e_lud06) {
      const lud06 = e_lud06.value;
      if (lud06) {
        oMyNostrProfileInfo.lud06 = lud06;
        dispatch(updateLud06(lud06));
      }
    }
    const e_nip05 = document.getElementById('nip05VerificationContainer');
    if (e_nip05) {
      const nip05 = e_nip05.value;
      if (nip05) {
        oMyNostrProfileInfo.nip05 = nip05;
        dispatch(updateNip05(nip05));
      }
    }
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

    console.log(`sProfileInfo: ${sProfileInfo}`);
    console.log(`event: ${JSON.stringify(event, null, 4)}`);

    publish(event);
    await updateMyActiveNostrProfileInSql(oMyNostrProfileInfo);
  };
  return (
    <div style={{ marginBottom: '10px' }}>
      <div onClick={onPost} className="doSomethingButton">
        Save & Submit your profile!
      </div>
      * update in redux, and sql, and publish event to nostr relays
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

export default function EditMyProfile() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  return (
    <div>
      <div id="dataFieldsContainer">
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
          <div className="editProfileLeftColContainer">PROFILE PICTURE URL</div>
          <textarea
            id="profilePictureUrlContainer"
            className="editProfileRightColContainer"
            placeholder="https://example.com/pic.jpg"
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
            * Need a way to upload and host an image for your avatar? Here is an
            easy tool:
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
      </div>

      <PublishProfile />

      <div id="successMessageContainer" style={{ fontSize: '14px' }} />
    </div>
  );
}
