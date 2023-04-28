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
        The <i>primary challenge</i> faced by a{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('decentralizedDistributedSystem'));
          }}
        >
          decentralized, distributed system
        </div>{' '}
        is to develop and manage common languages to meet the changing needs of
        dynamic networks (subsets of the system) in the absence of any centralized authority.
      </div>
    </>
  );
};
export default Content;
