import { useSelector, useDispatch } from 'react-redux';
import { useNostr } from 'nostr-react';
import {
  updateNostrRelayStoreAndSql,
  addNostrRelay,
  removeNostrRelay,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import {
  addNewRelayToSql,
} from 'renderer/window1/lib/pg/sql';
import { updateNostrRelaysForActiveUserInReduxAndNostr } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { resetNostrSettingsNostrRelays } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateNostrRelaysForActiveUserInSql } from 'renderer/window1/lib/pg/sql';

const AddNewRelay = () => {
  const { publish } = useNostr();
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const oRelaysUpdated = JSON.parse(JSON.stringify(myNostrProfile.relays));
  const addNew = async () => {
    const e1 = document.getElementById('newRelayTextarea');
    if (e1) {
      const newUrl = `wss://${e1.value}`;
      console.log(`newUrl: ${newUrl}`);
      oRelaysUpdated[newUrl] = { read: true, write: true };
      // update relays list for active user in redux store and broadcast to the nostr network

      dispatch(
        updateNostrRelaysForActiveUserInReduxAndNostr(
          oRelaysUpdated,
          myNostrProfile,
          publish
        )
      );
      // then transfer updated settings to the nostr settings store, which makes them the active relay list
      updateNostrRelaysForActiveUserInSql(oRelaysUpdated);
      dispatch(resetNostrSettingsNostrRelays(oRelaysUpdated));
      const e2 = document.getElementById('newRelayAddedSuccess');
      if (e2) {
        const successMessage = `${newUrl} successfully added to the database.`;
        e2.innerHTML = successMessage;
        e1.value = "";
      }
      /*
      const res = await addNewRelayToSql(newUrl);
      dispatch(addNostrRelay(newUrl));
      if (res) {
        const e2 = document.getElementById('newRelayAddedSuccess');
        if (e2) {
          const successMessage = `${newUrl} successfully added to the database.`;
          e2.innerHTML = successMessage;
          const e3 = document.getElementById('needToRestartMessage');
          if (e3) {
            e3.style.display = 'block';
          }
        }
      }
      */
    }
  };
  return (
    <>
      <div style={{marginBottom: '5px'}}>
        <div style={{ display: 'inline-block', fontSize: '18px' }}>wss://</div>
        <textarea
          id="newRelayTextarea"
          style={{ height: '20px', width: '200px' }}
        />
        <div
          id="addRelayButton"
          className="doSomethingButton"
          onClick={addNew}
        >
          add a new relay
        </div>
        <div id="newRelayAddedSuccess" />
        <div id="updateStatusSuccess" />
        <div id="deleteRelaySuccess" />
        <div
          id="needToRestartMessage"
          style={{
            backgroundColor: 'yellow',
            padding: '5px',
            border: '1px solid black',
            display: 'none',
          }}
        >
          You will need to restart the app for any changes to take effect.
        </div>
      </div>
    </>
  );
};
export default AddNewRelay;
