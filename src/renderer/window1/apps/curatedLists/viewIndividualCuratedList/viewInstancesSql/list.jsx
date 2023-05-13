import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import AllInstances from './allInstancesSql';

const List = ({curatedListFocusID, oListData, aListItemsData}) => {
  let name_singular = "";
  let name_plural = "";
  let title_singular = "";
  let title_plural = "";
  let slug_singular = "";
  let slug_plural = "";
  let description = "";
  let oWord = {};
  let sqlID = "";
  let oEvent = {};

  let pubkey = "";
  let event_id = "";
  let propertyPath = "";
  let sEvent = "";

  if (oListData) {
    pubkey = oListData.pubkey;
    event_id = oListData.event_id;
    sqlID = oListData.id;

    sEvent = oListData.event;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;

      oWord = JSON.parse(sWord);
      if (oWord.nostrCuratedListData) {
        if (oWord.nostrCuratedListData.name) {
          name_singular = oWord.nostrCuratedListData.name?.singular;
          name_plural = oWord.nostrCuratedListData.name?.plural;
        }
        if (oWord.nostrCuratedListData.title) {
          title_singular = oWord.nostrCuratedListData.title?.singular;
          title_plural = oWord.nostrCuratedListData.title?.plural;
        }
        if (oWord.nostrCuratedListData.slug) {
          slug_singular = oWord.nostrCuratedListData.slug?.singular;
          slug_plural = oWord.nostrCuratedListData.slug?.plural;
        }
        if (oWord.nostrCuratedListData.description) {
          description = oWord.nostrCuratedListData?.description;
        }
        if (oWord.nostrCuratedListData.propertyPath) {
          propertyPath = oWord.nostrCuratedListData?.propertyPath;
        }
      }
    }
  }

  return (
    <>
      <div className="h3" >{name_plural}</div>
      <AllInstances
        parentConceptNostrEventID={event_id}
        parentConceptSlug={slug_singular}
        parentConceptPropertyPath={propertyPath}
        oParentEvent={oEvent}
        aListItemsData={aListItemsData}
      />
    </>
  );
}

export default List;
