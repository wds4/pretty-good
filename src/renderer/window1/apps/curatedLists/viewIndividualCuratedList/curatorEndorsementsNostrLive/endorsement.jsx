import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import {
  updateCuratedListFocus,
  updateCuratedListInstanceFocus,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Rating = ({ event }) => {
  const dispatch = useDispatch();
  const pk_rater = event.pubkey;
  const oWord = JSON.parse(event.content);
  const pk_ratee = oWord.ratingData.rateeData.nostrProfileData.pubkey;
  const rating =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListsCuratorEndorsementFieldsetData.regularSliderRating;
  const rating_reference =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListsCuratorEndorsementFieldsetData
      .referenceRegularSliderRating;
  const { confidence } =
    oWord.ratingData.ratingFieldsetData.confidenceFieldsetData;
  const list_name =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListsCuratorEndorsementFieldsetData.contextData
      .nostrParentCuratedListData.name.singular;
  const contextDAGSlug =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListsCuratorEndorsementFieldsetData.contextData.contextDAG
      .slug;
  const curatedListID =
    oWord.ratingData.ratingFieldsetData
      .nostrCuratedListsCuratorEndorsementFieldsetData.contextData
      .nostrParentCuratedListData.eventID;
  return (
    <>
      <div
        style={{
          border: '1px solid green',
          padding: '5px',
          marginBottom: '5px',
        }}
      >
        <div>
          rater:{' '}
          <NavLink
            style={{}}
            onClick={() => {
              dispatch(updateNostrProfileFocus(pk_rater));
            }}
            end
            to="/NostrHome/NostrViewProfile"
          >
            {pk_rater}
          </NavLink>
        </div>
        <div>
          ratee:{' '}
          <NavLink
            style={{}}
            onClick={() => {
              dispatch(updateNostrProfileFocus(pk_ratee));
            }}
            end
            to="/NostrHome/NostrViewProfile"
          >
            {pk_ratee}
          </NavLink>
        </div>
        <div>
          list_name:{' '}
          <NavLink
            style={{}}
            onClick={() => {
              dispatch(updateCuratedListFocus(curatedListID));
            }}
            end
            to="/CuratedListsHome/ViewIndividualCuratedList"
          >
            {list_name}
          </NavLink>
        </div>
        <div>
          contextDAGSlug: {contextDAGSlug}
        </div>
        <div>
          rating / reference rating: {rating} / {rating_reference}
        </div>
        <div>confidence: {confidence} %</div>
        <div style={{ fontSize: '10px', display: 'none' }}>
          {JSON.stringify(oWord, null, 4)}
        </div>
      </div>
    </>
  );
};

export default Rating;
