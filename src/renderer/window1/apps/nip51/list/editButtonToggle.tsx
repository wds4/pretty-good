import { useSelector, useDispatch } from 'react-redux';
import ToggleSwitch from 'renderer/window1/components/toggleSwitch';
import { updateAutoImportNip51 } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

const EditButtonToggle = ({author_pk, editListState, setEditListState}) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const processStateChange_edit = (newState) => {
    // console.log("processStateChange_edit; newState: "+newState)
    setEditListState(newState);
    dispatch(updateAutoImportNip51(false));
  };
  if (author_pk != myPubkey) {
    return <></>;
  }
  return (
    <>
      <div style={{display: 'inline-block', marginLeft: '20px'}}>
        <div style={{display: 'inline-block', color: 'grey', fontSize: '14px', marginLeft: '5px', textAlign: 'right'}}>
          edit<br />list
        </div>
        <div style={{display: 'inline-block', marginLeft: '5px'}}>
          <ToggleSwitch
            label="editList"
            processStateChange={(newState) =>
              processStateChange_edit(newState)
            }
            initState={editListState}
          />
        </div>
      </div>
    </>
  )
}
export default EditButtonToggle;
