import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStrat2Coeff } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const Mod2Tab = () => {
  const dispatch = useDispatch();
  const { strat2Coeff } = useSelector((state) => state.controlPanelSettings);
  const [s2Coeff, setS2Coeff] = useState(strat2Coeff);

  const updateStrat2CoeffValue = () => {
    const e1 = document.getElementById('strat2CoeffSliderElem');
    const e2 = document.getElementById('strat2CoeffValueContainer');
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setS2Coeff(e1.value);
      dispatch(updateStrat2Coeff(e1.value));
    }
  };
  return (
    <>
      <div className="h5" style={{ marginBottom: '8px' }}>
        Defense Modification #2 Tab
      </div>
      <div style={{ marginBottom: '8px' }}>Bidirectionality</div>

      <div>
        <div>
          <div style={{ display: 'inline-block', fontSize: '12px' }}>
            Mod 2 FACTOR:
          </div>
          <div
            id="strat2CoeffValueContainer"
            style={{
              display: 'inline-block',
              marginLeft: '10px',
              width: '30px',
              fontSize: '12px',
            }}
          >
            {s2Coeff / 100}
          </div>
        </div>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '12px',
          }}
        >
          OFF
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '200px',
            marginLeft: '10px',
          }}
        >
          <input
            onChange={updateStrat2CoeffValue}
            id="strat2CoeffSliderElem"
            type="range"
            min="0"
            max="100"
            className="pgslider"
            defaultValue={s2Coeff}
          />
        </div>
        <div
          style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '12px',
          }}
        >
          ON
        </div>
      </div>

      <div style={{ fontSize: '12px' }}>
        <div
          style={{ textAlign: 'left', marginTop: '10px', fontStyle: 'italic' }}
        >
          Problem: What if Malicious User #1 and Malicious User #2 use the
          grapevine trust system so that each rates the other with trust scores
          much greater than 1? Won't this cause an unstable positive feedback
          loop?
        </div>

        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          Trust ratings affect the rater's average as well as the ratee's
          (assuming the rater is the reference user). In theory this is more
          appropriate, since by definition, grapevine trust ratings are relative
          trust ratings between two users. This also mitigates certain types of
          attacks such as a group of malicious user accounts upvoting each other
          within a group to bootstrap reputation. When this modification is
          fully engaged, if Malicious User #1 upvotes Malicious User #2, it has
          the effect of decreasing MU1's trust score as much as it increases
          MU2's score.
        </div>
      </div>
    </>
  );
};
export default Mod2Tab;
