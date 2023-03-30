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

  const e1 = document.getElementById('nostrProfileDisplaySizeSelector');
  const e2 = document.getElementById('curatedListInstanceYAxisSelector');
  if (e1) {
    e1.value = nostrProfileDisplaySize;
  }
  if (e2) {
    e2.value = curatedListInstanceYAxis;
  }

  const updateDisplayTabSettings = () => {
    const e1 = document.getElementById('nostrProfileDisplaySizeSelector');
    const e2 = document.getElementById('curatedListInstanceYAxisSelector');
    if (e1) {
      const newNostrProfileDisplaySizeValue = e1.value;
      dispatch(updateNostrProfileDisplaySize(newNostrProfileDisplaySizeValue));
      // console.log('updateDisplayTabSettings; newNostrProfileDisplaySizeValue: '+newNostrProfileDisplaySizeValue);
    }
    if (e2) {
      const newCuratedListInstanceYAxisValue = e2.value;
      dispatch(
        updateCuratedListInstanceYAxis(newCuratedListInstanceYAxisValue)
      );
      // console.log('updateDisplayTabSettings; newCuratedListInstanceYAxisValue: '+newCuratedListInstanceYAxisValue);
    }
  };
  return (
    <>
      <div style={{ textAlign: 'left' }} onChange={updateDisplayTabSettings}>
        <div style={{ marginTop: '20px' }}>
          <div className="h4">Nostr Profiles</div>
          <div>Each nostr profile is represented as a circle.</div>
          <div>
            The size of each circle represents:{' '}
            <select id="nostrProfileDisplaySizeSelector">
              <option value="influence" selected>
                influence
              </option>
              <option value="average">average</option>
              <option value="nothing">nothing</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div className="h4">Instances of Nostr Curated Lists</div>
          <div>Each instance is represented as a diamond.</div>
          <div>
            The <i>opacity</i> of each diamond is proportional to the{' '}
            <i>certainty</i> in its rating. More ratings by trusted users means
            higher certainty.
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
        <div style={{ marginTop: '20px' }}>
          <div className="h4">Ratings</div>
          <div>Blue arrows: ratings of one user by another user. These ratings are transitive.</div>
          <div>Red arrows: rating of an instance by a user. These are not transitive.</div>
          <div>
            The thickness of an arrow is proportional to the rating itself. A thick arrow
            is a favorable rating, while a thin arrow is an unfavorable one.
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div className="h4">Not yet implemented:</div>
          <div>opacity of circles and arrows to reflect certainty (similar to diamonds)</div>
        </div>
      </div>
    </>
  );
};
export default DisplayTab;
