import { NavLink } from 'react-router-dom';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from '../../../redux/features/nostr/settings/slice';

const SearchForUser = () => {
  const dispatch = useDispatch();

  // const { type, data } = nip19.decode(userNpub);
  const e1 = document.getElementById("userPubkey")
  const e2 = document.getElementById("userNpub")

  let npub = null;
  const processNewNpub = () => {
    const e1 = document.getElementById("userPubkey")
    const e2 = document.getElementById("userNpub")
    if (e2) {
      npub = e2.value;
      try {
        const { type, data } = nip19.decode(npub);
        if (type=="npub") {
          e1.value = data;
        }
      } catch (err) {}
    }
  }

  const processNewPubkey = () => {
    // may not need this function; or may check for validity of entered value?
  }

  return (
    <>
      <div>Enter a pubkey:</div>
      <textarea
        id="userPubkey"
        onChange={processNewPubkey}
        style={{ width: '80%', height: '40px' }}
      />

      <div>Enter a public account id (starts with npub):</div>
      <textarea
        id="userNpub"
        onChange={processNewNpub}
        style={{ width: '80%', height: '40px' }}
      />

      <br />

      <div className="doSomethingButton">
        <NavLink
          onClick={() => {
            const e1 = document.getElementById("userPubkey")
            if (e1) {
              const pk = e1.value;
              dispatch(updateNostrProfileFocus(pk));
            }
          }}
          to={{
            pathname: '/NostrHome/NostrViewProfile',
            state: { pubkey: null },
          }}
          id="navLinkElem"
          className="goToUserProfileButton"
        >
          Search
        </NavLink>
      </div>
    </>
  );
};

export default SearchForUser;
