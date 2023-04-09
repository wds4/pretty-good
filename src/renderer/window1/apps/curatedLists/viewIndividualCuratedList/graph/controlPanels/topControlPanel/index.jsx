import SeedUserSelector from "./seedUserSelector";
import AttenuationFactorSelector from "./attenuationFactorSlider";

const TopControlPanel = ({oMyNostrProfileData, aProfileCompScoreData}) => {
  return (
    <>
      <div style={{textAlign:'center'}}>
        <div style={{display: 'inline-block', width:'60%',marginBottom:'5px'}}>
          <AttenuationFactorSelector />
        </div>
        <div style={{display: 'inline-block', width:'30%'}}>
          <SeedUserSelector
            oMyNostrProfileData={oMyNostrProfileData}
            aProfileCompScoreData={aProfileCompScoreData}
          />
        </div>
      </div>
    </>
  );
};
export default TopControlPanel;
