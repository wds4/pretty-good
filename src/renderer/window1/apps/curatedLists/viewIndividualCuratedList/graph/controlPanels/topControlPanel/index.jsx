import SeedUserSelector from "./seedUserSelector";
import AttenuationFactorSelector from "./attenuationFactorSlider";
import PurposeSelector from './purposeSelector';
import ContextSelector from './contextSelector';
// import ViewingScoreSelector from './viewingScoreSelector';
import TestnetSelector from "./testnetSelector";

const TopControlPanel = () => {
  return (
    <>
      <div style={{textAlign:'center'}}>
        <div style={{display: 'inline-block', width:'60%',marginBottom:'5px'}}>
          <AttenuationFactorSelector />
        </div>
        <div style={{display: 'inline-block', width:'30%'}}>
          <SeedUserSelector />
        </div>
      </div>
    </>
  );
};
export default TopControlPanel;
