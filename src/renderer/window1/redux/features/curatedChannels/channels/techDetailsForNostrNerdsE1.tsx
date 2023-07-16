import { useSelector } from 'react-redux';
import TechDetailsForNostrNerdsE1a from './techDetailsForNostrNerdsE1a';

const TechDetailsForNostrNerds = ({oChannels, oGrapevine, ratingTemplateSlug}) => {
  // const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  const devMode3 = true;
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainerE1_"+ratingTemplateSlug; // add event_id or some other unique identifier if multiple details per page
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
  const aRatingEventIDs = oGrapevine.byRatingTemplateSlug[ratingTemplateSlug].aRatingEventIDs;
  return (
    <>
      <div className={devElemClass}>
        <div>
          <span style={{ fontSize: '10px' }}>

          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton techDetailsToggleButton"
          >
            🤓
          </button>
          <span>
            channels.grapevine.byRatingTemplateSlug.{ratingTemplateSlug}<br />
            <div style={{marginLeft: '30px'}}>
              ({oGrapevine.byRatingTemplateSlug[ratingTemplateSlug].aRatingEventIDs.length} ratings,{' '}
              {Object.keys(oGrapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID).length} raters,{' '}
              {Object.keys(oGrapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID).length} ratees)
            </div>
            </span>
        </div>
        <div
          id={elem_id}
          style={{
            display: 'none',
            fontSize: '12px',
            border: '1px dashed grey',
            padding: '3px',
          }}
        >
          <div>
            <div>number of raters: {Object.keys(oGrapevine.byRatingTemplateSlug[ratingTemplateSlug].byRaterUniversalID).length}</div>
            <div>number of ratees: {Object.keys(oGrapevine.byRatingTemplateSlug[ratingTemplateSlug].byRateeUniversalID).length}</div>
            {aRatingEventIDs.map((ratingEventID)=>{
              return (
                <>
                  <div><TechDetailsForNostrNerdsE1a oChannels={oChannels} ratingEventID={ratingEventID} /></div>
                </>
              )
            })}
            <hr />
            <div>channels.grapevine.byRatingTemplateSlug.{ratingTemplateSlug} =</div>
            <div>{JSON.stringify(oGrapevine.byRatingTemplateSlug[ratingTemplateSlug],null,4)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
