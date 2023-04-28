import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentItemFocus } from 'renderer/window1/redux/features/eBooks/slice';

const Content = () => {
  const dispatch = useDispatch();
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div>
        The achievement of <i>loose consensus</i> is the solution to the{' '}
        <i>problem of coordination</i> of a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('decentralizedDistributedSystem'));
          }}
        >
          decentralized, distributed system
        </div>
        .
      </div>
    </>
  );
};
export default Content;
