import { useSelector, useDispatch } from 'react-redux';
import { nip19, getPublicKey } from 'nostr-tools';
import { addNewRowToMyNostrProfileInSql } from '../../../../lib/pg/sql';

export default function EnterExternalKeys() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  const e1 = document.getElementById('outsidePubkeyHex');
  const e2 = document.getElementById('outsidePubkeyBech32');
  const e3 = document.getElementById('outsidePrivkeyHex');
  const e4 = document.getElementById('outsidePrivkeyBech32');

  const saveKeysToSql = async () => {
    if (e1 && e3) {
      const pubkeyHex = e1.value;
      const privkey = e3.value;
      // console.log(`saveKeysToSql clicked; pubkeyHex: ${pubkeyHex}`);
      const result = await addNewRowToMyNostrProfileInSql(pubkeyHex, privkey);
      console.log(`result: ${result}`);

      const e = document.getElementById('savedKeysGeneratedElsewhereMessageContainer');
      if (e) {
        e.innerHTML = 'keys saved';
      }
    }
  };

  const processNewPrivkeyHex = () => {
    if (e3) {
      const privkeyHex = e3.value;
      try {
        const privkeyBech32 = nip19.nsecEncode(privkeyHex);
        const derivedPubkeyHex = getPublicKey(privkeyHex);
        const derivedPubkeyBech32 = nip19.npubEncode(derivedPubkeyHex);
        console.log(
          `processNewPrivkeyHex changed; privkeyHex: ${privkeyHex}; privkeyBech32: ${privkeyBech32}; derivedPubkeyHex: ${derivedPubkeyHex}; derivedPubkeyBech32: ${derivedPubkeyBech32}`
        );
        if (e1) {
          e1.innerHTML = derivedPubkeyHex;
        }
        if (e2) {
          e2.innerHTML = derivedPubkeyBech32;
        }
        if (e4) {
          e4.innerHTML = privkeyBech32;
        }
      } catch (err) {}
    }
  };
  const processNewPrivkeyBech32 = () => {
    console.log(
      `processNewPrivkeyBech32`
    );
    if (e4) {
      const privkeyBech32 = e4.value;
      console.log(
        `processNewPrivkeyBech32; privkeyBech32: ${privkeyBech32};`
      );
      try {
        const oPrivkeyHex = nip19.decode(privkeyBech32);
        const privkeyHex = oPrivkeyHex.data;
        const derivedPubkeyHex = getPublicKey(privkeyHex);
        const derivedPubkeyBech32 = nip19.npubEncode(derivedPubkeyHex);
        console.log(
          `processNewPrivkeyBech32 changed; privkeyHex: ${privkeyHex}; privkeyBech32: ${privkeyBech32}; derivedPubkeyHex: ${derivedPubkeyHex}; derivedPubkeyBech32: ${derivedPubkeyBech32}`
        );
        if (e1) {
          e1.innerHTML = derivedPubkeyHex;
        }
        if (e2) {
          e2.innerHTML = derivedPubkeyBech32;
        }
        if (e3) {
          e3.innerHTML = privkeyHex;
        }
      } catch (err) {}
    }
  };
  return (
    <div className="infoBox">
      <div className="h4">Enter Private Key Generated Elsewhere</div>
      <br />
      <div id="newKeysContainer">
        <div style={{ marginBottom: '10px' }}>
          <div style={{}}>privkey (hex):</div>
          <textarea
            id="outsidePrivkeyHex"
            style={{ width: '90%', height: '40px' }}
            onChange={processNewPrivkeyHex}
          />
          <div style={{}}>privkey (bech32):</div>
          <textarea
            id="outsidePrivkeyBech32"
            style={{ width: '90%', height: '40px' }}
            onChange={processNewPrivkeyBech32}
          />
          <div style={{}}>pubkey (hex, auto generated from private key):</div>
          <div
            id="outsidePubkeyHex"
            style={{ width: '90%', height: '20px' }}
          />
          <div style={{}}>pubkey (bech32, auto generated from hex pubkey):</div>
          <div
            id="outsidePubkeyBech32"
            style={{ width: '90%', height: '20px' }}
          />
        </div>
        <button
          id="saveKeysGeneratedElsewhereButton"
          className="doSomethingButton"
          type="button"
          onClick={saveKeysToSql}
        >
          Save these keys in sql
        </button>

        <div id="savedKeysGeneratedElsewhereMessageContainer" />
      </div>
    </div>
  );
}
