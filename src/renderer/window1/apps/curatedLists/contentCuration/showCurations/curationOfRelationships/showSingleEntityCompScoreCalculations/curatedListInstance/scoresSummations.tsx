const ScoresSummations = ({ oNode }) => {
  let sumOfProducts = '';
  let sumOfWeights = '';
  let sumOfWeightsWithoutStrat = '';
  let average = '';
  let certainty = '';
  let influence = '';

  if (oNode) {
    if (oNode.scores) {
      if (oNode.scores.thisListCuration_allContexts) {
        const foo = oNode.scores.thisListCuration_allContexts;
        sumOfProducts = foo.sumOfProducts;
        sumOfWeights = foo.sumOfWeights;
        sumOfWeightsWithoutStrat = foo.sumOfWeightsWithoutStrat;
        average = foo.average;
        certainty = foo.certainty;
        influence = foo.influence;
      }
    }
  }

  return (
    <>
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          marginBottom: '5px',
          padding: '5px',
          marginLeft: '5px',
          textAlign: 'left',
          fontSize: '10px',
        }}
      >
        <div style={{ marginTop: '10px' }}>
          <div className="grapevinePageColA">sum of products:</div>
          <div className="grapevinePageColB">{sumOfProducts}</div>
        </div>
        <div>
          <div className="grapevinePageColA">input:</div>
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB">{sumOfWeights}</div>
        </div>
        <div>
          <div className="grapevinePageColA">* input:</div>
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB">{sumOfWeightsWithoutStrat}</div>
        </div>
        <div>
          <div className="grapevinePageColA">average:</div>
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB">{average}</div>
        </div>
        <div>
          <div className="grapevinePageColA">certainty:</div>
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB">
            {(certainty * 100).toPrecision(4)} %
          </div>
        </div>
        <div>
          <div className="grapevinePageColA">influence:</div>
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB" />
          <div className="grapevinePageSpacer1Col" />
          <div className="grapevinePageColB">{influence}</div>
        </div>
        <br />
        <div>
          * Input from direct ratings only, not including default input or inherited input
        </div>
      </div>
    </>
  );
};
export default ScoresSummations;
