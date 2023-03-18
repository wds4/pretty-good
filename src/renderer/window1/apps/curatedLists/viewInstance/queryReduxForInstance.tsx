import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import QueryDbForInstance from './queryDbForInstance';

const QueryReduxForInstance = () => {
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const curatedListInstanceFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListInstanceFocus
  );
  return (
    <>
      <QueryDbForInstance
        curatedListInstanceFocusID={curatedListInstanceFocusID}
        curatedListFocusID={curatedListFocusID}
      />
    </>
  );
}

export default QueryReduxForInstance;
