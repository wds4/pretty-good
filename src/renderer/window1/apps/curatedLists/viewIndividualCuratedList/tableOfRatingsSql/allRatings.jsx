import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addRatingOfCuratedListInstanceEventToSql } from 'renderer/window1/lib/pg/sql';
import { doesEventInstanceValidateAgainstEventParent } from 'renderer/window1/lib/conceptGraph';
import Rating from './rating';

const AllRatings = ({
  parentConceptPropertyPath,
  parentConceptNostrEventID,
  parentConceptSlug,
  oParentEvent,
  aRatingsOfCuratedListItemsData,
}) => {
  return (
    <>
      <div className="h4">ratings of items on this list (loaded from sql)</div>
      {aRatingsOfCuratedListItemsData.map((oRatingsOfCuratedListItemsData) => {
        const parentID =
          oRatingsOfCuratedListItemsData.parentConceptNostrEventID;
        if (parentID == parentConceptNostrEventID) {
          const oEvent = JSON.parse(oRatingsOfCuratedListItemsData.event);
          const oWord = JSON.parse(oEvent.content);
          return (
            <>
              <Rating
                event={oEvent}
                oRatingsOfCuratedListItemsData={oRatingsOfCuratedListItemsData}
              />
            </>
          );
        }
        return <></>;
      })}
    </>
  );
};

export default AllRatings;
