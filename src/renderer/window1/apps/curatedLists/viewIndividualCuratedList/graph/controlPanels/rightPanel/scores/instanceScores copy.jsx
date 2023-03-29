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

  const data = [];

  if (aCuratedListInstances) {
    let propertyPath = "";
    if (oListData) {
      const sEvent = oListData.event;
      if (sEvent) {
        const oEvent = JSON.parse(sEvent);
        const sWord = oEvent.content;

        const oWord = JSON.parse(sWord);
        if (oWord.nostrCuratedListData) {
          propertyPath = oWord.nostrCuratedListData.propertyPath;
        }
      }
    }
    for (let x = 0; x < aCuratedListInstances.length; x++) {
      const oInstanceSqlData = aCuratedListInstances[x];
      const sEvent = oInstanceSqlData.event;
      const oEvent = JSON.parse(sEvent);
      const sInstanceData = oEvent.content;
      const oInstanceData = JSON.parse(sInstanceData);
      // console.log(`oInstanceData: ${JSON.stringify(oInstanceData, null, 4)}`);
      let name = "";
      let description = "";

      if (propertyPath) {
        // console.log('propertyPath: '+propertyPath);
        name = oInstanceData[propertyPath].name;
        description = oInstanceData[propertyPath].description;
      }

      const oNextRow = {
        id: x,
        name: name,
        description: description,
        average: 0,
        input: 0,
      };
      data.push(oNextRow);
    }
  }

  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <div style={{}}>
        <DataTable
          title="Curated List Instance Scores"
          columns={columns}
          data={rows}
          progressPending={pending}
          progressComponent={<CustomLoader />}
          pagination
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </>
  );
};
export default CuratedListInstanceScores;
