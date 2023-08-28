import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { nip19 } from 'nostr-tools';
import { useSelector, useDispatch } from 'react-redux';
import BlankAvatar from 'renderer/window1/assets/blankAvatar.png';
import PlusImage from 'renderer/window1/assets/plus.png';
import MinusImage from 'renderer/window1/assets/minus.png';
import {
  updateNostrProfileFocus,
  updateNaddrListFocus,
  updateNip51ListFocusEventId,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { secsToTime } from 'renderer/window1/lib/pg';
import { noProfilePicUrl } from 'renderer/window1/const';
import { Tooltip } from 'react-tooltip';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const MiniProfile = ({ pubkey }) => {
  const dispatch = useDispatch();
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  /// // STEP 1 ///// First load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = '';
  let displayName = '';

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
          display: 'inline-block',
          width: '400px',
          float: 'right',
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
              onError={(event) => (event.target.src = noProfilePicUrl)}
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
              width: 'calc(100% - 60px)',
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
              <span style={{ color: 'grey', marginLeft: '10px' }}>{name}</span>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

const ToggleListInfo = ({ lowerPanelState, setLowerPanelState }) => {
  let toggleButtonImage = PlusImage;
  if (lowerPanelState == 'open') {
    toggleButtonImage = MinusImage;
  }
  if (lowerPanelState == 'closed') {
    toggleButtonImage = PlusImage;
  }
  const updateLowerPanelState = () => {
    console.log('updateLowerPanelState');
    if (lowerPanelState == 'open') {
      setLowerPanelState('closed');
    }
    if (lowerPanelState == 'closed') {
      setLowerPanelState('open');
    }
  };
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          width: '50px',
          height: '50px',
        }}
        onClick={updateLowerPanelState}
      >
        <img
          src={toggleButtonImage}
          alt=""
          style={{
            display: 'inline-block',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: '250px',
            width: '50%',
            height: '50%',
            margin: '0',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </>
  );
};

const ListName = ({ listName, event }) => {
  const naddr = nip19.naddrEncode({
    pubkey: event.pubkey,
    kind: event.kind,
    identifier: listName,
    relays: [],
  });
  const dispatch = useDispatch();
  return (
    <>
      <NavLink
        onClick={() => {
          dispatch(updateNaddrListFocus(naddr));
          dispatch(updateNip51ListFocusEventId(event.id));
        }}
        to="/NIP51Home/NIP51List"
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            display: 'inline-block',
            fontSize: '26px',
            marginLeft: '20px',
            marginTop: '10px',
          }}
        >
          {listName}
        </div>
      </NavLink>
    </>
  );
};

const LowerPanel = ({
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
  lowerPanelState,
}) => {
  if (lowerPanelState == 'closed') return <></>;
  return (
    <>
      <div
        style={{
          color: 'grey',
          padding: '10px',
        }}
      >
        <div style={{ display: 'inline-block' }}>
          {aTags_a.length + aTags_e.length + aTags_p.length + aTags_t.length}{' '}
          items
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          {displayTime} ago
        </div>
      </div>
    </>
  );
};

const SingleListOverview = ({
  event,
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
  const [lowerPanelState, setLowerPanelState] = useState('closed');
  return (
    <>
      <div
        className="singleListOverviewContainer"
        data-listkind={kind}
        data-numitems={
          aTags_a.length + aTags_e.length + aTags_p.length + aTags_t.length
        }
        data-numlists={aTags_a.length}
        data-numevents={aTags_e.length}
        data-numpeople={aTags_p.length}
        data-numstrings={aTags_t.length}
        data-eventid={eventid}
        style={{
          border: '1px dashed grey',
          borderRadius: '5px',
          textAlign: 'left',
          padding: '5px',
          marginBottom: '5px',
          overflow: 'visible',
        }}
      >
        <div>
          <ToggleListInfo
            lowerPanelState={lowerPanelState}
            setLowerPanelState={setLowerPanelState}
          />
          <ListName listName={listName} event={event} />
          <SingleListInfoBox listName={listName} event={event} />
          <MiniProfile pubkey={pk_author} />
        </div>
        <LowerPanel
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
          eventid={eventid}
          lowerPanelState={lowerPanelState}
        />
      </div>
    </>
  );
};

const SingleListInfoBox = ({
  listName,
  event
}) => {
  const noteID = nip19.noteEncode(event.id);
  const naddr = nip19.naddrEncode({
    pubkey: event.pubkey,
    kind: event.kind,
    identifier: listName,
    relays: [],
  });
  const npub = nip19.npubEncode(event.pubkey);

  const copyNaddr = () => {
    navigator.clipboard.writeText(naddr);
    // Alert the copied text
    alert("Copied the text: " + naddr);
  }
  const copyNoteID = () => {
    navigator.clipboard.writeText(noteID);
    // Alert the copied text
    alert("Copied the text: " + noteID);
  }
  const copyUserNpub = () => {
    navigator.clipboard.writeText(npub);
    // Alert the copied text
    alert("Copied the text: " + npub);
  }

  let tooltipHTML = "<div  ";
  tooltipHTML += " style=color:red;padding:5px;font-size:14px;text-align:center; ";
  tooltipHTML += ' >';
  tooltipHTML += "<div class=tooltipButton id=tooltipButtonC_"+event.id+" >copy note naddr</div>";
  tooltipHTML += "<div class=tooltipButton id=tooltipButtonA_"+event.id+" >copy note id</div>";
  tooltipHTML += "<div class=tooltipButton id=tooltipButtonB_"+event.id+" >copy user npub</div>";
  tooltipHTML += "</div>";

  const establishListeners = () => {
    const e1 = document.getElementById("tooltipButtonA_"+event.id);
    const e2 = document.getElementById("tooltipButtonB_"+event.id);
    const e3 = document.getElementById("tooltipButtonC_"+event.id);
    if (e1) {
      e1.onclick = copyNoteID;
    }
    if (e2) {
      e2.onclick = copyUserNpub;
    }
    if (e3) {
      e3.onclick = copyNaddr;
    }
  }

  const anchorSelect="#moreInfoSelector_"+event.id;
  const aId = "moreInfoSelector_"+event.id;

  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={tooltipHTML}
        clickable
        className="reactTooltip"
        place="left"
      />
      <a
        style={{

          height: '30px',
          textAlign: 'center',
          float: 'right',
        }}
        id={aId}
        onMouseLeave={establishListeners}
      >
        ○ ○ ○
      </a>
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
            event={event}
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
      </div>
      <div style={{ textAlign: 'left' }}>
        <TechDetailsForNostrNerds event={event} />
      </div>
    </>
  );
};
export default SingleListOverviewWrapper;
