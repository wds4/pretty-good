import { useSelector, useDispatch } from 'react-redux';
import GrapevineIsActive from './grapevineIsActive';
import GrapevineIsInactive from './grapevineIsInactive';
import TopPanel from './topPanel';

const GrapevineSettings = () => {
  const nostrGrapevineActivationState = useSelector((state) => state.nostrGlobalState.nostrGrapevineSettings.active);
  const dispatch = useDispatch();
  let activeBlockClassName = 'block_show';
  let inactiveBlockClassName = 'block_hide';
  if (!nostrGrapevineActivationState) {
    activeBlockClassName = 'block_hide';
    inactiveBlockClassName = 'block_show';
  }
  return (
    <>
      <TopPanel />
      <div className={activeBlockClassName}>
        <GrapevineIsActive />
      </div>
      <div className={inactiveBlockClassName}>
        <GrapevineIsInactive />
      </div>
    </>
  );
};
export default GrapevineSettings;
