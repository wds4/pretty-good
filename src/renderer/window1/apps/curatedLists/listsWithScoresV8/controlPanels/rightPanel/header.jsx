import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import SeedUserSelector from '../topControlPanel/seedUserSelector';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import MiniProfile from './miniProfile';

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
      <div style={{marginBottom: '10px'}}>
        <div
          style={{
            marginLeft: '20px',
            marginRight: '10px',
            fontSize: '12px',
            textAlign: 'right',
            color: 'grey',
            display: 'inline-block',
          }}
        >
          CURATION<br/>of the list of:
        </div>
        <NavLink
          end
          to="/CuratedListsHome/ViewIndividualCuratedList"
          style={{ textDecoration: 'none' }}
        >
          <div className="curatedListMainPageListName">
            {name_plural}
          </div>
        </NavLink>
      </div>

      <div
        className="h4"
        style={{ display: 'none', marginBottom: '5px', paddingTop: '25px', position: 'relative',textAlign: 'center' }}
      >
        <NavLink
          end
          to="/CuratedListsHome/ViewIndividualCuratedList"
          style={{ textDecoration: 'none' }}
        >
          <div className="curatedListMainPageListName">
            {name_plural}
          </div>
        </NavLink>
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
          CURATION<br/>of the list of:
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
              style={{ display: 'none' }}
            >
              VISUALIZE how<br/>this is determined
            </div>
          </NavLink>
        </div>
        <div style={{textAlign: 'center', marginLeft: '20px'}}>
          <NavLink
            to="/CuratedListsHome/ViewIndividualCuratedList"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="curatedListMainPageLink2"
              style={{  }}
            >
              overview
            </div>
          </NavLink>

          <NavLink
            to="/CuratedListsHome/CuratedListAllItemsSql"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="curatedListMainPageLink2"
              style={{  }}
            >
              view items
            </div>
          </NavLink>

          <NavLink
            to="/CuratedListsHome/CreateNewCuratedListInstance"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="curatedListMainPageLink2"
              style={{  }}
            >
              add new item
            </div>
          </NavLink>

          <NavLink
            to="/CuratedListsHome/SingleListGraphOfInstances"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="curatedListMainPageLink2"
              style={{  }}
            >
              view graph
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
            as determined by:
          </div>

          <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <MiniProfile pubkey={seedUser} />
          </div>

          <div style={{ textAlign: 'right', marginRight: '20px' }}>
            <span style={{ color: 'grey', fontSize: '12px' }}>seed user:</span>
            <SeedUserSelector
              aProfileCompScoreData={aProfileCompScoreData}
              nodes={nodes}
              aAllUserNodes={aAllUserNodes}
            />
          </div>
          <TechDetailsForNostrNerds2 />
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

      </div>
    </>
  );
};

export default Header;
