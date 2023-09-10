import { useNostrEvents } from 'nostr-react';
import Post from '../makeNewList/showSingleItem/post';

const ShowNotesPanel = ({ notesPanelState, aTags_e, editListState }) => {
  if (notesPanelState == 'open') {
    return (
      <>
        <div>
          {aTags_e.map((obj) => {
            const id = obj[1];
            const filter = {
              ids: [id],
            };
            const { events } = useNostrEvents({
              filter,
            });
            if (events.length == 1) {
              return (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <Post event={events[0]} />
                  </div>
                </>
              );
            }
            return <></>;
          })}
        </div>
      </>
    );
  }
  return <></>;
};
export default ShowNotesPanel;
