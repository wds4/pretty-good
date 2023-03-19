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
      <div style={{ verticalAlign: 'bottom', margin: '20px' }}>
        <div>
          <div
            style={{
              display: 'inline-block',
              fontSize: '20px',
              verticalAlign: 'bottom',
            }}
          >
            {instanceName}
          </div>{' '}
          <div
            style={{
              display: 'inline-block',
              fontSize: '14px',
              verticalAlign: 'bottom',
            }}
          >
            has been added to the list of
          </div>{' '}
          <div
            style={{
              display: 'inline-block',
              fontSize: '20px',
              verticalAlign: 'bottom',
            }}
          >
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
          </div>{' '}
          <div
            style={{
              display: 'inline-block',
              fontSize: '14px',
              verticalAlign: 'bottom',
            }}
          >
            by
          </div>{' '}
          <div
            style={{
              display: 'inline-block',
              fontSize: '14px',
              verticalAlign: 'bottom',
            }}
          >
            {pk_instance_author}
          </div>{' '}
          <div
            style={{
              display: 'inline-block',
              fontSize: '14px',
              verticalAlign: 'bottom',
            }}
          >
            on
          </div>{' '}
          <div
            style={{
              display: 'inline-block',
              fontSize: '14px',
              verticalAlign: 'bottom',
            }}
          >
            {created_at}
          </div>
        </div>
        <br />
        <div>
          <div style={{ color: 'grey' }}>Description:</div>
          <div>{instanceDescription}</div>
        </div>
      </div>

      <div style={{ display: 'none' }}>
        <div>instanceName: {instanceName}</div>
        <div>instanceDescription: {instanceDescription}</div>
        <div>curatedListNameSingular: {curatedListNameSingular}</div>
        <div>curatedListNamePlural: {curatedListNamePlural}</div>
        <div>propertyPath: {propertyPath}</div>
        <div>pk_instance_author: {pk_instance_author}</div>
        <div>{JSON.stringify(oWord, null, 4)}</div>
      </div>
    </>
  );
};

export default Instance;
