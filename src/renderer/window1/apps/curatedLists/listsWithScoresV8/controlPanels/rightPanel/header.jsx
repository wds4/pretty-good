import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import SeedUserSelector from '../topControlPanel/seedUserSelector';

const Header = ({
  oListData,
  oMyNostrProfileData,
  nodes,
  aAllUserNodes,
  aProfileCompScoreData,
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
  let name_singular = '';
  let name_plural = '';
  let title_singular = '';
  let title_plural = '';
  let slug_singular = '';
  let slug_plural = '';
  let description = '';
  let oWord = {};
  let sqlID = '';
  let oEvent = {};

  let pubkey = '';
  let event_id = '';
  let propertyPath = '';
  let sEvent = '';

  if (oListData) {
    pubkey = oListData.pubkey;
    event_id = oListData.event_id;
    sqlID = oListData.id;

    sEvent = oListData.event;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;

      oWord = JSON.parse(sWord);
      if (oWord.nostrCuratedListData) {
        if (oWord.nostrCuratedListData.name) {
          name_singular = oWord.nostrCuratedListData.name?.singular;
          name_plural = oWord.nostrCuratedListData.name?.plural;
        }
        if (oWord.nostrCuratedListData.title) {
          title_singular = oWord.nostrCuratedListData.title?.singular;
          title_plural = oWord.nostrCuratedListData.title?.plural;
        }
        if (oWord.nostrCuratedListData.slug) {
          slug_singular = oWord.nostrCuratedListData.slug?.singular;
          slug_plural = oWord.nostrCuratedListData.slug?.plural;
        }
        if (oWord.nostrCuratedListData.description) {
          description = oWord.nostrCuratedListData?.description;
        }
        if (oWord.nostrCuratedListData.propertyPath) {
          propertyPath = oWord.nostrCuratedListData?.propertyPath;
        }
      }
    }
  }

  return (
    <>
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

          <div style={{ marginBottom: '5px' }}>
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
            <SeedUserSelector
              oMyNostrProfileData={oMyNostrProfileData}
              aProfileCompScoreData={aProfileCompScoreData}
              nodes={nodes}
              aAllUserNodes={aAllUserNodes}
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'left', marginLeft: '20px' }}>
        <div style={{ fontSize: '12px', color: 'grey' }}>list description:</div>
        <div
          style={{
            maxHeight: '100px',
            scroll: 'auto',
            fontSize: '14px',
            textAlign: 'left',
            color: 'black',
            marginBottom: '10px',
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          color: 'grey',
          textAlign: 'left',
          fontSize: '14px',
          marginLeft: '20px',
          marginBottom: '10px',
          marginRight: '20px',
        }}
      >
        Using endorsements of list items and endorsements of users as list
        curators, your grapevine curates lists for you. Your crowdsourced
        results may or may not match someone else's results. If the list is
        important enough to garner sufficient attention and studied input, the
        community may converge to similar or identical results via the process of{' '}
        <a
          href="https://github.com/wds4/DCoSL/blob/main/glossary/looseConsensus.md"
          target="_blank"
          rel="noreferrer"
          style={{textDecoration: 'none'}}
        >
          loose consensus
        </a>
        . Select different seed users (selector on the upper right) to find out whose
        grapevines agree and whose don't!
        <br />
        <div style={{ marginTop: '5px' }}>
          Visualize the crowdsourcing process and find out how it works{' '}
          <span style={{ color: 'blue' }}>
            <NavLink
              onClick={() => {
                dispatch(updateCuratedListFocus(event_id));
              }}
              end
              to="/CuratedListsHome/SingleListGraphOfInstances"
              style={{ textDecoration: 'none' }}
            >
              here
            </NavLink>
          </span>
          .
        </div>
      </div>
    </>
  );
};

export default Header;
