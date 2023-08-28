import React from 'react';

const jQuery = require('jquery');
jQuery.DataTable = require('datatables.net');

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class DataTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conceptLinks: [],
    };
  }

  async componentDidMount() {
    // const conceptDataSet = [];
    // makeThisPageTable(conceptDataSet);
    const makeThisPageTable = () => {
      const conceptDataSet = [];
      let aNextPattern1 = ['', 'a1', 'b1', 'c1', 'd1'];
      conceptDataSet.push(aNextPattern1);
      aNextPattern2 = ['', 'a2', 'b2', 'c2', 'd2'];
      conceptDataSet.push(aNextPattern2);

      const dtable = jQuery('#table_demo').DataTable({
        data: conceptDataSet,
        pageLength: 100,
        columns: [
          {
            class: 'details-control',
            orderable: false,
            data: null,
            defaultContent: '',
          },
          {},
          {},
          { visible: false },
          {},
        ],
        dom: '<"pull-left"f><"pull-right"l>tip',
      });
    };

    await timeout(10);

    makeThisPageTable();
  }

  render() {
    return (
      <>
        <div>DataTables</div>
        <table
          id="table_demo"
          className="display"
          style={{ color: 'black', width: '95%' }}
        >
          <thead>
            <tr>
              <th></th>
              <th>aa</th>
              <th>bb</th>
              <th>cc</th>
              <th>dd</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th>a0</th>
              <th>b0</th>
              <th>c0</th>
              <th>d0</th>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}
