import List from './list';

const AllListsLoadSql = ({aListData}) => {
  return (
    <>
      <div style={{textAlign: 'center', marginBottom: '10px'}}>Loading data from SQL:</div>
      <div>number of lists: {aListData.length}</div>
      {aListData.map((oListData)=>{
        const oEvent = JSON.parse(oListData.event);
        return (
          <><List event={oEvent} /></>
        );
      })}
    </>
  );
};

export default AllListsLoadSql;
