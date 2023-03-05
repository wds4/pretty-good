import SeedUserSelector from "./seedUserSelector";
import AttenuationFactorSelector from './attenuationFactorSelector';

const TopControlPanel = () => {
  return (
    <>
      <div>
        <center>Top Control Panel</center>
        <div style={{display: 'inline-block', width:'400px',height:'50px', border: '1px dashed grey'}}>
          <SeedUserSelector />
          <AttenuationFactorSelector />
        </div>
      </div>
    </>
  );
};
export default TopControlPanel;
