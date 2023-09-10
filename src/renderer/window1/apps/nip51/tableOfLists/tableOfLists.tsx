import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise/dist/ag-grid-enterprise';
import 'ag-grid-enterprise';
/*
import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/_css-content.scss';
import 'ag-grid-enterprise/styles/_icon-font-codes.scss';
import 'ag-grid-enterprise/styles/_index.scss';
import 'ag-grid-enterprise/styles/_shared.scss';
*/

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-grid-community/styles/ag-theme-balham.css';
// import 'ag-grid-community/styles/ag-theme-material.css';
import MiniProfileCell from './miniProfileCell';
import ListNameCell from './listNameCell';
import CreatedAtCell from './createdAtCell';
import Nip51Listener from './nip51Listener';
import TopPanel from '../components/topPanel';
import ClickableStatusBarComponent from './clickableStatusBarComponent';
import CountStatusBarComponent from './countStatusBarComponent';
import { processEventIntoTableEntry } from './processEventIntoTableEntry';

const createTableData = (aListEventIDs, nostrProfiles, oNip51Lists) => {
  const aTableData = [];
  const aAuthorPubkeysInTable = []
  for (let l = 0; l < aListEventIDs.length; l++) {
    const id = aListEventIDs[l];
    const { event } = oNip51Lists[id];

    const { oNextEntry } = processEventIntoTableEntry(event, nostrProfiles);

    // if ((oNextEntry.items > 0) || (oNextEntry.imports > 0)) {
      // if (oNextEntry.listName.listName) {
        // if ((oNextEntry.kind == "Bookmarks") || (oNextEntry.kind == "People")) {
          aTableData.push(oNextEntry);
          if (!aAuthorPubkeysInTable.includes(event.pubkey)) { aAuthorPubkeysInTable.push(event.pubkey)}
        // }
      // }
    // }
  }
  return { aTableData, aAuthorPubkeysInTable };
}

const AddDataPanel = ({addEventToTable}) => {
  return (
    <>
      <Nip51Listener addEventToTable={addEventToTable} />
    </>
  )
}

