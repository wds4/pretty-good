import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import {
  updateNostrProfileFocus,
  updateNostrProfilePanelSelector,
  updateNaddrListFocus,
  updateNip51ListFocusEventId,
  updateMainNostrFeedFilter,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { updateCurrentApp } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import DownloadLists from './downloadLists';
import TopPanel from '../components/topPanel';
// import TopPanelButtons from '../components/topPanelButtons';
// import TopPanelDisplay from '../components/topPanelDisplay';
import LoadLists from '../loadLists/lists';

const QuestionMark = ({ content }) => {
  let html = '<div style=font-size:24px; >';
  html += tooltipContent.lists[content];
  html += '</div>';
  const id = `questionMarkInfoBox_${content}`;
  const anchorSelect = `#questionMarkInfoBox_${content}`;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={html}
        clickable
        className="reactTooltip"
        place="bottom"
      />
      <a id={id}>
        <div
          className="questionMarkInfoBox"
          style={{
            margin: 'auto',
            display: 'inline-block',
            border: '1px solid black',
            width: '20px',
            height: '20px',
            padding: '2px',
            borderRadius: '15px',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          ?
        </div>
      </a>
    </>
  );
};

const DeleteButton = ({ kind }) => {
  let html = '<div style=font-size:24px; >';
  html += 'delete data from local database';
  html += '</div>';
  const processDeletion = () => {
    console.log(`processDeletion; kind: ${kind}`);
  };
  const id = `deleteButton_${kind}`;
  const anchorSelect = `#deleteButton_${kind}`;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={html}
        clickable
        className="reactTooltip"
        place="bottom"
      />
      <a id={id}>
        <div
          style={{
            display: 'none',
            border: '1px solid black',
            padding: '2px',
            fontSize: '10px',
            margin: 'auto',
            marginLeft: '5px',
          }}
          type="button"
          onClick={() => processDeletion()}
        >
          clear
        </div>
      </a>
    </>
  );
};

const DownloadController = ({ downloading, setDownloading, kind }) => {
  let html = '<div style=font-size:24px; >';
  html += 'Download & update lists from your nostr relays.';
  html += '</div>';
  const id = `downloadController_${kind}`;
  const anchorSelect = `#downloadController_${kind}`;
  if (downloading == 'no') {
    return (
      <>
        <Tooltip
          anchorSelect={anchorSelect}
          html={html}
          clickable
          className="reactTooltip"
          place="bottom"
        />
        <a id={id}>
          <button
            type="button"
            onClick={() => setDownloading('yes')}
            style={{}}
          >
            download
          </button>
        </a>
      </>
    );
  }
  return (
    <>
      <button type="button" onClick={() => setDownloading('no')} style={{}}>
        stop
      </button>
    </>
  );
};

const NumberInDatabase = ({ kind }) => {
  let html = '<div style=font-size:24px; >';
  html += 'number of lists of this type in the local database';
  html += '</div>';
  const id = `numInDatabase_${kind}`;
  const anchorSelect = `#numInDatabase_${kind}`;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={html}
        clickable
        className="reactTooltip"
        place="bottom"
      />
      <DeleteButton kind={kind} />
    </>
  );
};

