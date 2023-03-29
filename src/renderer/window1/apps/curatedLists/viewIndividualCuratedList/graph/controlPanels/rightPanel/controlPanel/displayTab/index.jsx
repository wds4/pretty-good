import { useSelector, useDispatch } from 'react-redux';
import {
  updateNostrProfileDisplaySize,
  updateCuratedListInstanceYAxis,
} from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const DisplayTab = () => {
  const dispatch = useDispatch();
  const { nostrProfileDisplaySize, curatedListInstanceYAxis } = useSelector(
    (state) => state.controlPanelSettings
  );

  const e1 = document.getElementById("nostrProfileDisplaySizeSelector");
  const e2 = document.getElementById("curatedListInstanceYAxisSelector");
  if (e1) {
    e1.value = nostrProfileDisplaySize;
  }
  if (e2) {
    e2.value = curatedListInstanceYAxis;
  }

  const updateDisplayTabSettings = () => {
    const e1 = document.getElementById("nostrProfileDisplaySizeSelector");
    const e2 = document.getElementById("curatedListInstanceYAxisSelector");
    if (e1) {
      const newNostrProfileDisplaySizeValue = e1.value;
      dispatch(updateNostrProfileDisplaySize(newNostrProfileDisplaySizeValue));
      // console.log('updateDisplayTabSettings; newNostrProfileDisplaySizeValue: '+newNostrProfileDisplaySizeValue);
    }
    if (e2) {
      const newCuratedListInstanceYAxisValue = e2.value;
      dispatch(updateCuratedListInstanceYAxis(newCuratedListInstanceYAxisValue));
      // console.log('updateDisplayTabSettings; newCuratedListInstanceYAxisValue: '+newCuratedListInstanceYAxisValue);
    }
  };
  return (
    <>
      <div style={{ textAlign: 'left' }} onChange={updateDisplayTabSettings}>
        <div>
          The size of each user will represent:{' '}
          <select id="nostrProfileDisplaySizeSelector">
            <option value="influence" selected>
              influence
            </option>
            <option value="average">average</option>
            <option value="nothing">nothing</option>
          </select>
        </div>
        <div>
          Each instance's position on the y-axis will represent:{' '}
          <select id="curatedListInstanceYAxisSelector">
            <option value="influence">influence</option>
            <option value="average" selected>
              average
            </option>
          </select>
        </div>
      </div>
    </>
  );
};
export default DisplayTab;
