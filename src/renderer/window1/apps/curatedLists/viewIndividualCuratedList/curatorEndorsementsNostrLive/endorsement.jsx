import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import {
  updateCuratedListFocus,
  updateCuratedListInstanceFocus,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
import MiniProfile from './miniProfile';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds3';

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
  let endorsementColor = 'green';
  let recommendedDisplay = 'block';
  let notRecommendedDisplay = 'none';
  if (rating == 0) {
    endorsementColor = 'red';
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

        <div style={{ position: 'absolute', right: '5px', width: '40%' }}>
          <MiniProfile pubkey={pk_ratee} />
        </div>

        <div style={{ display: 'none', position: 'absolute', left: '5px', bottom: '5px' }}>
          as curator of the list:{' '}
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
          .
        </div>
      </div>

      <div
        style={{
          padding: '5px',
          paddingLeft: '20px',
        }}
      >
        <TechDetailsForNostrNerds3 event_id={event.id} oWord={oWord} />
        <TechDetailsForNostrNerds2 event_id={event.id} event={event} />
      </div>

      <div
        style={{
          border: '1px solid green',
          padding: '5px',
          marginBottom: '5px',
          display: 'none',
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
