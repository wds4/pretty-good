import { useSelector } from 'react-redux';
import { useProfile } from 'nostr-react';
import { nip19 } from 'nostr-tools';

const About = ({ pubkey }) => {
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  const npub = nip19.npubEncode(pubkey);

  /// // STEP 1 ///// First load default profile info
  let about = '';
  let website = '';

  /// // STEP 2 ///// If already present in redux store, replace with that
  let profileContent = {};
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    profileContent = JSON.parse(nostrProfiles[pubkey].content);
    about = profileContent.about;
    website = profileContent.website;
  }

  /// // alternate step 3
  const { data: userData } = useProfile({
    pubkey,
  });

  return (
    <>
      <center>
        <div
          style={{
            width: '80%',
            padding: '10px',
            marginTop: '10px',
            marginBottom: '5px',
            textAlign: 'left',
          }}
        >
          <div className="userProfilePubkeyContainer">
            pubkey (hex): {pubkey}
            <br />
            pubkey (bech32): {npub}
          </div>
          <a href={website} target="_blank">{website}</a>
        </div>
        <div
          style={{
            width: '80%',
            height: '200px',
            overflow: 'auto',
            padding: '10px',

            background: 'white',
            textAlign: 'left',
          }}
        >
          {about}
        </div>
      </center>
    </>
  );
};

export default About;
