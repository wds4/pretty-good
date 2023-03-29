import DataTable from 'react-data-table-component';

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];

const ReactDataTableComponent = () => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        direction="auto"
        fixedHeaderScrollHeight="300px"
        pagination
        responsive
        subHeaderAlign="right"
        subHeaderWrap
      />
    </>
  );
};
export default ReactDataTableComponent;