const TableOfLists = () => {
  const gridRef = useRef();
  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );

  const { aListEventIDs, aKind10000, aKind10001, aKind30000, aKind30001 } =
    useSelector((state) => state.nip51);
  const oNip51Lists = useSelector((state) => state.nip51.lists);

  const listNameFilterValueGetter = (params) => {
    if(params.data) {
      return params.data.listName.listName;
    }
  }

  const authorFilterValueGetter = (params) => {
    if(params.data) {
      return params.data.author.authorFilterText;
    }
  }

  /*
  const createdAtFilterValueGetter = (params) => {
    if(params.data) {
      return params.data.time.created_at;
    }
  }

  var createdAtValueFormatter = function (params) {
    if(params.data) {
      return params.data.time.created_at;
    }
  };

  var numItemsFilterValueGetter = function (params) {
    if(params.data) {
      return params.data.time.created_at;
    }
  };
  */

  const columnDefs = useMemo(
    () => [
      {
        field: 'listName',
        headerName: 'List Name',
        minWidth: 150,
        flex: 10,
        cellRenderer: ListNameCell,
        filterValueGetter: listNameFilterValueGetter,
        comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
          const valA = valueA.listName;
          const valB = valueB.listName;
          if (valA == valB) return 0;
          return (valA > valB) ? 1 : -1;
        },
      },
      {
        field: 'author',
        minWidth: 150,
        flex: 10,
        cellRenderer: MiniProfileCell,
        filterValueGetter: authorFilterValueGetter,
        comparator: (valueA, valueB) => {
          const valA = valueA.displayName;
          const valB = valueB.displayName;
          if (valA == valB) return 0;
          return (valA > valB) ? 1 : -1;
        },
      },
      { field: 'kind', minWidth: 130, flex: 1 },
      { field: 'curation', minWidth: 150, flex: 1 },
      {
        field: 'items',
        headerName: '# Items',
        filter: 'agNumberColumnFilter',
        // filterValueGetter: numItemsFilterValueGetter,
        comparator: (valueA, valueB) => {
          if (valueA == valueB) return 0;
          return (valueA > valueB) ? 1 : -1;
        },
        minWidth: 90,
        flex: 1,
      },
      {
        field: 'imports',
        headerName: '# List Imports',
        filter: 'agNumberColumnFilter',
        // filterValueGetter: numItemsFilterValueGetter,
        comparator: (valueA, valueB) => {
          if (valueA == valueB) return 0;
          return (valueA > valueB) ? 1 : -1;
        },
        minWidth: 110,
        flex: 1,
      },
      {
        field: 'time',
        sort: 'desc',
        headerName: 'Last Updated',
        cellRenderer: CreatedAtCell,
        comparator: (valueA, valueB) => {
          const valA = parseInt(valueA.created_at);
          const valB = parseInt(valueB.created_at);
          if (valA == valB) return 0;
          return (valA > valB) ? 1 : -1;
        },
        minWidth: 150,
        flex: 1
      },
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

  const { aTableData, aAuthorPubkeysInTable } = createTableData(aListEventIDs, nostrProfiles, oNip51Lists);
  const [rowData, setRowData] = useState(aTableData);
  // const [rowData, setRowData] = useState([]);

  const onGridReady = useCallback((params) => {
    // const { aTableData, aAuthorPubkeysInTable } = createTableData(aListEventIDs, nostrProfiles, oNip51Lists);
    // setRowData(aTableData);
  }, []);

  const addEventToTable_depr = (event) => {
    const { oNextEntry } = processEventIntoTableEntry(event, nostrProfiles);
    const aUpdatedTableData = JSON.parse(JSON.stringify(aTableData));
    if ((oNextEntry.items > 0) || (oNextEntry.imports > 0)) {
      if (oNextEntry.listName.listName) {
        // console.log("qwerty addEventToTable oNextEntry: "+JSON.stringify(oNextEntry,null,4))
        // setRowData(aUpdatedTableData.push(oNextEntry));
        // setRowData(aUpdatedTableData);
        const { aTableData, aAuthorPubkeysInTable } = createTableData(aListEventIDs, nostrProfiles, oNip51Lists);
        setRowData(aTableData);
      }
    }
  }
  const addEventToTable = useCallback(
    (event) => {
      const { aTableData, aAuthorPubkeysInTable } = createTableData(aListEventIDs, nostrProfiles, oNip51Lists);
      setRowData(aTableData);
    },
    [rowData]
  );

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        /*
        {
          statusPanel: CountStatusBarComponent,
        },
        {
          statusPanel: ClickableStatusBarComponent,
        },
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['count', 'sum'],
          },
        },
        */
      ],
    };
  }, []);

  const getRowNodeId = data => {
    return data.id;
  };

  const updateTableFromRedux = () => {
    console.log("updateTableFromRedux B");
    const { aTableData, aAuthorPubkeysInTable } = createTableData(aListEventIDs, nostrProfiles, oNip51Lists);
    setRowData(aTableData);
  }

  return (
    <>
      <TopPanel />
      <div className="h2" style={{ marginBottom: '10px' }}>
        Pretty Good Lists
      </div>
      <AddDataPanel addEventToTable={addEventToTable} />
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          getRowNodeId={getRowNodeId}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          animateRows
          statusBar={statusBar}
          onGridReady={onGridReady}
          immutableData={true}
        />
      </div>
      <div style={{fontSize: '14px', backgroundColor: '#EFEFEF', padding: '15px', border: '1px solid grey'}}>
        Table contains: {aTableData.length} lists (excluding lists with either no name or no public items (including no imported lists)) & {aAuthorPubkeysInTable.length} authors
      </div>
      <button
          type="button"
          onClick={updateTableFromRedux}
        >update redux store to table
      </button>
    </>
  );
};
export default TableOfLists;
