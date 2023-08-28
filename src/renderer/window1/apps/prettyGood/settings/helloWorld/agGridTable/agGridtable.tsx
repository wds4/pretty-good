import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const AgGridTable = () => {
  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const gridRef = useRef();

  const cellClickedListener = useCallback(e => {
    console.log('cellClicked ', e)
  })

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const pushMeSelectCLicked = useCallback( e => {
    gridRef.current.api.selectAll();
  })

  const pushMeDeselectCLicked = useCallback( e => {
    gridRef.current.api.deselectAll();
  })

  return (
    <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
      <button onClick={pushMeSelectCLicked}>push me to select all</button>
      <button onClick={pushMeDeselectCLicked}>push me to deselect all</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection='multiple'
        animateRows={true}
      />
    </div>
  );
};
export default AgGridTable;
