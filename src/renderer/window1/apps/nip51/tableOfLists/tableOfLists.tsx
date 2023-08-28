import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { NavLink } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { updateNostrProfileFocus } from 'renderer/window1/redux/features/nostr/settings/slice';
import { noProfilePicUrl } from 'renderer/window1/const';

const CustomElements = (props) => {
  const dispatch = useDispatch();

  let { avatarUrl } = props.value;
  let pk = props.value.pubkey;
  if (!pk) {
    pk = 'foo';
  }

  const { events } = useNostrEvents({
    filter: {
      authors: [pk],
      since: 0,
      kinds: [0],
    },
  });
  if (events.length > 0) {
    const event = events[0];
    const content = JSON.parse(event.content);
    avatarUrl = content.picture;
  }
  if (!avatarUrl) {
    avatarUrl = noProfilePicUrl;
  }

  return (
    <>
      <NavLink
        onClick={() => {
          dispatch(updateNostrProfileFocus(pk));
        }}
        to="/NostrHome/NostrViewProfile"
        className="goToUserProfileButton"
      >
        <div className="agTableSmallAvatarContainer">
          <img
            src={avatarUrl}
            onError={(event) => (event.target.src = noProfilePicUrl)}
            className="userListSmallAvatarBox"
          />
        </div>
      </NavLink>
    </>
  );
};

const TableOfLists = () => {
  // const aTableData = [{ name: 'Nostr Devs', author: 'Satoshi', kind: 30000, items: 5 }];
  const aTableData = [];

  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  const name = '';
  const displayName = '';

  const { aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } =
    useSelector((state) => state.nip51);
  const oNip51Lists = useSelector((state) => state.nip51.lists);

  /*
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name', checkboxSelection: true, },
    { field: 'author', editable: true, },
    { field: 'kind' },
    { field: 'items' },
  ]);
  */

  const masterDetail = true;

  const columnDefs = useMemo(
    () => [
      { field: 'list name', checkboxSelection: true },
      { field: 'image', minWidth: 100, flex: 1, cellRenderer: CustomElements },
      { field: 'author', editable: true },
      { field: 'kind', minWidth: 100, flex: 1 },
      { field: 'items', minWidth: 100, flex: 1 },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 10,
    }),
    []
  );

  for (let l = 0; l < aListEventIDs.length; l++) {
    const id = aListEventIDs[l];
    const { event } = oNip51Lists[id];
    const { pubkey } = event;

    /// // STEP 1 ///// First load default profile info
    let avatarUrl = noProfilePicUrl;
    let name = '';
    let displayName = '';

    /// // STEP 2 ///// If already present in redux store, replace with that
    let profileContent = {};
    if (nostrProfiles.hasOwnProperty(pubkey)) {
      profileContent = JSON.parse(nostrProfiles[pubkey].content);
      name = `@${profileContent.name}`;
      displayName = profileContent.display_name;
      if (profileContent.picture) {
        avatarUrl = profileContent?.picture;
      }
    }

    const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
    let listName = '';
    if (aTags_d.length > 0) {
      listName = aTags_d[0][1];
    }
    const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
    const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
    const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
    const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');

    const numItemsDirect = aTags_e.length + aTags_p.length + aTags_t.length;

    let authorField = displayName;
    if (!authorField) {
      authorField = pubkey;
    }
    const oFoo = {
      pubkey: event.pubkey,
      avatarUrl,
    };

    const oNextEntry = {
      'list name': listName,
      image: oFoo,
      author: authorField,
      kind: event.kind,
      items: numItemsDirect,
    };
    aTableData.push(oNextEntry);
  }

  const [rowData, setRowData] = useState(aTableData);

  const gridRef = useRef();

  const cellClickedListener = useCallback((e) => {
    console.log('cellClicked ', e);
  });

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.js')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const pushMeSelectCLicked = useCallback((e) => {
    gridRef.current.api.selectAll();
  });

  const pushMeDeselectCLicked = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <button onClick={pushMeSelectCLicked}>push me to select all</button>
      <button onClick={pushMeDeselectCLicked}>push me to deselect all</button>
      <AgGridReact
        masterDetail={masterDetail}
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        animateRows
      />
    </div>
  );
};
export default TableOfLists;
