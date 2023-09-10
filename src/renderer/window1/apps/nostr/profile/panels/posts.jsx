import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { dateToUnix } from 'nostr-react';
import { useSelector } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post/post';
import PostAsAgGridCell from 'renderer/window1/apps/nostr/components/postAsAgGridCell/post';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import FetchPostsInBackground from './fetchPostsInBackground';

const ShowPostsOld = ({ aEvents, since }) => {
  console.log("qwerty ShowPostsOld; aEvents.length: "+aEvents.length)
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

const PostCell = (props) => {
  const event = props.value;
  return (
    <PostAsAgGridCell event={event} />
  )
}

const ShowPosts = ({ aEvents, since }) => {
  console.log("qwerty ShowPosts; aEvents.length: "+aEvents.length)

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
  const gridStyle = useMemo(() => ({ width: '100%', height: '600px' }), []);
  const gridOptions = {
    rowHeight: 200,
  }
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    {
      field: 'post',
      headerName: 'Post',
      cellRenderer: PostCell,
      comparator: (valueA, valueB) => {
        const valA = parseInt(valueA.created_at);
        const valB = parseInt(valueB.created_at);
        if (valA == valB) return 0;
        return (valA > valB) ? 1 : -1;
      },
      minWidth: 150,
      flex: 1
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    const aTableData = [];
    for (let x=0;x<aEvents.length;x++) {
      const event = aEvents[x];
      const oNextEntry = {
        pubkey: event.pubkey,
        created_at: event.created_at,
        post: event,
      };
      aTableData.push(oNextEntry);
    }
    setRowData(aTableData);

    /*
    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
    */
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          animateRows
        />
      </div>
    </div>
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
      <ShowPostsOld aEvents={aEvents} since={since0} />
    </>
  );
};

export default Posts;

/*

*/