const DownloadContainer = () => {
  const [downloading10000, setDownloading10000] = useState('no');
  const [downloading10001, setDownloading10001] = useState('no');
  const [downloading30000, setDownloading30000] = useState('no');
  const [downloading30001, setDownloading30001] = useState('no');
  const [downloadingDCoSL, setDownloadingDCoSL] = useState('no');

  const { devMode2 } = useSelector(
    (state) => state.myNostrProfile.devModes
  );

  // devMode2: toggle conceptGraph, grapevine, eBooks
  let devElemClass2 = 'devElemHide';
  if (devMode2) {
    devElemClass2 = 'devElemShow';
  }
  return (
    <>
      <div style={{fontSize: '28px', color: 'purple', marginTop: '20px', marginBottom: '5px'}}>Downloading Lists</div>
      <div style={{marginLeft: '20px'}}>
        <div>
          Download lists one category at a time (using the download buttons below) or all categories at once (download button, top right; might be slower).
        </div>

        <div
          style={{
            width: '500px',
            marginTop: '10px',
            marginLeft: '20px',
            fontSize: '26px',
            textAlign: 'left',
          }}
        >
          <div style={{ marginBottom: '0px' }}>
            <span>
              <QuestionMark content="kind30001" />
            </span>{' '}
            Bookmarks{' '}
            <NumberInDatabase kind="30001" />
            <span
              style={{
                display: 'inline-block',
                width: '150px',
                height: '50px',
                float: 'right',
                textAlign: 'left',
              }}
            >
              <DownloadController
                downloading={downloading30001}
                setDownloading={setDownloading30001}
                kind="30001"
              />
              <div
                style={{
                  display: 'inline-block',
                  paddingLeft: '5px',
                  paddingTop: '12px',
                }}
              >
                <DownloadLists kind="30001" downloading={downloading30001} />
              </div>
            </span>
          </div>

          <div style={{ marginBottom: '0px' }}>
            <span>
              <QuestionMark content="kind30000" />
            </span>{' '}
            People{' '}
            <NumberInDatabase kind="30000" />
            <span
              style={{
                display: 'inline-block',
                width: '150px',
                height: '50px',
                float: 'right',
                textAlign: 'left',
              }}
            >
              <DownloadController
                downloading={downloading30000}
                setDownloading={setDownloading30000}
                kind="30000"
              />
              <div
                style={{
                  display: 'inline-block',
                  paddingLeft: '5px',
                  paddingTop: '12px',
                }}
              >
                <DownloadLists kind="30000" downloading={downloading30000} />
              </div>
            </span>
          </div>

          <div style={{ marginBottom: '0px' }}>
            <span>
              <QuestionMark content="kind10000" />
            </span>{' '}
            Mute{' '}
            <NumberInDatabase kind="10000" />
            <span
              style={{
                display: 'inline-block',
                width: '150px',
                height: '50px',
                float: 'right',
                textAlign: 'left',
              }}
            >
              <DownloadController
                downloading={downloading10000}
                setDownloading={setDownloading10000}
                kind="10000"
              />
              <div
                style={{
                  display: 'inline-block',
                  paddingLeft: '5px',
                  paddingTop: '12px',
                }}
              >
                <DownloadLists kind="10000" downloading={downloading10000} />
              </div>
            </span>
          </div>

          <div style={{ marginBottom: '0px' }}>
            <span>
              <QuestionMark content="kind10001" />
            </span>{' '}
            Pin{' '}
            <NumberInDatabase kind="10001" />
            <span
              style={{
                display: 'inline-block',
                width: '150px',
                height: '50px',
                float: 'right',
                textAlign: 'left',
              }}
            >
              <DownloadController
                downloading={downloading10001}
                setDownloading={setDownloading10001}
                kind="10001"
              />
              <div
                style={{
                  display: 'inline-block',
                  paddingLeft: '5px',
                  paddingTop: '12px',
                }}
              >
                <DownloadLists kind="10001" downloading={downloading10001} />
              </div>
            </span>
          </div>

          <div className={devElemClass2} >
            <div style={{ marginBottom: '20px' }}>
              <span>
                <QuestionMark content="dcosl" />
              </span>{' '}
              <NavLink
                onClick={() => {
                  // dispatch(updateNostrProfileFocus(pubkey));
                }}
                to="/CuratedListsHome/CuratedListsWithScoresV8"
                style={{ textDecoration: 'none' }}
              >
                Curated Lists
              </NavLink>{' '}
              <div style={{ display: 'inline-block' }}>(--)</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <span>
                <QuestionMark content="channels" />
              </span>{' '}
              <NavLink
                onClick={() => {
                  // dispatch(updateNostrProfileFocus(pubkey));
                }}
                to="/CuratedListsHome/CuratedListsWithScoresV8"
                style={{ textDecoration: 'none' }}
              >
                Channels
              </NavLink>{' '}
              <div style={{ display: 'inline-block' }}>(--)</div>
            </div>

            <div style={{ marginBottom: '20px', paddingLeft: '25px' }}>
              <NavLink
                onClick={() => {
                  // dispatch(updateNostrProfileFocus(pubkey));
                }}
                to="/NostrHome/NostrViewProfile"
                style={{ textDecoration: 'none' }}
              >
                My Lists
              </NavLink>{' '}
              <div style={{ display: 'inline-block' }}>(--)</div>
            </div>

            <center>
              <div style={{ marginBottom: '20px' }}>
                <NavLink
                  onClick={() => {
                    // dispatch(updateNostrProfileFocus(pubkey));
                  }}
                  to="/NIP51Home/NIP51MakeNewList"
                  style={{ textDecoration: 'none' }}
                >
                  Make a new list
                </NavLink>
              </div>
            </center>
          </div>
        </div>

        <div style={{fontSize: '14px', color: 'grey'}}>
          By default, lists entitled 'Nostr Devs' and 'imported Nostr Devs' are
          downloaded at startup for use with some of the feature demos. Lists
          authored by individual users are downloaded automatically in the Lists
          section of the user profile page.
        </div>
      </div>
    </>
  )
}

