import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  updateCuratedListFocus,
  updateCuratedListInstanceFocus,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Instance = ({
  curatedListFocusID,
  curatedListInstanceFocusID,
  oListSqlData,
  oInstanceSqlData,
}) => {
  const dispatch = useDispatch();
  // LIST
  let oEvent1 = {};
  let oWord1 = {};
  let propertyPath = '';
  let curatedListNameSingular = '';
  let curatedListNamePlural = '';
  if (oListSqlData) {
    const sEvent1 = oListSqlData.event;
    if (sEvent1) {
      oEvent1 = JSON.parse(sEvent1);
      const sWord1 = oEvent1.content;
      oWord1 = JSON.parse(sWord1);
      if (oWord1.nostrCuratedListData) {
        if (oWord1.nostrCuratedListData.name) {
          curatedListNameSingular = oWord1.nostrCuratedListData.name?.singular;
          curatedListNamePlural = oWord1.nostrCuratedListData.name?.plural;
        }
        if (oWord1.nostrCuratedListData.propertyPath) {
          propertyPath = oWord1.nostrCuratedListData?.propertyPath;
        }
      }
    }
  }

  // INSTANCE
  let oWord = {};
  let oEvent = {};
  let instanceName = '';
  let instanceDescription = '';
  let pk_instance_author = '';
  let created_at = '';
  if (oInstanceSqlData) {
    const sEvent = oInstanceSqlData.event;
    const { parentConceptSlug } = oInstanceSqlData;
    const { parentConceptNostrEventID } = oInstanceSqlData;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      pk_instance_author = oEvent?.pubkey;
      created_at = oEvent?.created_at;
      const sWord = oEvent.content;
      oWord = JSON.parse(sWord);
      if (oWord) {
        if (oWord[propertyPath]) {
          instanceName = oWord[propertyPath]?.name;
          instanceDescription = oWord[propertyPath]?.description;
        }
      }
    }
  }

  return (
    <>
      <div style={{ margin: '10px' }}>
        <div>
          <div style={{ display: 'inline-block' }}>list: </div>{' '}
          <div style={{ display: 'inline-block', color: 'blue' }}>
            <NavLink
              style={{}}
              onClick={() => {
                dispatch(updateCuratedListFocus(curatedListFocusID));
              }}
              end
              to="/CuratedListsHome/ViewIndividualCuratedList"
            >
              {curatedListNamePlural}
            </NavLink>
          </div>
        </div>
        <div>
          <div style={{ display: 'inline-block' }}>instance: </div>{' '}
          <div style={{ display: 'inline-block', color: 'blue' }}>
            <NavLink
              style={{}}
              onClick={() => {
                dispatch(
                  updateCuratedListInstanceFocus(curatedListInstanceFocusID)
                );
              }}
              end
              to="/CuratedListsHome/CuratedListSpecificInstance"
            >
              {instanceName}
            </NavLink>
          </div>
        </div>
      </div>

      <div className="techOverviewTitle">
        representation of{' '}
        <div style={{ display: 'inline-block', color: 'blue' }}>
          {instanceName}
        </div>{' '}
        as a word in the concept graph:
      </div>
      <div className="techOverviewJSON">{JSON.stringify(oWord, null, 4)}</div>

      <div className="techOverviewTitle">the above object packaged into a nostr event:</div>
      <div className="techOverviewJSON">{JSON.stringify(oEvent, null, 4)}</div>

      <div className="techOverviewTitle">sql:</div>
      <div className="techOverviewJSON">
        {JSON.stringify(oInstanceSqlData, null, 4)}
      </div>
    </>
  );
};

export default Instance;
