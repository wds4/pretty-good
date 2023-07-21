const MiniInstanceSummary = ({ oNode, instanceID }) => {
  const name = oNode?.name;
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          border: '1px solid black',
          width: '500px',
          marginBottom: '5px',
          padding: '5px',
          marginLeft: '5px',
          textAlign: 'left'
        }}
      >
        {name}
      </div>
    </>
  );
};
export default MiniInstanceSummary;
