const DisplayTab = () => {
  return (
    <>
      <div>
        The size of each user will represent:{' '}
        <select>
          <option selected>influence</option>
          <option>average</option>
          <option>nothing</option>
        </select>
      </div>
      <div>
        The size of each instance will represent:{' '}
        <select>
          <option>influence</option>
          <option selected>average</option>
          <option>nothing</option>
        </select>
      </div>
    </>
  );
};
export default DisplayTab;
