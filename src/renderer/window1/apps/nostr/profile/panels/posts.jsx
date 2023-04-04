import React from 'react';
import { useSelector } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FetchPostsInBackground from './fetchPostsInBackground';

const Posts = () => {
  const pubkey = useSelector((state) => state.nostrSettings.nostrProfileFocus);
  const nostrNotesByAuthor = useSelector((state) => state.nostrNotes.notes);
  let oNostrNotesThisAuthor = nostrNotesByAuthor[pubkey];
  if (!oNostrNotesThisAuthor) { oNostrNotesThisAuthor = {} }
  let aNostrNotesThisAuthor = Object.keys(oNostrNotesThisAuthor);
  if (!aNostrNotesThisAuthor) { aNostrNotesThisAuthor = [] }
  const aEvents = [];
  for (let x = 0; x < aNostrNotesThisAuthor.length; x++) {
    const nextId = aNostrNotesThisAuthor[x];
    aEvents.push(oNostrNotesThisAuthor[nextId].event);
  }
  aEvents.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));

  return (
    <>
      <FetchPostsInBackground />
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        {aNostrNotesThisAuthor.length} posts
      </div>
      {aEvents.map((event) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <Post event={event} />
            </>
          );
        }
      })}
    </>
  );
};

export default Posts;
