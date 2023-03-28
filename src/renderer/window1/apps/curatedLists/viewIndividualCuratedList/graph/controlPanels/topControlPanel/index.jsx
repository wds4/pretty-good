import SeedUserSelector from "./seedUserSelector";
import AttenuationFactorSelector from "./attenuationFactorSlider";
import PurposeSelector from './purposeSelector';
import ContextSelector from './contextSelector';
// import ViewingScoreSelector from './viewingScoreSelector';
import TestnetSelector from "./testnetSelector";

const TopControlPanel = () => {
  return (
    <>
      <div>
        <div style={{display: 'inline-block', width:'100%',marginBottom:'5px'}}>
          <AttenuationFactorSelector />
        </div>
        <div style={{display: 'inline-block', width:'100%'}}>
          <div style={{display: 'inline-block', width:'50%'}}>
            <SeedUserSelector />
          </div>
        </div>
      </div>
    </>
  );
};
export default TopControlPanel;
