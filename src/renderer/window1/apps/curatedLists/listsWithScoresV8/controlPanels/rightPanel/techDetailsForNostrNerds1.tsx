import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const TechDetailsForNostrNerds = () => {
  /*
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  */
  const devElemClass = 'devElemShow';
  const dispatch = useDispatch();

  const elem_id = 'technicalDetailsForNostrDevsContainer1'; // add event_id or some other unique identifier if multiple details per page
  const toggleViewDetails = () => {
    const e = document.getElementById(elem_id);
    const currentState = e.style.display;
    if (currentState == 'none') {
      e.style.display = 'block';
    }
    if (currentState == 'block') {
      e.style.display = 'none';
    }
  };
  return (
    <>
      <div className={devElemClass}>
        <div>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton techDetailsToggleButton"
            style={{
              fontSize: '14px',
              marginLeft: '0px',
              paddingTop: '1px',
              paddingBottom: '1px',
            }}
          >
            🤓
          </button>
          <span style={{ color: 'grey' }}>
            How does list curation work?
          </span>
        </div>
        <div
          id={elem_id}
          style={{
            display: 'none',
            fontSize: '12px',
          }}
        >
          <div
            style={{
              textAlign: 'left',
              marginBottom: '10px',
              color: 'grey',
              fontSize: '12px',
            }}
          >
            <li>
              Anyone can{' '}
              <span style={{ color: 'blue' }}>
                <NavLink
                  onClick={() => {
                    // dispatch(updateCuratedListFocus());
                  }}
                  end
                  to="/CuratedListsHome/CreateNewCuratedList"
                  style={{ textDecoration: 'none' }}
                >
                  submit
                </NavLink>
              </span>{' '}
              a new list.
            </li>

            <li>
              Anyone can{' '}
              <span style={{ color: 'blue' }}>
                <NavLink
                  onClick={() => {
                    // dispatch(updateCuratedListFocus());
                  }}
                  end
                  to="/CuratedListsHome/CreateNewCuratedListInstance"
                  style={{ textDecoration: 'none' }}
                >
                  submit
                </NavLink>
              </span>{' '}
              a new item to any list.
            </li>

            <li>
              Anyone can{' '}
              <span style={{ color: 'blue' }}>
                <NavLink
                  onClick={() => {
                    // dispatch(updateCuratedListFocus());
                  }}
                  end
                  to="/NostrHome/NostrViewProfile"
                  style={{ textDecoration: 'none' }}
                >
                  endorse
                </NavLink>
              </span>{' '}
              any user as curator of a given list{' '}
              <span>(trusted 👍 or not trusted 👎)</span>.
            </li>

            <li>
              Anyone can{' '}
              <span style={{ color: 'blue' }}>
                <NavLink
                  onClick={() => {
                    // dispatch(updateCuratedListFocus());
                  }}
                  end
                  to="/CuratedListsHome/SpecificInstanceLeaveRating"
                  style={{ textDecoration: 'none' }}
                >
                  endorse
                </NavLink>
              </span>{' '}
              an item as belonging / not belonging to a given list{' '}
              <span>(👍 or 👎)</span>.
            </li>
          </div>

          <div
            style={{
              color: 'grey',
              textAlign: 'left',
              fontSize: '12px',
              marginBottom: '10px',
              marginRight: '20px',
            }}
          >
            All of the above is submitted to nostr and utilized by your web of
            trust (your "grapevine") to decide which items to accept onto any
            given list.
            <div style={{ marginTop: '10px' }}>
              Visualize how calculations are performed{' '}
              <span style={{ color: 'blue' }}>
                <NavLink
                  onClick={() => {
                    // dispatch(updateCuratedListFocus(event_id));
                  }}
                  end
                  to="/CuratedListsHome/SingleListGraphOfInstances"
                  style={{ textDecoration: 'none' }}
                >
                  here
                </NavLink>
              </span>
              .
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
