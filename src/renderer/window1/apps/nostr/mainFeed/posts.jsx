import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNostrActiveThreadFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { dateToUnix } from 'nostr-react';
import Post from 'renderer/window1/apps/nostr/components/post/post';

const Posts = ({ aEvents }) => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);
  const cutoffTime = currentTime - 6 * 60 * 60; // 2 * 24 * 60 * 60 = show messages as old as two days

  const dispatch = useDispatch();
  dispatch(updateNostrActiveThreadFocus(""));

  const { focus } = useSelector(
    (state) => state.nostrSettings.nostrActiveThread
  );
  return (
    <>
      <div>
        {aEvents.map((event) => {
          if (doesEventValidate(event)) {
            if (event.created_at > cutoffTime) {
              return (
                <>
                  <Post event={event} />
                </>
              );
            }
          }
        })}
      </div>
    </>
  );
};

export default Posts;
