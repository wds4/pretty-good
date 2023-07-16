import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import SeedUserSelector from './controlPanels/topControlPanel/seedUserSelector';
import AttenuationFactorSelector from './controlPanels/topControlPanel/attenuationFactorSlider';

const Header = ({aProfileCompScoreData,oNostrProfilesData}) => {
  const dispatch = useDispatch();
  let seedUserName = "seedUserName";
  const { seedUser } = useSelector(
    (state) => state.controlPanelSettings
  );
  if (oNostrProfilesData.hasOwnProperty(seedUser)) {
    const oEvent = JSON.parse(oNostrProfilesData[seedUser].event);
    const oContent = JSON.parse(oEvent.content);
    seedUserName = oContent?.name;
  }
  return (
    <>
      <div className="h4" style={{ marginBottom: '10px' }}>
        Curation of the list of TOPICS by
        <span
          style={{
            marginLeft: '5px',
            textAlign: 'center',
            color: 'blue',
            fontSize: '18px',
          }}
        >
          <NavLink
            onClick={() => {
              dispatch(updateNostrProfileFocus(seedUser));
            }}
            to="/NostrHome/NostrViewProfile"
            className="goToUserProfileButton"
          >
            {seedUserName}
          </NavLink>
        </span>
        's Grapevine
      </div>
      <AttenuationFactorSelector />
      <SeedUserSelector
        aProfileCompScoreData={aProfileCompScoreData}
        oNostrProfilesData={oNostrProfilesData}
      />
    </>
  );
};

export default Header;
