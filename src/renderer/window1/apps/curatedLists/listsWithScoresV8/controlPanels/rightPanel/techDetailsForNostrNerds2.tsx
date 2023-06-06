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

  const elem_id = 'technicalDetailsForNostrDevsContainer2'; // add event_id or some other unique identifier if multiple details per page
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
      <div className={devElemClass} style={{marginLeft: '23px'}}>
        <div style={{height: '33px', position: 'relative'}}>
          <div style={{position: 'absolute', right: '30px'}}>
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
            <span style={{ color: 'grey' }}>What is the seed user?</span>
          </div>
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
              color: 'grey',
              textAlign: 'left',
              fontSize: '12px',
              marginBottom: '10px',
              marginRight: '20px',
            }}
          >
            <div style={{marginBottom: '10px'}}>
              Every web of trust is centered around one user, the seed user, whose
              influence is set to 1 by definition. All other user influence scores
              are calculated using endorsements. Typically, the default user
              influence score (adjustable parameters in the control panel) is set
              to something much less than 1.{' '}
              <span style={{ }}>
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
              .</span>
            </div>

            <div style={{marginBottom: '10px'}}>
              <i>You</i> are the seed user for <i>your</i> grapevine. Your
              crowdsourced results may or may not match someone else's results. If
              the list is important enough to garner sufficient attention and
              studied input, the community may converge to similar or identical
              results via the process of{' '}
              <a
                href="https://github.com/wds4/DCoSL/blob/main/glossary/looseConsensus.md"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                loose consensus
              </a>
              .
            </div>

            <div style={{}}>
              Select different seed users (selector on the upper right) to find
              out whose grapevines agree and whose don't!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
