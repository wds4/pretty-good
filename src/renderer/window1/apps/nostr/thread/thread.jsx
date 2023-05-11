import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import {
  addEventIDToNostrActiveThreadList,
  addEventToNostrActiveThreadList,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const AddReferencedEventIDs = () => {
  console.log('loading_component AddReferencedEventIDs');
  // Cycle through all known events and add eventIDs to the thread list

  const dispatch = useDispatch();
  const {
    focus,
    aThreadNoteIDs,
    aThreadNoteIDs_downloaded,
    aThreadNoteIDs_notDownloaded,
    aThreadEvents,
  } = useSelector((state) => state.nostrSettings.nostrActiveThread);

  const aEventIDsToAdd = [];
  aThreadEvents.map(async (event) => {
    if (doesEventValidate(event)) {
      // add all referenced note event ids to aThreadNoteIDs
      const aaETags = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
      for (let x = 0; x < aaETags.length; x++) {
        const eventID = aaETags[x][1];
        // add this event id to aThreadNoteIDs
        if (!aThreadNoteIDs.includes(eventID)) {
          aEventIDsToAdd.push(eventID);
          dispatch(addEventIDToNostrActiveThreadList(eventID));
        }
      }
    }
  });

  return (
    <>
      <div>
        AddReferencedEventIDs; number of event IDs to add:{' '}
        {aEventIDsToAdd.length}
      </div>
    </>
  );
};

const DownloadMissingEvents = () => {
  console.log('loading_component DownloadMissingEvents');

  const dispatch = useDispatch();
  const {
    focus,
    aThreadNoteIDs,
    aThreadNoteIDs_downloaded,
    aThreadNoteIDs_notDownloaded,
    aThreadEvents,
  } = useSelector((state) => state.nostrSettings.nostrActiveThread);

  // fetch all events that reference any of the events in this thread
  // This fetches downstream events
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [1],
      ids: aThreadNoteIDs_notDownloaded,
    },
  });
  return (
    <>
      <div style={{ border: '1px solid purple', padding: '5px' }}>
        <div>DownloadMissingEvents</div>
        <div>number events: {events.length}</div>
        <div>
          number aThreadNoteIDs_notDownloaded:{' '}
          {aThreadNoteIDs_notDownloaded.length}
        </div>
        {events.map((event) => {
          if (doesEventValidate(event)) {
            const eventID = event.id;
            if (aThreadNoteIDs_notDownloaded.includes(eventID)) {
              dispatch(addEventToNostrActiveThreadList(event));
              return (
                <>
                  <div>eventID: {eventID}</div>
                </>
              )
            }
          }
        })}
      </div>
    </>
  );
};

const ShowDownloadedEvents = () => {
  // console.log('loading_component ShowDownloadedEvents');
  const {
    focus,
    aThreadNoteIDs,
    aThreadNoteIDs_downloaded,
    aThreadNoteIDs_notDownloaded,
    aThreadEvents,
  } = useSelector((state) => state.nostrSettings.nostrActiveThread);
  let aThreadEvents_ = JSON.parse(JSON.stringify(aThreadEvents))
  aThreadEvents_.sort(
    (a, b) => parseFloat(a.created_at) - parseFloat(b.created_at)
  ); // oldest first
  return (
    <>
      {aThreadEvents_.map((event) => {
        if (doesEventValidate(event)) {
          const eventID = event.id;
          let threadNoteClass = 'threadNoteNotFocus';
          if (eventID == focus) {
            threadNoteClass = 'threadNoteFocus';
          }
          return (
            <>
              <div className={threadNoteClass}>
                <Post event={event} />
              </div>
            </>
          );
        }
        return <></>;
      })}
    </>
  );
};

const FindDownstreamEvents = () => {
  console.log('loading_component FindDownstreamEvents');

  const dispatch = useDispatch();
  const {
    focus,
    aThreadNoteIDs,
    aThreadNoteIDs_downloaded,
    aThreadNoteIDs_notDownloaded,
    aThreadEvents,
  } = useSelector((state) => state.nostrSettings.nostrActiveThread);

  // Find all events which reference any events in the current thread list
  // (i.e. all downstream events)
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [1],
      // '#e': [id_focus],
      '#e': aThreadNoteIDs,
    },
  });

  return (
    <>
      <div style={{ border: '1px solid purple', padding: '5px' }}>
        <div>FindDownstreamEvents</div>
        <div>found: {events.length} events</div>
        {events.map((event) => {
          if (doesEventValidate(event)) {
            const eventID = event.id;
            if (!aThreadNoteIDs.includes(eventID)) {
              dispatch(addEventToNostrActiveThreadList(event));
              return (
                <>
                  <div>need to add eventID: {eventID}</div>
                </>
              )
            } else {
              return (
                <>
                  <div>already know about eventID: {eventID}</div>
                </>
              )
            }
          }
        })}
      </div>
    </>
  );
};

const Thread = () => {
  const event_focus = useSelector(
    (state) => state.nostrSettings.nostrPostFocusEvent
  );
  const dispatch = useDispatch();
  const id_focus = event_focus.id;
  const {
    focus,
    aThreadNoteIDs,
    aThreadNoteIDs_downloaded,
    aThreadNoteIDs_notDownloaded,
    aThreadEvents,
  } = useSelector((state) => state.nostrSettings.nostrActiveThread);
  console.log('loading_component Thread');
  return (
    <>
      <TechDetailsForNostrNerds id_focus={id_focus} />
      <div style={{display: 'none'}}>
        <AddReferencedEventIDs />
        <DownloadMissingEvents />
        <FindDownstreamEvents />
      </div>
      <ShowDownloadedEvents />
    </>
  );
};

export default Thread;
