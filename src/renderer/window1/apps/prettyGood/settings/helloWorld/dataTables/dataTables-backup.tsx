const jQuery = require("jquery");
jQuery.DataTable = require("datatables.net");

function makeThisPageTable(conceptDataSet) {
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

const DataTables = () => {
  const conceptDataSet = [];
  makeThisPageTable(conceptDataSet);
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
            <th />
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
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
    </>
  );
};
export default DataTables;
