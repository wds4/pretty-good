import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Instance = ({parentConceptPropertyPath,event}) => {
  const dispatch = useDispatch();
  let instance_name = "";
  let description = "";

  let pubkey = "";
  let event_id = "";

  if (event) {
    event_id = event?.id;
    pubkey = event?.pubkey;
    const sWord = event.content;
    let oWord = {};
    oWord = JSON.parse(sWord);
    // NEED TO VALIDATE AGAINST JSON SCHEMA OF THE PARENT CONCEPT
    if (oWord) {
      if (oWord.hasOwnProperty(parentConceptPropertyPath)) {
        instance_name = oWord[parentConceptPropertyPath]?.name;
        description = oWord[parentConceptPropertyPath]?.description;
        return (
          <>
            <div style={{ padding: '5px', marginBottom: '5px', border: '1px solid blue', borderRadius: '5px' }}>
              <NavLink
                style={{}}
                onClick={() => {
                  dispatch(updateCuratedListInstanceFocus(event.id));
                }}
                end to="/CuratedListsHome/CuratedListSpecificInstance"
              >
                {instance_name}
              </NavLink>

              <div style={{fontSize:"12px",marginTop:"10px"}}>{description}</div>

              <div style={{display:"none"}}>
                <div>parentConceptPropertyPath: {parentConceptPropertyPath}</div>
                <div>name: {instance_name}</div>
                <div>description: {description}</div>
                <div>event_id: {event_id}</div>
                <div>author: {pubkey}</div>
              </div>
            </div>

          </>
        );
      }
    }
    return (
      <div style={{ padding: '5px', marginBottom: '5px', border: '1px solid blue', borderRadius: '5px' }}>
        DOES NOT VALIDATE
      </div>
    )
  }
}

export default Instance;
