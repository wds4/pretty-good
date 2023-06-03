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
      <div className="h4" style={{marginBottom: '20px'}}>endorsements of curators for this list (locally stored in SQL)</div>
      <div style={{fontSize: '22px', color: 'grey', width: '40%', textAlign: 'center', display: 'inline-block'}}>
        rater
      </div>
      <div style={{float: 'right', fontSize: '22px', color: 'grey', width: '40%', textAlign: 'center', display: 'inline-block'}}>
        ratee
      </div>
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
