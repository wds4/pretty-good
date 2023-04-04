import React from 'react';
import DataTable from 'react-data-table-component';

const CuratedListInstanceScores = ({
  curatedListFocusID,
  oListData,
  aCuratedListInstances,
  aInstanceCompScoreData,
  nodes,
  edges,
  aAllUserNodes,
  aAllInstanceNodes,
}) => {
  // A super simple expandable component.
  const ExpandedComponent = ({ data }) => (
    <pre style={{ textAlign: 'left' }}>{data.description}</pre>
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
      omit: true,
    },
  ];

  return (
    <>
      <div style={{}}>
        <DataTable
          title="Curated List Instance Scores"
          columns={columns}
          data={aInstanceCompScoreData}
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
export default CuratedListInstanceScores;
