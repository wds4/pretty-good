import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import QueryDbForList from './queryDb';

const QueryReduxForListFocus = () => {
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  return (
    <>
      <QueryDbForList curatedListFocusID={curatedListFocusID} />
    </>
  );
}

export default QueryReduxForListFocus;
