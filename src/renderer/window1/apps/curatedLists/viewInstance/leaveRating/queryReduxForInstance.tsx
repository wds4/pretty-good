import { useSelector } from 'react-redux';
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
