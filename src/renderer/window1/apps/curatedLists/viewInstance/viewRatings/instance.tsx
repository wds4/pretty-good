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
      <div style={{ marginBottom: '20px' }}>
        <div className="h3" style={{ marginBottom: '10px' }}>
          <div style={{ display: 'inline-block' }}>
            Ratings by my grapevine of
          </div>{' '}
          <div style={{ display: 'inline-block', color: 'blue' }}>
            {instanceName}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          an item on the list of{' '}
          <NavLink
            style={{ textDecoration: 'none' }}
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
        This page is under construction. For now, navigate to the page that shows all ratings
        that correspond to all items on this list.
      </div>
    </>
  );
};

export default Instance;
