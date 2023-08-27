import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import DownloadLists from './downloadLists';

const QuestionMark = ({content}) => {
  let html = '<div style=font-size:24px; >';
  html += tooltipContent.lists[content];
  html += '</div>';
  const id = 'questionMarkInfoBox_'+content;
  const anchorSelect = '#questionMarkInfoBox_'+content;
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

const DeleteButton = ({kind}) => {
  let html = '<div style=font-size:24px; >';
  html += "delete data from local database";
  html += "</div>";
  const processDeletion = () => {
    console.log("processDeletion; kind: "+kind)
  }
  const id = "deleteButton_"+kind;
  const anchorSelect = "#deleteButton_"+kind;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={html}
        clickable
        className="reactTooltip"
        place="bottom"
      />
      <a id={id} >
        <div style={{display: 'inline-block', border: '1px solid black', padding: '2px', fontSize: '10px', margin: 'auto', marginLeft: '5px'}} type="button" onClick={() => processDeletion()} >
          clear
        </div>
      </a>
    </>
  );
}

const DownloadController = ({ downloading, setDownloading, kind }) => {
  let html = '<div style=font-size:24px; >';
  html += "Download & update lists from your nostr relays.";
  html += "</div>";
  const id = "downloadController_"+kind;
  const anchorSelect = "#downloadController_"+kind;
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
        <a id={id} >
          <button type="button" onClick={() => setDownloading('yes')} style={{}}>
            download / update
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

const NumberInDatabase = ({aKind, kind}) => {
  let html = '<div style=font-size:24px; >';
  html += "number of lists in local database";
  html += "</div>";
  const id = "numInDatabase_"+kind;
  const anchorSelect = "#numInDatabase_"+kind;
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
        <div style={{ display: 'inline-block' }}>({aKind.length})</div>
      </a>
      <DeleteButton kind={kind} />
    </>
  )
}

const ListsLandingPage = () => {
  const [downloading10000, setDownloading10000] = useState('no');
  const [downloading10001, setDownloading10001] = useState('no');
  const [downloading30000, setDownloading30000] = useState('no');
  const [downloading30001, setDownloading30001] = useState('no');
  const [downloadingDCoSL, setDownloadingDCoSL] = useState('no');

  const oNip51 = useSelector((state) => state.nip51);
  const byAuthors = oNip51.byAuthor;
  const aAuthors = Object.keys(byAuthors);

  const { aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } =
    oNip51;
  return (
    <>
      <div className="h2" style={{ marginTop: '10px' }}>
        Pretty Good Nostr Lists Explorer
      </div>
      <center>
        <div
          style={{
            width: '500px',
            marginTop: '50px',
            fontSize: '26px',
            textAlign: 'left',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <span>
              <QuestionMark content='kind30001' />
            </span>{' '}
            <NavLink
              onClick={() => {
                // dispatch(updateNostrProfileFocus(pubkey));
              }}
              to="/NIP51Home/NIP51ViewLists"
              style={{ textDecoration: 'none' }}
            >
              Bookmarks
            </NavLink>{' '}
            <NumberInDatabase aKind={aKind30001} kind="30001" />
            <span style={{ display: 'inline-block', width: '150px', height: '50px', float: 'right', textAlign: 'left' }}>
              <DownloadController
                downloading={downloading30001}
                setDownloading={setDownloading30001}
                kind="30001"
              />
              <div style={{display: 'inline-block', paddingLeft: '5px', paddingTop: '12px'}}><DownloadLists kind="30001" downloading={downloading30001} /></div>
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span>
              <QuestionMark content='kind30000' />
            </span>{' '}
            <NavLink
              onClick={() => {
                // dispatch(updateNostrProfileFocus(pubkey));
              }}
              to="/NIP51Home/NIP51ViewLists"
              style={{ textDecoration: 'none' }}
            >
              People
            </NavLink>{' '}
            <NumberInDatabase aKind={aKind30000} kind="30000" />
            <span style={{ display: 'inline-block', width: '150px', height: '50px', float: 'right', textAlign: 'left' }}>
              <DownloadController
                downloading={downloading30000}
                setDownloading={setDownloading30000}
                kind="30000"
              />
              <div style={{display: 'inline-block', paddingLeft: '5px', paddingTop: '12px'}}><DownloadLists kind="30000" downloading={downloading30000} /></div>
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span>
              <QuestionMark content='kind10000' />
            </span>{' '}
            <NavLink
              onClick={() => {
                // dispatch(updateNostrProfileFocus(pubkey));
              }}
              to="/NIP51Home/NIP51ViewLists"
              style={{ textDecoration: 'none' }}
            >
              Mute
            </NavLink>{' '}
            <NumberInDatabase aKind={aKind10000} kind="10000" />
            <span style={{ display: 'inline-block', width: '150px', height: '50px', float: 'right', textAlign: 'left' }}>
              <DownloadController
                downloading={downloading10000}
                setDownloading={setDownloading10000}
                kind="10000"
              />
              <div style={{display: 'inline-block', paddingLeft: '5px', paddingTop: '12px'}}><DownloadLists kind="10000" downloading={downloading10000} /></div>
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span>
              <QuestionMark content='kind10001' />
            </span>{' '}
            <NavLink
              onClick={() => {
                // dispatch(updateNostrProfileFocus(pubkey));
              }}
              to="/NIP51Home/NIP51ViewLists"
              style={{ textDecoration: 'none' }}
            >
              Pin
            </NavLink>{' '}
            <NumberInDatabase aKind={aKind10001} kind="10001" />
            <span style={{ display: 'inline-block', width: '150px', height: '50px', float: 'right', textAlign: 'left' }}>
              <DownloadController
                downloading={downloading10001}
                setDownloading={setDownloading10001}
                kind="10001"
              />
              <div style={{display: 'inline-block', paddingLeft: '5px', paddingTop: '12px'}}><DownloadLists kind="10001" downloading={downloading10001} /></div>
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span>
              <QuestionMark content='dcosl' />
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
              <QuestionMark content='channels' />
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
              to="/NIP51Home/NIP51ListAuthors"
              style={{ textDecoration: 'none' }}
            >
              List Authors
            </NavLink>{' '}
            <div style={{ display: 'inline-block' }}>({aAuthors.length})</div>
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
      </center>
    </>
  );
};
export default ListsLandingPage;
