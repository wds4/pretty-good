import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const List = ({event}) => {
  const dispatch = useDispatch();
  // const oEvent = JSON.parse(event);
  const oWord = JSON.parse(event.content);
  let oListData = {};
  if (oWord?.nostrCuratedListData) { oListData = oWord?.nostrCuratedListData; }
  let name_singular = "";
  let name_plural = "";
  if (oListData.name) {
    name_singular = oListData.name.singular;
    name_plural = oListData.name.plural;
  }
  let title_singular = "";
  let title_plural = "";
  if (oListData.title) {
    title_singular = oListData.title.singular;
    title_plural = oListData.title.plural;
  }
  let description = "";
  if (oListData.description) {
    description = oListData.description;
  }
  return (
    <>
      <div style={{ padding: '5px', marginBottom: '5px', border: '1px solid blue', borderRadius: '5px' }}>
        <NavLink
          style={{}}
          onClick={() => {
            dispatch(updateCuratedListFocus(event.id));
          }}
          end to="/CuratedListsHome/ViewIndividualCuratedList"
        >
          {name_singular}
        </NavLink>
        <div>
          id: {event.id}
        </div>
        <div>
          author: {event.pubkey}
        </div>
        <div>
          created_at: {event.created_at}
        </div>
        <div>
          name: {name_singular}, {name_plural}
        </div>
        <div>
          title: {title_singular}, {title_plural}
        </div>
        <div>
          description: {description}
        </div>
      </div>
    </>
  );
}

export default List;
