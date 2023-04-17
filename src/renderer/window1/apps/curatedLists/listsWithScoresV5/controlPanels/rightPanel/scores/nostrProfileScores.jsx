import DataTable from 'react-data-table-component';

const NostrProfileScores = ({aProfileCompScoreData}) => {
  const ExpandedComponent = ({ data }) => (
    <pre style={{ textAlign: 'left' }}>pubkey: {data.pubkey}</pre>
  );
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
      omit: true,
    },
    {
      name: 'Average',
      selector: (row) => row.average,
      sortable: true,
    },
    {
      name: 'Input',
      selector: (row) => row.input,
      sortable: true,
    },
  ];
  return (
    <>
      <div style={{display: 'none', textAlign: 'left', fontSize: '10px', border: '1px solid red', padding: '5px' }}>{JSON.stringify(aProfileCompScoreData,null,4)}</div>
      <div style={{}}>
        <DataTable
          columns={columns}
          data={aProfileCompScoreData}
          pagination
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          defaultSortFieldId={3}
          defaultSortAsc={false}
        />
      </div>
    </>
  );
};
export default NostrProfileScores;
