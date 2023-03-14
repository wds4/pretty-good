import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const convertRatingToMod3Coeff = (r, s3, s4, s5) => {
  if (r < 1) {
    let mod3Coeff = 1;
    return mod3Coeff;
  }
  // console.log("r,s3,s4,s5,mod3Coeff: s4: "+ s4)
  const s3z = 1 / (1 - s3);
  let logRat = Math.log(r) / Math.log(s5);
  logRat = Math.abs(logRat);
  if (s4 > 0) {
    let logRatExp = Math.pow(logRat, s4);
  } else {
    let logRatExp = logRat;
  }
  let logRatExp = Math.pow(logRat, s4);
  let mod3Coeff = Math.pow(s3z, -logRatExp);
  // console.log("r,s3,s4,s5,mod3Coeff: "+r+" "+s3+" "+s4+" "+s5+" "+mod3Coeff)
  // console.log("r,s3,s4,s5,mod3Coeff: typeof s4: "+typeof s4)

  return mod3Coeff;
};

const convertInputToCertainty = (input, rigor) => {
  const rigority = -Math.log(rigor);
  const fooB = -input * rigority;
  const fooA = Math.exp(fooB);
  const certainty = 1 - fooA;
  return certainty;
};

const calculateCompositeScoresSingleIteration = (
  myPubKey,
  nodes,
  edges,
  controlPanelSettings
) => {
  const aAllNodes = nodes.getIds();
  const aAllEdges = edges.getIds();
  const {
    attenuationFactor,
    rigor,
    defaultUserTrustAverageScore,
    defaultUserTrustConfidence,
    strat1Coeff,
    strat2Coeff,
    strat3Coeff,
    strat4Coeff,
    strat5Coeff,
  } = controlPanelSettings;

  const strat1Coeff_ = strat1Coeff / 100;
  const attenuationFactor_ = attenuationFactor / 100;

  for (let n = 0; n < aAllNodes.length; n++) {
    const pk = aAllNodes[n];
    const oNode = nodes.get(pk);
    const sumOfProducts = 0;
    const sumOfWeights = 0;
    const { afferentEdgeIDs } = oNode;
    for (let e = 0; e < afferentEdgeIDs.length; e++) {
      const edgeID = afferentEdgeIDs[e];
      const oEdge = edges.get(edgeID);
      const pk_from = oEdge.from;
      const pk_to = oEdge.to;
      const oNode_from = nodes.get(pk_from);
      const oNode_to = nodes.get(pk_to);
      // compositeScore: allPurposeTypes_allContexts -- NOT YET DONE:
      // will implement after relaysCuration_allRelayTypes, and then add inheritance

      // compositeScore: relaysCuration_allRelayTypes
      const compScoreType = 'relaysCuration_allRelayTypes';
      const oScores_from = node_from.scores[compScoreType];
      const oScores_to = node_to.scores[compScoreType];
      const raterCurrentInfluence = oScores_from.influence;
      const raterCurrentAverage = oScores_from.average;
      const rating_score = 1; // assume this for now
      const rating_confidence = 0.8; // assume this for now

      const mod1Coeff =
        raterCurrentAverage * strat1Coeff_ + 1 * (1 - strat1Coeff_);
      const mod3Coeff = convertRatingToMod3Coeff(
        rating,
        strat3Coeff,
        strat4Coeff,
        strat5Coeff
      );

      const weight =
        attenuationFactor_ *
        mod3Coeff *
        strat2Coeff_regular *
        ratingConfidence *
        raterCurrentInfluence;
    }
  }
};

const initializeCompositeScores = (myPubKey, nodes, controlPanelSettings) => {
  const { defaultUserTrustAverageScore, defaultUserTrustConfidence } =
    controlPanelSettings;

  const aAllNodes = nodes.getIds();
  for (let n = 0; n < aAllNodes.length; n++) {
    const pk = aAllNodes[n];
    let size = 50;
    if (pk == myPubKey) {
      //
    } else {
      size =
        50 *
        (defaultUserTrustAverageScore / 100) *
        (defaultUserTrustConfidence / 100);
    }
    nodes.update({ id: pk, size });
  }
};

const populateEachNodeAfferentEdgeIDs = (nodes, edges) => {
  const aAllEdges = edges.getIds();
  for (let e = 0; e < aAllEdges.length; e++) {
    const oEdge = aAllEdges[e];
    const edgeID = oEdge.id;
    const pk_from = oEdge.from;
    const pk_to = oEdge.to;
    // add edgeID to node[pk_to].afferentEdgeIDs
    const oNode = nodes.get(pk_to);
    const { afferentEdgeIDs } = oNode;
    afferentEdgeIDs.push(pk_to);
    nodes.update({ id: pk_to, afferentEdgeIDs });
  }
};

const ScoresCalculationsWithTimer = ({ myPubKey, nodes, edges }) => {
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );
  const [count, setCount] = useState(0);

  populateEachNodeAfferentEdgeIDs(nodes, edges);
  initializeCompositeScores(myPubKey, nodes, controlPanelSettings);

  useEffect(() => {
    setTimeout(() => {
      calculateCompositeScoresSingleIteration(
        myPubKey,
        nodes,
        edges,
        controlPanelSettings
      );
      setCount((count) => count + 1);
    }, 1000);
  }, [count]); // <- add empty brackets here

  return <div>I've rendered {count} times!</div>;
};
export default ScoresCalculationsWithTimer;
