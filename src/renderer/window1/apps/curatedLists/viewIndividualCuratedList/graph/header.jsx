import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';

const Header = ({ curatedListFocusID, oListData }) => {
  const dispatch = useDispatch();
  const { seedUser } = useSelector((state) => state.controlPanelSettings);
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  let seedUserName = seedUser;
  if (nostrProfiles.hasOwnProperty(seedUser)) {
    const profileContent = JSON.parse(nostrProfiles[seedUser].content);
    const name = `@${profileContent.name}`;
    const displayName = profileContent.display_name;
    seedUserName = name;
  }
  if (!seedUserName) {
    seedUserName = seedUser;
  }

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
      <div className="h4" style={{ marginBottom: '10px' }}>
        Curation of the list of{' '}
        <span style={{ color: 'purple', fontSize: '24px' }}>{name_plural}</span>{' '}
        by
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
      <div style={{ display: 'none', textAlign: 'left', fontSize: '12px', marginLeft: '20px', marginBottom: '10px', marginRight: '20px' }}>
        Endorsements of list items are used to curate lists for you.
        Endorsements of users are used to determine who can influence your list.
        Your crowdsourced results may or may not match someone else's results.
        Select a different seed user (selector on the right) to find out!
      </div>
    </>
  );
};

export default Header;
