import { useSelector, useDispatch } from 'react-redux';
import { nip19, generatePrivateKey, getPublicKey } from 'nostr-tools';
import { addNewRowToMyNostrProfileInSql } from '../../../../lib/pg/sql';

export default function GenerateNewKeys() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  const generateNewKeys = () => {
    const e = document.getElementById('newKeysContainer');
    if (e) {
      e.style.display = 'block';
      const privkeyNew = generatePrivateKey(); // `sk` is a hex string
      const pubkeyHexNew = getPublicKey(privkeyNew); // `pk` is a hex string
      const pubkeyBech32New = nip19.npubEncode(pubkeyHexNew);
      const nameNew = "newUser_"+pubkeyHexNew.substr(-6);
      const displayNameNew = "New User "+pubkeyHexNew.substr(-6);
      const e1 = document.getElementById('pkHexNewContainer');
      const e2 = document.getElementById('pkBech32NewContainer');
      const e3 = document.getElementById('privkeyNewShownElem');
      const e4 = document.getElementById('nameNewContainer');
      const e5 = document.getElementById('displayNameNewContainer');
      if (e1) {
        e1.innerHTML = pubkeyHexNew;
      }
      if (e2) {
        e2.innerHTML = pubkeyBech32New;
      }
      if (e3) {
        e3.innerHTML = privkeyNew;
      }
      if (e4) {
        e4.value = nameNew;
      }
      if (e5) {
        e5.value = displayNameNew;
      }
    }
  };

  const showNewPrivkey = () => {
    const e1 = document.getElementById('privkeyNewHiddenElem');
    const e2 = document.getElementById('privkeyNewShownElem');
    if (e1 && e2) {
      e2.style.display = 'block';
      e1.style.display = 'none';
    }
  };

  const saveNewPrivkey = async () => {
    const e1 = document.getElementById('pkHexNewContainer');
    const e2 = document.getElementById('pkBech32NewContainer');
    const e3 = document.getElementById('privkeyNewShownElem');
    const e4 = document.getElementById('nameNewContainer');
    const e5 = document.getElementById('displayNameNewContainer');

    if (e1 && e2 && e3 && e4 && e5) {
      const pubkeyHex = e1.innerHTML;
      // const pubkeyBech32 = e2.innerHTML;
      const privkey = e3.innerHTML;
      const name = e4.value;
      const display_name = e5.value;
      const result = await addNewRowToMyNostrProfileInSql(pubkeyHex, privkey, name, display_name);
      console.log(`result: ${result}`);

      const e = document.getElementById('savedKeysMessageContainer');
      if (e) {
        e.innerHTML = 'keys saved';
      }
    }
  };

  return (
    <div className="infoBox">
      <div className="h4">Generate a New Set of Profile Keys</div>
      <br />
      <button
        id="generateNewKeysButton"
        className="doSomethingButton"
        type="button"
        onClick={generateNewKeys}
      >
        generate new keys
      </button>
      <div id="newKeysContainer" style={{ display: 'none' }}>
        <div style={{ marginBottom: '10px' }}>
          new pubkey (hex): <span id="pkHexNewContainer" />
          <br />
          new pubkey (bech32): <span id="pkBech32NewContainer" />
          <br />
          new name: <textarea style={{height:'25px', width: '50%'}} id="nameNewContainer" />
          <br />
          new display name: <textarea style={{height:'25px', width: '50%'}} id="displayNameNewContainer" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <button
            id="showNewPrivkeyButton"
            className="doSomethingButton"
            type="button"
            onClick={showNewPrivkey}
          >
            Show new privkey (caution!)
          </button>
          <div
            id="privkeyNewHiddenElem"
            style={{
              border: '1px solid black',
              width: '90%',
              height: '40px',
              padding: '10px',
            }}
          >
            new privkey (hidden)
          </div>
          <div
            id="privkeyNewShownElem"
            style={{
              border: '1px solid black',
              width: '90%',
              height: '40px',
              padding: '10px',
              display: 'none',
            }}
          >
            new privkey (shown)
          </div>
        </div>
        <button
          id="saveNewKeysButton"
          className="doSomethingButton"
          type="button"
          onClick={saveNewPrivkey}
        >
          Save new keys in sql
        </button>

        <div id="savedKeysMessageContainer" />
      </div>
    </div>
  );
}
