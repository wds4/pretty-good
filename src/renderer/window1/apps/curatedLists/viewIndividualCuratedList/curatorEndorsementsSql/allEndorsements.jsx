import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addEndorsementOfListCuratorEventToSql } from 'renderer/window1/lib/pg/sql';
import { doesEventInstanceValidateAgainstEventParent } from 'renderer/window1/lib/conceptGraph';
import Endorsement from './endorsement';

const AllEndorsements = ({
  parentConceptPropertyPath,
  parentConceptNostrEventID,
  parentConceptSlug,
  oParentEvent,
  aEndorsementsOfCuratorsData,
}) => {
  return (
    <>
      <div className="h4">endorsements of curators for this list (sql)</div>
      {aEndorsementsOfCuratorsData.map((oEndorsementOfCuratorData)=>{
        const parentID = oEndorsementOfCuratorData.parentConceptNostrEventID;
        if (parentID == parentConceptNostrEventID) {
          const oEvent = JSON.parse(oEndorsementOfCuratorData.event);
          const oWord = JSON.parse(oEvent.content);
          return (
            <>
              <Endorsement
                parentConceptPropertyPath={parentConceptPropertyPath}
                oEndorsementOfCuratorData={oEndorsementOfCuratorData}
                event={oEvent}
                oWord={oWord}
              />
            </>
          );
        }
        return <></>;
      })}
    </>
  );
};

export default AllEndorsements;
