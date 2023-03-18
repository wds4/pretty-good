import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Instance = ({parentConceptPropertyPath,event}) => {
  const dispatch = useDispatch();
  let name_singular = "";
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
        name_singular = oWord[parentConceptPropertyPath]?.name;
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
                {name_singular}
              </NavLink>
              <div>parentConceptPropertyPath: {parentConceptPropertyPath}</div>
              <div>name: {name_singular}</div>
              <div>description: {description}</div>
              <div>event_id: {event_id}</div>
              <div>author: {pubkey}</div>
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
