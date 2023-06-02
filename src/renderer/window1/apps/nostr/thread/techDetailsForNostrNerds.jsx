import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import { addNoteToNostrActiveThread } from 'renderer/window1/redux/features/nostr/settings/slice';

const TechDetailsForNostrNerds = ({id_focus}) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const {
    focus,
    aThreadNoteIDs,
    aThreadNoteIDs_downloaded,
    aThreadNoteIDs_notDownloaded,
    aThreadEvents,
  } = useSelector((state) => state.nostrSettings.nostrActiveThread);
  const elem_id = "technicalDetailsForNostrDevsContainer"; // add event_id or some other unique identifier if multiple details per page
  const toggleViewDetails = () => {
    const e = document.getElementById(elem_id);
    const currentState = e.style.display;
    if (currentState == 'none') {
      e.style.display = 'block';
    }
    if (currentState == 'block') {
      e.style.display = 'none';
    }
  };
  return (
    <>
      <div className={devElemClass}>
        <div>
          <span style={{ fontSize: '10px' }}>

          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton techDetailsToggleButton"
          >
            🤓
          </button>
        </div>
        <div
          id={elem_id}
          style={{
            display: 'none',
            fontSize: '12px',
            border: '1px dashed grey',
            padding: '3px',
          }}
        >
          <div>
            <div>id_focus: {id_focus}</div>
            <div>focus: {focus}</div>
            <div>number of aThreadNoteIDs: {aThreadNoteIDs.length}</div>
            <div>number of aThreadEvents: {aThreadEvents.length}</div>
            <div>number of aThreadNoteIDs_downloaded: {aThreadNoteIDs_downloaded.length}</div>
            <div>number of aThreadNoteIDs_notDownloaded: {aThreadNoteIDs_notDownloaded.length}</div>
            <hr />
            <div>aThreadNoteIDs: {JSON.stringify(aThreadNoteIDs,null,4)}</div>
            <div>aThreadNoteIDs_downloaded: {JSON.stringify(aThreadNoteIDs_downloaded,null,4)}</div>
            <div>aThreadNoteIDs_notDownloaded: {JSON.stringify(aThreadNoteIDs_notDownloaded,null,4)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechDetailsForNostrNerds;
