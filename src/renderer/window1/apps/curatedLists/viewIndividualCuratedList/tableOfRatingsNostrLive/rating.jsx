import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import MiniProfile from './miniProfile';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds3';

const Rating = ({event}) => {
  const dispatch = useDispatch();
  const pk_rater = event.pubkey
  const oWord = JSON.parse(event.content)
  const instance_eventID = oWord.ratingData.rateeData.nostrCuratedListInstanceData.eventID;
  const instance_name = oWord.ratingData.rateeData.nostrCuratedListInstanceData.name;
  const instance_slug = oWord.ratingData.rateeData.nostrCuratedListInstanceData.slug;
  const rating = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.regularSliderRating;
  const confidence = oWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;

  let recommendedDisplay = 'block';
  let notRecommendedDisplay = 'none';
  if (rating == 0) {
    recommendedDisplay = 'none';
    notRecommendedDisplay = 'block';
  }
  return (
    <>
      <div
        style={{
          position: 'relative',
          border: '0px solid green',
          borderRadius: '5px',
          height: '90px',
          padding: '10px',
        }}
      >
        <div style={{ position: 'absolute', left: '5px', width: '40%' }}>
          <MiniProfile pubkey={pk_rater} />
        </div>

        <div
          style={{
            position: 'absolute',
            left: '42%',
            top: '10px',
            textAlign: 'center',
          }}
        >
          endorsement:
          <div
            style={{
              color: 'green',
              display: recommendedDisplay,
            }}
          >
            recommended
          </div>

          <div
            style={{
              color: 'red',
              display: notRecommendedDisplay,
            }}
          >
            NOT recommended
          </div>
        </div>

        <div style={{ position: 'absolute', right: '5px', width: '40%', textAlign: 'center' }}>
          <NavLink
            style={{textDecoration: 'none', textAlign: 'center', fontSize: '22px'}}
            onClick={() => {
              dispatch(updateCuratedListInstanceFocus(instance_eventID));
            }}
            end to="/CuratedListsHome/CuratedListSpecificInstance"
          >
            {instance_name}
          </NavLink>
        </div>
      </div>



      <div style={{display: 'none', border:'1px solid green',padding:'5px',marginBottom:'5px'}}>
        <div>rater: {' '}
          <NavLink
            style={{}}
            onClick={() => {
              dispatch(updateNostrProfileFocus(pk_rater));
            }}
            end to="/NostrHome/NostrViewProfile"
          >
            {pk_rater}
          </NavLink>
        </div>
        <div>
          ratee:{' '}
          <NavLink
            style={{}}
            onClick={() => {
              dispatch(updateCuratedListInstanceFocus(instance_eventID));
            }}
            end to="/CuratedListsHome/CuratedListSpecificInstance"
          >
            {instance_name}
          </NavLink>
        </div>
        <div>
          rating: {rating} (range: 0 to 100)
        </div>
        <div>
          confidence: {confidence} %
        </div>
        <div style={{fontSize:'10px',display:"none"}}>{JSON.stringify(oWord,null,4)}</div>
      </div>

      <div style={{marginLeft: '30px'}}>
        <TechDetailsForNostrNerds2 event_id={event.id} oWord={oWord} />
        <TechDetailsForNostrNerds3 event_id={event.id} event={event} />
      </div>
    </>
  );
}

export default Rating;
