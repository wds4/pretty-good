import { useSelector } from 'react-redux';
import QueryDbForList from './queryDbForList';

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
