import { useSelector, useDispatch } from 'react-redux';
import { nodes, edges } from '../grapevineVisualization';

const RatingsRows = ({ pubkey, controlPanelSettings }) => {
  let oNode = nodes.get(pubkey);
  if (!oNode) {
    oNode = {};
    oNode.afferentEdgeIDs = [];
  }
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          border: '1px dashed grey',
          width: '100%',
          marginBottom: '5px',
          padding: '5px',
          marginLeft: '5px',
          textAlign: 'left',
        }}
      >
        <div className="calculationRowsHeaderContainer">
          <div className="grapevinePageColA">
            rater <span style={{ color: 'blue' }}>(ratee)</span>
          </div>
          <div className="grapevinePageColB">product</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">rating</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">mod.#1 coeff.</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">WEIGHT (adjusted)</div>
          <div className="grapevinePageSpacer2Col" />
          <div className="grapevinePageColB">WEIGHT</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">
            rater <span style={{ color: 'blue' }}>(ratee)</span> influence
          </div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">rating confidence</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">strat. #2 coeff.</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">mod. #3 coeff.</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">Attenuation Factor</div>
        </div>

        <div style={{ color: 'red' }}>
          {oNode.afferentEdgeIDs.map((edgeID) => {
            const oEdge = edges.get(edgeID);
            const rater_pk = oEdge.from;
            const oRaterNode = nodes.get(rater_pk);

            return (
              <div className="calculationRowContainer">
                <div className="grapevinePageColA">{oRaterNode.display_name}</div>
                <div className="grapevinePageColB">{oEdge.product}</div>
                <div className="grapevinePageSpacer1Col">=</div>
                <div className="grapevinePageColB">{oEdge.rating}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.mod1Coeff}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.weightAdjusted}</div>
                <div className="grapevinePageSpacer2Col" />
                <div className="grapevinePageColB">{oEdge.weight}</div>
                <div className="grapevinePageSpacer1Col">=</div>
                <div className="grapevinePageColB">{oEdge.raterInfluence}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">
                {oEdge.ratingConfidence} %
                </div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.strat2Coeff}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.mod3Coeff}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">
                {oEdge.attenuationFactor}
                </div>
              </div>
            );
          })}
        </div>

        <div className="calculationRowContainer">
          <div className="grapevinePageColA">default User Trust Score</div>
          <div className="grapevinePageColB">{}</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">
            {controlPanelSettings.defaultUserTrustAverageScore}
          </div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">{}</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">{}</div>
          <div className="grapevinePageSpacer2Col" />
          <div className="grapevinePageColB">{}</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">{} (by def.)</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">
            {controlPanelSettings.defaultUserTrustConfidence}
          </div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">{} (n/a)</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">{} (n/a)</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">
            {controlPanelSettings.attenuationFactor} (n/a)
          </div>
        </div>
      </div>
    </>
  );
};
export default RatingsRows;
