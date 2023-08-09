import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { secsToTime } from 'renderer/window1/lib/pg';
import { noProfilePicUrl } from 'renderer/window1/const';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const SelectListButton = ({}) => {
  const addList = () => {};
  return (
    <>
      <button
        type="button"
        className="nip51Button"
        style={{
          border: '2px solid GREEN',
          color: 'black',
          padding: '5px',
          borderRadius: '5px',
          fontSize: '22px',
          boxSizing: 'border-box',
          height: '50px',
          width: '50px',
        }}
        onClick={addList}
      >
        ✔️
      </button>
    </>
  );
};

const MiniProfile = ({pubkey}) => {
  const dispatch = useDispatch();
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  /// // STEP 1 ///// First load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = '';
  let displayName = '';
  let about = '';

  /// // STEP 2 ///// If already present in redux store, replace with that
  let profileContent = {};
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    profileContent = JSON.parse(nostrProfiles[pubkey].content);
    name = `@${profileContent.name}`;
    displayName = profileContent.display_name;
    if (profileContent.picture) {
      avatarUrl = profileContent.picture;
    } else {
      avatarUrl = BlankAvatar;
    }
  }
  return (
    <>
      <div
        style={{
          textAlign: 'left',
          boxSizing: 'border-box',
          height: '50px',
          borderRadius: '5px',
          marginLeft: '20px',
        }}
      >
        <NavLink
          onClick={() => {
            dispatch(updateNostrProfileFocus(pubkey));
          }}
          to="/NostrHome/NostrViewProfile"
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
          >
            <img
              src={avatarUrl}
              alt=""
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '250px',
                width: '75%',
                height: '75%',
                margin: '0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          <div
            style={{
              height: '100%',
              display: 'inline-block',
              width: 'calc(86% - 70px)',
              borderRadius: '5px',
              marginLeft: '5px',
              padding: '2px',
              fontSize: '18px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                color: 'black',
                marginRight: '10px',
                marginTop: '8px',
                maxWidth: '80%',
                overflow: 'auto',
                paddingLeft: '3px',
              }}
            >
              <span style={{ color: 'black' }}>{displayName}</span>
              <span style={{ color: 'grey', marginLeft: '10px' }}>
                {name}
              </span>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  )
}

const SingleListOverview = ({
  kind,
  listName,
  pk_author,
  displayTime,
  listType,
  aTags_a,
  aTags_e,
  aTags_p,
  aTags_t,
  searchStringForLists,
  eventid,
}) => {
  return (
    <>
      <div
        className="singleListOverviewContainer"
        data-listkind={kind}
        data-numitems={aTags_a.length + aTags_e.length + aTags_p.length + aTags_t.length}
        data-numlists={aTags_a.length}
        data-numevents={aTags_e.length}
        data-numpeople={aTags_p.length}
        data-numstrings={aTags_t.length}
        data-eventid={eventid}
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          textAlign: 'left',
          padding: '5px',
          marginBottom: '5px',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '60%',
          }}
        >
          <div
            style={{
              fontSize: '22px',
            }}
          >
            {listName}
          </div>
          <div><MiniProfile pubkey={pk_author} /></div>
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '40%',
            textAlign: 'right',
            color: 'grey',
          }}
        >
          <div style={{}}>{listType}</div>
          <div>{displayTime} ago</div>
          <div>
            {aTags_a.length + aTags_e.length + aTags_p.length + aTags_t.length} (
            {aTags_a.length} lists,
            {aTags_e.length} notes,
            {aTags_p.length} people,
            {aTags_t.length} text
            )
          </div>
        </div>
      </div>
    </>
  );
};

const SingleListOverviewWrapper = ({
  event,
  showKind10000,
  showKind10001,
  showKind30000,
  showKind30001,
  showTagsA,
  showTagsE,
  showTagsP,
  showTagsT,
  searchStringForLists,
}) => {
  const pk_author = event.pubkey;
  const { kind } = event;
  const displayTime = secsToTime(event.created_at);

  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  let listName = '';
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }

  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');

  let showThisListByTagsCriterion = false;
  if (showTagsA == 1) {
    if (aTags_a.length > 0) {
      showThisListByTagsCriterion = true;
    }
  }
  if (showTagsE == 1) {
    if (aTags_e.length > 0) {
      showThisListByTagsCriterion = true;
    }
  }
  if (showTagsP == 1) {
    if (aTags_p.length > 0) {
      showThisListByTagsCriterion = true;
    }
  }
  if (showTagsT == 1) {
    if (aTags_t.length > 0) {
      showThisListByTagsCriterion = true;
    }
  }

  let listType = '';
  let showThisListByKindCriterion = false;
  if (kind == 10000) {
    listType = 'Mute';
    if (showKind10000 == 1) {
      showThisListByKindCriterion = true;
    }
  }
  if (kind == 10001) {
    listType = 'Pin';
    if (showKind10001 == 1) {
      showThisListByKindCriterion = true;
    }
  }
  if (kind == 30000) {
    listType = 'People';
    if (showKind30000 == 1) {
      showThisListByKindCriterion = true;
    }
  }
  if (kind == 30001) {
    listType = 'Bookmarks';
    if (showKind30001 == 1) {
      showThisListByKindCriterion = true;
    }
  }

  let showThisListBySearchStringCriterion = true;
  if (searchStringForLists) {
    showThisListBySearchStringCriterion = false;
    if (listName.includes(searchStringForLists)) {
      showThisListBySearchStringCriterion = true;
    }
  }

  if (!showThisListBySearchStringCriterion) {
    return <></>;
  }
  if (!showThisListByKindCriterion) {
    return <></>;
  }
  if (!showThisListByTagsCriterion) {
    return <></>;
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div
          style={{
            minWidth: '175px',
            flexGrow: '999',
          }}
        >
          <SingleListOverview
            kind={kind}
            listName={listName}
            pk_author={pk_author}
            displayTime={displayTime}
            listType={listType}
            aTags_a={aTags_a}
            aTags_e={aTags_e}
            aTags_p={aTags_p}
            aTags_t={aTags_t}
            searchStringForLists={searchStringForLists}
            eventid={event.id}
          />
        </div>
        <div
          style={{
            width: '50px',
            flexGrow: '1',
          }}
        >
          <SelectListButton />
        </div>
      </div>
      <div style={{ textAlign: 'left' }}>
        <TechDetailsForNostrNerds event={event} />
      </div>
    </>
  );
};
export default SingleListOverviewWrapper;
