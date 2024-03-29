import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateCuratedChannelsTopicFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { updateCuratedChannelsTopics } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
// import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';

const ItemList = ({ aInstanceCompScoreData }) => {
  const dispatch = useDispatch();
  const { seedUser } = useSelector(
    (state) => state.controlPanelSettings
  );
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  let seedUserName = seedUser;
  if (nostrProfiles.hasOwnProperty(seedUser)) {
    const profileContent = JSON.parse(nostrProfiles[seedUser].content);
    const name = `@${profileContent.name}`;
    const displayName = profileContent.display_name;
    seedUserName = displayName;
  }
  if (!seedUserName) {
    seedUserName = seedUser;
  }

  const { defaultInstanceBaselineConfidence } =
  useSelector((state) => state.controlPanelSettings);
  const input_default = defaultInstanceBaselineConfidence / 100;

  const getClassification = (input, average) => {
    let classification = "undecided";
    // Two possible criteria for undecided (eventually, make this an adjustable criterion)
    // if (input > input_default * 1.5) {
    if (input > input_default + 0.1) {
      if (average > 0.66) {
        classification = "accepted";
      }
      if (average < 0.34 ) {
        classification = "rejected";
      }
    }
    return classification;
  }

  const aAcceptedEventIDs = [];
  for (let x=0;x<aInstanceCompScoreData.length;x++) {
    const oInstanceCompScoreData = aInstanceCompScoreData[x];
    const id = oInstanceCompScoreData?.id;
    const average = oInstanceCompScoreData?.average;
    const input = oInstanceCompScoreData?.input;
    const classification = getClassification(input,average);
    if (classification == "accepted") {
      aAcceptedEventIDs.push(id);
    }
  }
  return (
    <>
      <div style={{textAlign: 'left', marginLeft: '25px', marginBottom: '3px'}}>
        <NavLink
          to="/CuratedListsHome/CreateNewCuratedListInstance"
          style={{ textDecoration: 'none' }}
        >
          Add another item
        </NavLink>{' '}
        to this list.
        <br />
        <button
          type="button"
          onClick={()=>{
            console.log("update active topics list: aAcceptedEventIDs: "+JSON.stringify(aAcceptedEventIDs,null,4));
            dispatch(updateCuratedChannelsTopics(aAcceptedEventIDs));
          }}
        >update active topics list</button>
      </div>

      <div style={{ fontSize: '22px', textAlign: 'left', marginRight: '20px', marginLeft: '20px' }}>
        <div className="itemsInfoBox" style={{border: '2px solid green'}}>
          <div style={{ color: 'grey', margin: '5px' }}>
            ACCEPTED items:
          </div>
          <hr />
          {aInstanceCompScoreData.map((oInstanceCompScoreData) => {
            const name = oInstanceCompScoreData?.name;
            const id = oInstanceCompScoreData?.id;
            const average = oInstanceCompScoreData?.average;
            const input = oInstanceCompScoreData?.input;
            const influence = oInstanceCompScoreData?.influence;

            // classify as ACCEPTED, REJECTED, or PENDING / indeterminate / undecided
            // based on average score and input
            // This is a tentative algorithm. May change in future.
            // input_default = default input = default confidence
            // If this item input < input_default + 0.1 (or 1.5 * input_default?), then pending
            // otherwise: if average > 0.66 then ACCEPTED
            // if average < 0.34 then REJECTED
            // else pending
            // Might add adjustable parameters: item input < input_default + A, A = 0.1 by default
            // OR  B * input_default, B = 1.5 by default
            /*
            let classification = "undecided";
            if (input > defaultUserTrustConfidence + 0.1) {
              if (average > 0.66) {
                classification = "accepted";
              }
              if (average < 0.34 ) {
                classification = "rejected";
              }
            }
            */
            const classification = getClassification(input,average);

            // if (input > 0.1 && average > 0.5) {
            if (classification == "accepted") {
              return (
                <>
                  <div
                    className="toggleButtonParentContainer"
                    style={{ marginTop: '2px' }}
                  >
                    <div
                      className="qMarkToggleButton"
                      style={{ display: 'none' }}
                    >
                      ?
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        marginLeft: '10px',
                      }}
                    >
                      <NavLink
                        onClick={() => {
                          dispatch(updateCuratedChannelsTopicFocus(id));
                        }}
                        to="/CuratedListsHome/ContentCurationSingleTopicHome"
                        className="goToUserProfileButton"
                        style={{color: 'green'}}
                      >
                        {name}
                      </NavLink>
                    </div>
                    <div className="scoresContainer">
                      <div>average: {average}</div>
                      <div>input: {input}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>

        <div className="itemsInfoBox" style={{border: '2px solid red'}}>
          <div style={{ color: 'grey', margin: '5px' }}>
            REJECTED items:
          </div>
          <hr />
          {aInstanceCompScoreData.map((oInstanceCompScoreData) => {
            const name = oInstanceCompScoreData?.name;
            const id = oInstanceCompScoreData?.id;
            const average = oInstanceCompScoreData?.average;
            const input = oInstanceCompScoreData?.input;
            const influence = oInstanceCompScoreData?.influence;

            const classification = getClassification(input,average);

            // if (input > 0.1 && average <= 0.5) {
            if (classification == "rejected") {
              return (
                <>
                  <div
                    className="toggleButtonParentContainer"
                    style={{ marginTop: '2px' }}
                  >
                    <div
                      className="qMarkToggleButton"
                      style={{ display: 'none' }}
                    >
                      ?
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        marginLeft: '10px',
                      }}
                    >
                      <NavLink
                        onClick={() => {
                          dispatch(updateCuratedChannelsTopicFocus(id));
                        }}
                        to="/CuratedListsHome/ContentCurationSingleTopicHome"
                        className="goToUserProfileButton"
                        style={{color: 'red'}}
                      >
                        {name}
                      </NavLink>
                    </div>
                    <div className="scoresContainer">
                      <div>average: {average}</div>
                      <div>input: {input}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>

        <div className="itemsInfoBox" style={{border: '2px solid grey'}}>
          <div style={{ color: 'grey', margin: '5px' }}>
            PENDING items:
          </div>
          <hr />
          {aInstanceCompScoreData.map((oInstanceCompScoreData) => {
            const name = oInstanceCompScoreData?.name;
            const id = oInstanceCompScoreData?.id;
            const average = oInstanceCompScoreData?.average;
            const input = oInstanceCompScoreData?.input;
            const influence = oInstanceCompScoreData?.influence;

            const classification = getClassification(input,average);
            // if (input <= 0.1) {
            if (classification == "undecided") {
              return (
                <>
                  <div
                    className="toggleButtonParentContainer"
                    style={{ marginTop: '2px' }}
                  >
                    <div
                      className="qMarkToggleButton"
                      style={{ display: 'none' }}
                    >
                      ?
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        marginLeft: '10px',
                      }}
                    >
                      <NavLink
                        onClick={() => {
                          dispatch(updateCuratedChannelsTopicFocus(id));
                        }}
                        to="/CuratedListsHome/ContentCurationSingleTopicHome"
                        className="goToUserProfileButton"
                        style={{color: 'black'}}
                      >
                        {name}
                      </NavLink>
                    </div>
                    <div className="scoresContainer">
                      <div>average: {average}</div>
                      <div>input: {input}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default ItemList;
