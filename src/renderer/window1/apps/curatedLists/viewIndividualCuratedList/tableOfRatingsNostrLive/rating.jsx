import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Rating = ({event}) => {
  const dispatch = useDispatch();
  const pk_rater = event.pubkey
  const oWord = JSON.parse(event.content)
  const instance_eventID = oWord.ratingData.rateeData.nostrCuratedListInstanceData.eventID;
  const instance_name = oWord.ratingData.rateeData.nostrCuratedListInstanceData.name;
  const instance_slug = oWord.ratingData.rateeData.nostrCuratedListInstanceData.slug;
  const rating = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.regularSliderRating;
  const confidence = oWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;
  return (
    <>
      <div style={{border:'1px solid green',padding:'5px',marginBottom:'5px'}}>
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
    </>
  );
}

export default Rating;
