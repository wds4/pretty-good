import React, { useState, useEffect } from 'react';
import { useNostrEvents } from 'nostr-react';
import DataTable from 'react-data-table-component';
import styled, { keyframes } from 'styled-components';
import { Spinner, CustomLoader } from './reactDataTables';

const CuratedListInstanceScores = ({
  curatedListFocusID,
  oListData,
  aCuratedListInstances,
  aInstanceCompScoreData,
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
    },
  ];

  return (
    <>
      <div style={{display: 'none', textAlign: 'left', fontSize: '10px', border: '1px solid red', padding: '5px' }}>{JSON.stringify(aInstanceCompScoreData,null,4)}</div>
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