const ChannelsInfo = () => {
  let html = '<div style=font-size:20px; >';
  html += 'A Channel is a nostr feed generated from a list of people,<br/>';
  html += 'in which the list is <i>managed and updated in real time by your web of trust</i>.';
  html += '<br/><br/>';
  html += 'Currently this is achieved through the magic of NIP-51 and the "a" tag, <br/>';
  html += 'which allows lists to import items from other lists.';
  html += '<br/><br/>';
  html += 'The goal of future work is to increase the sophistication of list curation by your WoT.';
  html += '</div>';
  const id = `questionMarkInfoBox_channels`;
  const anchorSelect = `#questionMarkInfoBox_channels`;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={html}
        clickable
        className="reactTooltip"
        place="bottom"
      />
      <a id={id}>
        <div
          className="questionMarkInfoBox"
          style={{
            margin: 'auto',
            display: 'inline-block',
            border: '1px solid black',
            width: '20px',
            height: '20px',
            padding: '2px',
            borderRadius: '15px',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          ?
        </div>
      </a>
    </>
  );
}

const ListsLandingPage = () => {
  console.log("ListsLandingPage called again");

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();

  /*
  <TopPanel />
  <TopPanelButtons />
  <TopPanelDisplay />
  */

  return (
    <>
      <TopPanel />
      <div style={{display: 'none'}}><LoadLists /></div>
      <div style={{margin: '20px', fontSize: '18px'}}>
        <div style={{fontSize: '28px', color: 'purple', marginTop: '5px', marginBottom: '5px'}}>About</div>
        <div style={{ marginLeft: '20px'}}>
          Pretty Good Lists allows you to explore various types of lists on nostr.
          Currently you can download four different types of lists based on their NIP-51 kind:
          Bookmarks, People, Pin, and Mute, with more list types to come.
        </div>

        <div style={{fontSize: '28px', color: 'purple', marginTop: '20px', marginBottom: '5px'}}>Features</div>
        <div style={{marginLeft: '20px'}}>
          <li>
            View, filter, and sort lists from the{' '}
            <NavLink
              end to="/NIP51Home/NIP51TableOfLists"
            >
              main table of lists
            </NavLink>.
          </li>
          <li>
            View individual lists.
          </li>
          <li>
            Support the ability to <span style={{color: 'purple'}}>import items from other lists</span> (see{' '}
            <NavLink
              onClick={() => {
                // using wds4's imported Nost Devs list
                dispatch(
                  updateNaddrListFocus(
                    'naddr1qqfkjmtsdae8getyyp8x7um5wgsygetkwvpzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qvzqqqr4xytgjynw'
                  )
                );
                dispatch(
                  updateNip51ListFocusEventId(
                    'd46fb1f765b05abb09fda0041aaddd33c9d387e1134b345dfcb2556d0e67e914'
                  )
                );
              }}
              to="/NIP51Home/NIP51List"
            >
              this example
            </NavLink>
            )
          </li>
          <li>
            Channels <ChannelsInfo />, as in{' '}
            <NavLink
              onClick={() => {
                dispatch(updateMainNostrFeedFilter('naddr1qqfkjmtsdae8getyyp8x7um5wgsygetkwvpzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qvzqqqr4xytgjynw'));
                dispatch(updateCurrentApp('nostr'));
              }}
              // to="/NostrHome/NostrMainFeed"
              to="/NostrHome/NostrLandingPage"
            >
              this example (the Nostr Devs channel)
            </NavLink>
          </li>
          <li>
            Download and edit{' '}
            <NavLink
              onClick={() => {
                dispatch(updateNostrProfilePanelSelector("lists"));
                dispatch(updateNostrProfileFocus(myNostrProfile.pubkey_hex));
              }}
              to="/NostrHome/NostrViewProfile"
            >
              your lists
            </NavLink>.
          </li>
        </div>

        <DownloadContainer />

        <div style={{fontSize: '28px', color: 'purple', marginTop: '20px', marginBottom: '5px'}}>Future Directions</div>
        <div style={{marginLeft: '20px'}}>
          <li>Add Contacts (kind 3), Relays (kind 10002), and Categorized Relays (kind 30022).</li>
          <li>Add ability to create new NIP-51 lists.</li>
          <li>Merge the Curated Lists app (kinds 19xxx and 39xxx) into the NIP-51 Lists app.</li>
        </div>
      </div>
    </>
  );
};
export default ListsLandingPage;
