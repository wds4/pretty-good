import { useSelector, useDispatch } from 'react-redux';
import { nip19, getPublicKey } from 'nostr-tools';
import { addNewRowToMyNostrProfileInSql } from '../../../../lib/pg/sql';

export default function EnterExternalKeys() {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  const e1 = document.getElementById('outsidePubkeyHex');
  const e2 = document.getElementById('outsidePubkeyBech32');
  const e3 = document.getElementById('outsidePrivkey');

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

  const processNewPubkeyHex = () => {
    if (e1) {
      const pubkeyHex = e1.value;
      console.log(`processNewPubkeyHex changed; pubkeyHex: ${pubkeyHex}`);
    }
  };

  const processNewPubkeyBech32 = () => {
    if (e2) {
      const pubkeyBech32 = e2.value;
      console.log(
        `processNewPubkeyBech32 changed; pubkeyBech32: ${pubkeyBech32}`
      );
    }
  };

  const processNewPrivkey = () => {
    if (e3) {
      const privkey = e3.value;
      try {
        const derivedPubkeyHex = getPublicKey(privkey);
        const derivedPubkeyBech32 = nip19.npubEncode(derivedPubkeyHex);
        console.log(
          `processNewPrivkey changed; privkey: ${privkey}; derivedPubkeyHex: ${derivedPubkeyHex}; derivedPubkeyBech32: ${derivedPubkeyBech32}`
        );
        if (e1) {
          e1.value = derivedPubkeyHex;
        }
        if (e2) {
          e2.value = derivedPubkeyBech32;
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
          <div style={{}}>privkey:</div>
          <textarea
            id="outsidePrivkey"
            style={{ width: '90%', height: '40px' }}
            onChange={processNewPrivkey}
          />
          <div style={{}}>pubkey (hex, auto generated from private key):</div>
          <textarea
            id="outsidePubkeyHex"
            style={{ width: '90%', height: '40px' }}
            onChange={processNewPubkeyHex}
            // disabled
          />
          <div style={{}}>pubkey (bech32, auto generated from hex pubkey):</div>
          <textarea
            id="outsidePubkeyBech32"
            style={{ width: '90%', height: '40px' }}
            onChange={processNewPubkeyBech32}
            // disabled
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
