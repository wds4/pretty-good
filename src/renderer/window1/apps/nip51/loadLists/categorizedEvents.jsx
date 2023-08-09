import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

const CategorizedEvents = ({events}) => {
  return (
    <>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          return (
            <>
              <div>{event.id}</div>
            </>
          );
        }
      })}
    </>
  )
};

export default CategorizedEvents;
