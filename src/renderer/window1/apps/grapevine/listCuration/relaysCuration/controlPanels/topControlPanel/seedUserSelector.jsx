const SeedUserSelector = () => {
  return (
    <>
      <div>
        <div style={{display:'inline-block'}}>seed user:</div>
        <div style={{display:'inline-block', marginLeft: '5px'}}>
          <select>
            <option>me</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default SeedUserSelector;
