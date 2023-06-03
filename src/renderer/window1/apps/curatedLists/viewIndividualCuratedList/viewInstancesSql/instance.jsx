import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds3';

const Instance = ({
  parentConceptPropertyPath,
  oListItemData,
  event,
  oWord,
}) => {
  const dispatch = useDispatch();
  let instance_name = '';
  let description = '';

  let pubkey = '';
  let event_id = '';

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
            <div
              style={{
                padding: '5px',
                marginBottom: '5px',
                border: '1px solid blue',
                borderRadius: '5px',
              }}
            >
              <NavLink
                style={{textDecoration: 'none'}}
                onClick={() => {
                  dispatch(updateCuratedListInstanceFocus(event.id));
                }}
                end
                to="/CuratedListsHome/CuratedListSpecificInstance"
              >
                {instance_name}
              </NavLink>

              <div style={{ fontSize: '12px', marginTop: '10px' }}>
                {description}
              </div>

              <div style={{ display: 'none' }}>
                <div>
                  parentConceptPropertyPath: {parentConceptPropertyPath}
                </div>
                <div>name: {instance_name}</div>
                <div>description: {description}</div>
                <div>event_id: {event_id}</div>
                <div>author: {pubkey}</div>
              </div>

              <TechDetailsForNostrNerds2 event_id={event_id} oWord={oWord} />
              <TechDetailsForNostrNerds1 event_id={event_id} event={event} />
              <TechDetailsForNostrNerds3 event_id={event_id} oListItemData={oListItemData} />
            </div>
          </>
        );
      }
    }
    return (
      <div
        style={{
          padding: '5px',
          marginBottom: '5px',
          border: '1px solid blue',
          borderRadius: '5px',
        }}
      >
        DOES NOT VALIDATE
      </div>
    );
  }
};

export default Instance;
