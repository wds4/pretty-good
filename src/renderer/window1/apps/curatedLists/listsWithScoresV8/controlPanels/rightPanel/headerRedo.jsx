import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import SeedUserSelectorRedo from '../topControlPanel/seedUserSelectorRedo';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const HeaderRedo = ({
  oMyNostrProfileData,
  nodes,
  aAllUserNodes,
  aProfileCompScoreData,
  oNostrProfilesData,
  oCuratedListData,
  curatedListEventId,
}) => {
  const { seedUser } = useSelector((state) => state.controlPanelSettings);
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let seedUserName = "..." + seedUser.substr(-6);
  if (nostrProfiles.hasOwnProperty(seedUser)) {
    const profileContent = JSON.parse(nostrProfiles[seedUser].content);
    const name = `@${profileContent.name}`;
    const displayName = profileContent.display_name;
    seedUserName = name;
  }
  if (!seedUserName) {
    seedUserName = "..." + seedUser.substr(-6);
  }

  const dispatch = useDispatch();
  let name_plural = '';
  let description = '';
  let event_id = curatedListEventId;
  if (oCuratedListData) {
    name_plural = oCuratedListData.name.plural;
    description = oCuratedListData?.description;
  }

  return (
    <>
      <div>
        <div
          className="h4"
          style={{ marginBottom: '10px', position: 'relative' }}
        >
          <div style={{ color: 'purple', fontSize: '32px' }}>
            <NavLink
              onClick={() => {
                dispatch(updateCuratedListFocus(event_id));
              }}
              end
              to="/CuratedListsHome/ViewIndividualCuratedList"
              style={{ textDecoration: 'none' }}
            >
              {name_plural}
            </NavLink>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '10px',
              fontSize: '10px',
              textAlign: 'right',
              color: 'grey',
              fontSize: '12px',
            }}
          >
            CURATION of
            <br />
            the list of:
          </div>
          <div
            style={{
              position: 'absolute',
              right: '5px',
              top: '0px',
            }}
          >
            <NavLink
              onClick={() => {
                dispatch(updateCuratedListFocus(event_id));
              }}
              end
              to="/CuratedListsHome/SingleListGraphOfInstances"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="curatedListMainPageLink"
                style={{  }}
              >
                VISUALIZE how<br/>this is determined
              </div>
            </NavLink>
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '0px', position: 'relative' }}>
            <div
              style={{
                textAlign: 'center',
                fontSize: '12px',
                position: 'absolute',
                left: '20px',
                top: '5px',
                color: 'grey',
              }}
            >
              as determined by::
            </div>

            <div style={{ textAlign: 'center', marginBottom: '5px' }}>
              <span
                style={{ textAlign: 'center', color: 'blue', fontSize: '18px' }}
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
              's grapevine
            </div>
            <div style={{ textAlign: 'right', marginRight: '20px' }}>
              <span style={{ color: 'grey', fontSize: '12px' }}>seed user:</span>
              <SeedUserSelectorRedo
                nodes={nodes}
                aAllUserNodes={aAllUserNodes}
                oNostrProfilesData={oNostrProfilesData}
              />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '10px' }}>
          <div style={{ fontSize: '12px', color: 'grey' }}>list description:</div>
          <div
            style={{
              maxHeight: '100px',
              scroll: 'auto',
              fontSize: '14px',
              textAlign: 'left',
              color: 'black',
              marginBottom: '5px',
            }}
          >
            {description}
          </div>

          <TechDetailsForNostrNerds />
        </div>
      </div>
    </>
  );
};

export default HeaderRedo;
