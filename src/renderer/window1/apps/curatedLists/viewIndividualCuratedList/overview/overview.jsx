import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import AllInstances from './allInstances';

const List = ({curatedListFocusID, oListData}) => {
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
      <br />

      <div className="overPageItemContainer">
        <div className="overviewPageLeftCol">list name:</div>
        <div className="overviewPageRightCol">{name_plural}</div>
      </div>

      <div className="overPageItemContainer">
        <div className="overviewPageLeftCol">single instance:</div>
        <div className="overviewPageRightCol">{name_singular}</div>
      </div>

      <div className="overPageItemContainer">
        <div className="overviewPageLeftCol">description:</div>
        <div className="overviewPageRightCol">{description}</div>
      </div>

      <div className="overPageItemContainer">
        <div className="overviewPageLeftCol">author:</div>
        <div className="overviewPageRightCol" style={{ fontSize: '12px' }}>{pubkey}</div>
      </div>
    </>
  );
}

export default List;
