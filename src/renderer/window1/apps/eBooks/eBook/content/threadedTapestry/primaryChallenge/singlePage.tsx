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
        The whole point of having a network is for Alice and Bob (any two
        members of the network) to have the ability to communicate in an
        efficient, effective, meaningful (per the standards of that network)
        manner, recognizing that network constituency and needs are dynamic. This requires coordination; it requires consensus on a common
        language; from general structure to small details. The better the
        consensus, the better the ability to communicate. They need to do this
        in the absence of any centralized authority.
      </div>
      <p>
        For any given solution to the above challenge, the requisite consensus
        for that solution to work is called <i>lock-in</i>. We propose the best
        (because it is a Schelling point? ...) solution is the one that
        minimizes lock-in, and that the threaded tapestry model is a contender
        for{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('lockInMinimization'));
          }}
        >
          lock-in minimization
        </div>
        .
      </p>
    </>
  );
};
export default Content;
