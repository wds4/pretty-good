const UsersTab = () => {
  const e1 = document.getElementById('usersDefaultAverageScoreSliderElem');
  const e2 = document.getElementById('usersDefaultAverageScoreValueContainer');
  const updateDefaultUserAverageSliderValue = () => {
    if (e1 && e2) {
      e2.innerHTML = e1.value / 100;
    }
  };

  const e3 = document.getElementById('usersDefaultConfidenceSliderElem');
  const e4 = document.getElementById('usersDefaultConfidenceValueContainer');
  const updateDefaultUserConfidenceSliderValue = () => {
    if (e3 && e4) {
      e3.innerHTML = e4.value / 100;
    }
  };
  return (
    <>
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
                0.1
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
                  defaultValue={10}
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
              >0.20</div>
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
                  defaultValue={20}
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
