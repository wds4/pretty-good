import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { updateCuratedListInstanceFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const CuratedListInstanceScores = ({
  aInstanceCompScoreData,
}) => {
  const dispatch = useDispatch();
  const ExpandedComponent = ({ data }) => (
    <pre style={{ textAlign: 'left' }}>{data.description}</pre>
  );

  const ItemNavbar = ({row}) => {
    return (
      <>
        <NavLink
          style={{color: 'green'}}
          onClick={() => {
            dispatch(updateCuratedListInstanceFocus(row.id));
          }}
          end to="/CuratedListsHome/CuratedListSpecificInstance"
        >
          link
        </NavLink>
      </>
    )
  }

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
    {
      name: 'Link',
      selector: (row) => ( <ItemNavbar row={row} /> ),
      sortable: true,
    },
  ];

  return (
    <>
      <div style={{}}>
        <DataTable
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
/*
DatTable:
          title="Curated List Instance Scores"
*/
