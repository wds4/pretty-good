import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetNumBackSteps,
  setCurrentPage,
  setTwoBackSteps,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';

const BackButton = () => {
  const dispatch = useDispatch();
  // let numBackSteps = useSelector((state) => state.prettyGoodGlobalState.numBackSteps);
  const currentPage = useSelector((state) => state.prettyGoodGlobalState.currentPage);
  let numBackSteps = 1;
  if (currentPage=="mainFeed") {
    numBackSteps = 2;
    dispatch(setTwoBackSteps());
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-numBackSteps);
    dispatch(resetNumBackSteps());
    dispatch(setCurrentPage("foo"));
  }

  return (
    <button
      id="backButton"
      type="button"
      onClick={() => handleClick()}
      className="mastheadBackButton"
    >
      <div style={{ fontSize: '20px' }}>🔙</div>
      <div style={{ fontSize: '10px', display: 'none' }}>{currentPage} - {numBackSteps}</div>
    </button>
  );
};
export default BackButton;
