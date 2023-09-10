import { useRef } from 'react';
import { dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FetchPostsInBackground from './fetchPostsInBackground';

const ShowPosts = ({ aEvents, since }) => {
  return (
    <>
      {aEvents.map((event) => {
        if (doesEventValidate(event)) {
          if (event.created_at > since) {
            return (
              <>
                <Post event={event} />
              </>
            );
          }
          return <></>;
        }
      })}
    </>
  );
};

const Posts = () => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);
  // const { days, hours, minutes } = nostrMainFeedFilterSettings[mainNostrFeedFilter];
  // filter.since = currentTime - ( (24 * 60 * 60 * days) + (60 * 60 * hours) +(60 * minutes) )
  const days = 1;
  const hours = 0;
  const minutes = 0;
  const since =
    currentTime - (24 * 60 * 60 * days + 60 * 60 * hours + 60 * minutes);

  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const nostrNotesByAuthor = useSelector((state) => state.nostrNotes.notes);
  let oNostrNotesThisAuthor = nostrNotesByAuthor[pubkey];
  if (!oNostrNotesThisAuthor) {
    oNostrNotesThisAuthor = {};
  }
  let aNostrNoteIDsThisAuthor = Object.keys(oNostrNotesThisAuthor);
  if (!aNostrNoteIDsThisAuthor) {
    aNostrNoteIDsThisAuthor = [];
  }
  const aEvents = [];
  for (let x = 0; x < aNostrNoteIDsThisAuthor.length; x++) {
    const nextId = aNostrNoteIDsThisAuthor[x];
    // if (oNostrNotesThisAuthor[nextId].event.created_at > since0) {
    aEvents.push(oNostrNotesThisAuthor[nextId].event);
    // }
  }
  aEvents.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  // fetch posts since most recent known post; if none known, start at the beginning of time
  // TO DO: add button to refetch from scratch (e.g. in case change of relays)
  let sinceX = 0;
  if (aEvents.length > 0) {
    const oMostRecentEvent = aEvents[0];
    sinceX = oMostRecentEvent.created_at;
  }

  const since0 = 0;

  return (
    <>
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        {aNostrNoteIDsThisAuthor.length} posts
      </div>
      <FetchPostsInBackground since={sinceX} />
      <ShowPosts aEvents={aEvents} since={since0} />
    </>
  );
};

export default Posts;
