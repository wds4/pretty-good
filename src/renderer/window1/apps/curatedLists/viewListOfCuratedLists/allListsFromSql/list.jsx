import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';

const List = ({ event }) => {
  const dispatch = useDispatch();
  // const oEvent = JSON.parse(event);
  const oWord = JSON.parse(event.content);
  let oListData = {};
  if (oWord?.nostrCuratedListData) {
    oListData = oWord?.nostrCuratedListData;
  }
  let name_singular = '';
  let name_plural = '';
  if (oListData.name) {
    name_singular = oListData.name.singular;
    name_plural = oListData.name.plural;
  }
  let title_singular = '';
  let title_plural = '';
  if (oListData.title) {
    title_singular = oListData.title.singular;
    title_plural = oListData.title.plural;
  }
  let description = '';
  if (oListData.description) {
    description = oListData.description;
  }
  return (
    <>
      <div
        style={{
          padding: '5px',
          marginBottom: '5px',
          border: '1px solid blue',
          borderRadius: '5px',
        }}
      >
        List of:{' '}
        <NavLink
          style={{}}
          onClick={() => {
            dispatch(updateCuratedListFocus(event.id));
          }}
          end
          to="/CuratedListsHome/ViewIndividualCuratedList"
        >
          {name_plural}
        </NavLink>
        <div style={{fontSize:"12px",marginTop:"10px"}}>
          {description}
        </div>
        <div style={{ display: 'none' }}>
          <div>id: {event.id}</div>
          <div>author: {event.pubkey}</div>
          <div>created_at: {event.created_at}</div>
          <div>
            name: {name_singular}, {name_plural}
          </div>
          <div>
            title: {title_singular}, {title_plural}
          </div>
          <div>description: {description}</div>
        </div>
      </div>
    </>
  );
};

export default List;
