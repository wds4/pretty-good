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

  const elem_id = "technicalDetailsForNostrDevsContainer"; // add event_id or some other unique identifier if multiple details per page
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
            style={{ fontSize: '14px', marginLeft: '0px', paddingTop: '1px', paddingBottom: '1px' }}
          >
            🤓
          </button>
          <span style={{color: 'grey'}}>How does LIST CROWDSOURCING work?</span>
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
              fontSize: '14px',
              marginBottom: '10px',
              marginRight: '20px',
            }}
          >
            Using endorsements of list items and endorsements of users as list
            curators, your grapevine curates lists for you. Your crowdsourced
            results may or may not match someone else's results. If the list is
            important enough to garner sufficient attention and studied input, the
            community may converge to similar or identical results via the process of{' '}
            <a
              href="https://github.com/wds4/DCoSL/blob/main/glossary/looseConsensus.md"
              target="_blank"
              rel="noreferrer"
              style={{textDecoration: 'none'}}
            >
              loose consensus
            </a>
            . Select different seed users (selector on the upper right) to find out whose
            grapevines agree and whose don't!
            <br />
            <div style={{ marginTop: '5px' }}>
              Visualize the crowdsourcing process and find out how it works{' '}
              <span style={{ color: 'blue' }}>
                <NavLink
                  onClick={() => {
                    dispatch(updateCuratedListFocus(event_id));
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
