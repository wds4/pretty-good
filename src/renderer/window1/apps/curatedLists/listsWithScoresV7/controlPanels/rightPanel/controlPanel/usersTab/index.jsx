import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDefaultUserTrustAverageScore,
  updateDefaultUserTrustConfidence,
} from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

const UsersTab = () => {
  const dispatch = useDispatch();
  const { defaultUserTrustAverageScore, defaultUserTrustConfidence } =
    useSelector((state) => state.controlPanelSettings);
  const [defAvg, setDefAvg] = useState(defaultUserTrustAverageScore);
  const [defCon, setDefCon] = useState(defaultUserTrustConfidence);

  const updateDefaultUserAverageSliderValue = () => {
    const e1 = document.getElementById('usersDefaultAverageScoreSliderElem');
    const e2 = document.getElementById(
      'usersDefaultAverageScoreValueContainer'
    );
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
      setDefAvg(e1.value);
      dispatch(updateDefaultUserTrustAverageScore(e1.value));
    }
  };

  const updateDefaultUserConfidenceSliderValue = () => {
    const e3 = document.getElementById('usersDefaultConfidenceSliderElem');
    const e4 = document.getElementById('usersDefaultConfidenceValueContainer');
    if (e3 && e4) {
      e4.innerHTML = e3.value / 100;
      setDefCon(e3.value);
      dispatch(updateDefaultUserTrustConfidence(e3.value));
    }
  };
  return (
    <>
      <div style={{ textAlign: 'left', margin: '0px 10px 10px 10px' }}>
        An 'unvetted' user is one who has received no ratings by anyone in your
        Grapevine (or at least no one with any influence). For unvetted users, a
        default score is used. Adjust this default score (left) and the amount
        of weight you want to give to this score (right). Once a user has
        received sufficient attention by your Grapevine, the default score will
        be ignored completely.
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              border: '1px solid black',
              borderRadius: '5px',
              width: '45%',
              padding: '5px',
            }}
          >
            <div style={{ fontSize: '14px', marginLeft: '5px' }}>
              default avg score:
            </div>
            <div style={{ marginTop: '10px' }}>
              <div
                id="usersDefaultAverageScoreValueContainer"
                style={{
                  display: 'inline-block',
                  width: '30px',
                  marginLeft: '10px',
                }}
              >
                {defAvg / 100}
              </div>
              <div
                id="usersDefaultAverageScoreSlider"
                style={{
                  display: 'inline-block',
                  width: '75%',
                  marginLeft: '5px',
                }}
              >
                <input
                  onChange={updateDefaultUserAverageSliderValue}
                  id="usersDefaultAverageScoreSliderElem"
                  type="range"
                  min="0"
                  max="100"
                  className="pgslider"
                  defaultValue={defAvg}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-block',
              border: '1px solid black',
              borderRadius: '5px',
              width: '45%',
              padding: '5px',
              marginLeft: '10px',
            }}
          >
            <div style={{ fontSize: '14px', marginLeft: '5px' }}>
              confidence:
            </div>
            <div style={{ marginTop: '10px' }}>
              <div
                id="usersDefaultConfidenceValueContainer"
                style={{
                  display: 'inline-block',
                  width: '30px',
                  marginLeft: '10px',
                }}
              >
                {defCon / 100}
              </div>
              <div
                id="usersDefaultConfidenceSlider"
                style={{
                  display: 'inline-block',
                  width: '75%',
                  marginLeft: '5px',
                }}
              >
                <input
                  onChange={updateDefaultUserConfidenceSliderValue}
                  id="usersDefaultConfidenceSliderElem"
                  type="range"
                  min="0"
                  max="100"
                  className="pgslider"
                  defaultValue={defCon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UsersTab;
