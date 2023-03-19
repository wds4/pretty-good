import { useSelector } from 'react-redux';
import QueryDbForList from './queryDbForList';

const QueryReduxForListFocus = () => {
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const curatedListProfileFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListProfileFocus
  );
  return (
    <>
      <QueryDbForList
        curatedListFocusID={curatedListFocusID}
        curatedListProfileFocusID={curatedListProfileFocusID}
      />
    </>
  );
}

export default QueryReduxForListFocus;
