const AnotherListSelector = ({
  processNewItemText,
  newListKind,
}) => {

  return (
    <>
      <select
        style={{
          height: '46px',
          padding: '5px',
          width: '100%',
          height: '50px',
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '26px',
          fontFamily: 'Arial',
        }}
      >
        <option>author & list name</option>
        <option>nevent or note of list</option>
        <option>naddr</option>
      </select>
    </>
  );
};
export default AnotherListSelector;
