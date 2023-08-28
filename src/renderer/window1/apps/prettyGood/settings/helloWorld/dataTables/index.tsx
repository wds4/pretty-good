import React from 'react';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/helloWorld';
import { timeout } from 'renderer/window1/lib/pg';
const jQuery = require('jquery');
jQuery.DataTable = require('datatables.net');

let foo = true;

const makeThisPageTable = async () => {
  console.log("makeThisPageTable; foo: "+foo);
  if (foo) {
    foo = false;
    const conceptDataSet = [];
    let aNextPattern1 = ['', 'a1', 'b1', 'c1', 'd1'];
    conceptDataSet.push(aNextPattern1);
    let aNextPattern2 = ['', 'a2', 'b2', 'c2', 'd2'];
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
  }
};

export default class DataTablesHelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    foo = true;
    updateMainColWidth();
    const mastheadDescriptor = 'DataTables: Hello World';
    updateMastheadCenter(mastheadDescriptor);
    await timeout(500);
    console.log("makeThisPageTable");
    await makeThisPageTable();

    /*
    foo = true;
    if (foo) {
      makeThisPageTable();
      foo = false;
    }
    */
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <div className="tableContainer" style={{marginTop:"20px",marginLeft:"20px"}} >
              <table
                id="table_demo"
                className="display"
                style={{ color: 'black', width: '95%' }}
              >
                <thead>
                  <tr>
                    <th />
                    <th>aa</th>
                    <th>bb</th>
                    <th>cc</th>
                    <th>dd</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th />
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>d</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
