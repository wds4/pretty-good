import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Instance = ({curatedListInstanceFocusID, oInstanceSqlData}) => {
  let pk_author = "";
  let oWord = {};
  let oEvent = {};

  if (oInstanceSqlData) {
    const sEvent = oInstanceSqlData.event;
    const parentConceptSlug = oInstanceSqlData.parentConceptSlug
    const parentConceptNostrEventID = oInstanceSqlData.parentConceptNostrEventID
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;
      oWord = JSON.parse(sWord);
    }
  }
  pk_author = oEvent?.pubkey;

  return (
    <>
      <div>pk_author: {pk_author}</div>
      <div>{JSON.stringify(oWord,null,4)}</div>
    </>
  );
}

export default Instance;
