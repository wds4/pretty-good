import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addInstanceEventToSql } from 'renderer/window1/lib/pg/sql';
import { doesEventInstanceValidateAgainstEventParent } from 'renderer/window1/lib/conceptGraph';
import Instance from './instance';

//
const AllInstances = ({
  parentConceptPropertyPath,
  parentConceptNostrEventID,
  parentConceptSlug,
  oParentEvent,
  aListItemsData,
}) => {
  return (
    <>
      <div className="h4">All items on this list (loaded from SQL)</div>
      <div>parentConceptNostrEventID: {parentConceptNostrEventID}</div>
      {aListItemsData.map((oListItemData) => {
        const parentID = oListItemData.parentConceptNostrEventID;
        if (parentID == parentConceptNostrEventID) {
          const oEvent = JSON.parse(oListItemData.event);
          const oWord = JSON.parse(oEvent.content);
          return (
            <>
              <Instance
                parentConceptPropertyPath={parentConceptPropertyPath}
                oListItemData={oListItemData}
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

export default AllInstances;
