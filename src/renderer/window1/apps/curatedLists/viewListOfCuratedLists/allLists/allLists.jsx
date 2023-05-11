import { useSelector } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addCuratedListEventToSql } from 'renderer/window1/lib/pg/sql';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import TechDetailsForNostrNerds2 from './techDetailsForNostrNerds2';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds3';
import TechDetailsForNostrNerds4 from './techDetailsForNostrNerds4';

import List from './list';

const AllListsLoadSql = ({aListData}) => {
  return (
    <>
      <div style={{marginBottom: '10px'}}>Loading data from SQL:</div>
      {aListData.map((oListData)=>{
        const oEvent = JSON.parse(oListData.event);
        return (
          <><List event={oEvent} /></>
        );
      })}
    </>
  );
};

const AllListsLoadLive = () => {
  const kind0 = 9901;
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["c","concept-graph-testnet-901"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["s","nostrCuratedList"]; // if t = createInstance; s for slug of the parent concept of the instance (alternate: e for the event id of the parent concept)
  */
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [kind0],
      '#c': ['concept-graph-testnet-901'],
      '#t': ['createInstance'],
      '#s': ['nostrCuratedList'],
    },
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div style={{marginBottom: '10px'}}>Live streaming from nostr:</div>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          addCuratedListEventToSql(event);
          return (
            <>
              <List event={event} />
            </>
          );
        }
      })}
    </>
  );
};

const AllLists2 = ({aListData}) => {
  const viewListsLoadStoredData = useSelector(
    (state) => state.curatedListsSettings.viewListsLoadStoredData
  );
  if (viewListsLoadStoredData) {
    // LOAD DATA FROM SQL
    return (
      <>
        <AllListsLoadSql aListData={aListData} />
      </>
    );
  }
  if (!viewListsLoadStoredData) {
    // LOAD DATA FROM NOSTR
    return (
      <>
        <AllListsLoadLive />
      </>
    );
  }
}

const AllLists = ({ aListData }) => {
  return (
    <>
      <AllLists2 aListData={aListData} />
      <TechDetailsForNostrNerds1 />
      <TechDetailsForNostrNerds2 aListData={aListData} />
      <TechDetailsForNostrNerds3 aListData={aListData} />
      <TechDetailsForNostrNerds4 aListData={aListData} />
    </>
  );
};

export default AllLists;
