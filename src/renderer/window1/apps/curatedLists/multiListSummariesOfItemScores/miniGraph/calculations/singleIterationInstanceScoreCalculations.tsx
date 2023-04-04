import { useSelector, useDispatch } from 'react-redux';
import {
  yAxisConst,
  yAxisDisplacement,
} from '../grapevineVisualization';
import { convertInputToCertainty, convertRatingToMod3Coeff } from 'renderer/window1/lib/grapevine';

export const foo = () => {};

export const singleIterationInstanceScoreCalculations = (
  myPubKey,
  controlPanelSettings,
  aContextDAG,
  nodes,
  edges,
  aAllUserNodes,
  aAllInstanceNodes,
) => {

  // for now, aContextDAG = ["thisListCuration_allContexts"]; bc those are the ratings I currently have to work with.
  // Future: will accomodate any generic aContextDAG
  const aAllEdges = edges.getIds();
  const {
    rigor,
    defaultUserTrustAverageScore,
    defaultUserTrustConfidence,
    defaultInstanceBaselineAverageScore,
    defaultInstanceBaselineConfidence,
    strat1Coeff,
    strat2Coeff,
    strat3Coeff,
    strat4Coeff,
    strat5Coeff,
    nostrProfileDisplaySize,
    curatedListInstanceYAxis,
  } = controlPanelSettings;

  const attenuationFactor = 100; // aF always 1 for non-transitive rating / comp score systems

  // CYCLE THROUGH EACH NODE; THEN:
  /// / STEP 1: ADD DIRECT-RATING SCORE
  /// / STEP 2: ADD INHERITED SCORE
  /// / STEP 3: ADD DEFAULT SCORE

  // directRating constants
  const strat1Coeff_directRating = strat1Coeff / 100;
  const strat1Coeff_directRating_inverse = strat1Coeff / 100;
  const attenuationFactor_directRating = attenuationFactor / 100;
  const rigor_directRating = rigor / 100;

  const strat2Coeff_directRating_regular = 1 // strat1Coeff only applies to inverseRatings, so is set to unity for (regular) ratings
  const strat2Coeff_directRating_inverse = strat2Coeff / 100;

  const strat3Coeff_directRating = strat3Coeff / 100;
  const strat4Coeff_directRating = strat4Coeff / 100;
  const strat5Coeff_directRating = strat5Coeff / 100;

  // inheritedScore constants
  const attenuationFactor_inherited = 1
  const strat1Coeff_inherited = strat1Coeff / 100;
  const strat2Coeff_inherited = 1
  const mod3Coeff_inherited = 1
  const raterCurrentInfluence_inherited = 1;

  // defaultScore constants
  const attenuationFactor_default = 1
  const strat1Coeff_default = 1
  const strat2Coeff_default = 1
  const mod3Coeff_default = 1
  const raterCurrentInfluence_default = 1;
  // const rating_default = defaultUserTrustAverageScore / 100;
  // const ratingConfidence_default = defaultUserTrustConfidence / 100;
  const rating_default = defaultInstanceBaselineAverageScore / 100;
  const ratingConfidence_default = defaultInstanceBaselineConfidence / 100;
  const rigor_defaultScore = rigor / 100;

  // CYCLE THROUGH EACH INSTANCE NODE AND CALC SCORES
  let aInstanceCompScoreData = [];
  for (let n = 0; n < aAllInstanceNodes.length; n++) {
    const eId = aAllInstanceNodes[n];
    const oNode = nodes.get(eId);
    if (oNode) {
      let sumOfProducts = 0;
      let sumOfWeights = 0;
      let sumOfWeights_directRatings = 0;

      // STEP 1: ADD DIRECT-RATING SCORE
      // * not yet completed *
      let afferentEdgeIDs = oNode?.afferentEdgeIDs;
      if (!afferentEdgeIDs) { afferentEdgeIDs = []; }

      for (let e = 0; e < afferentEdgeIDs.length; e++) {
        const edgeID = afferentEdgeIDs[e];
        const oEdge = edges.get(edgeID);
        // console.log("afferentEdgeIDs; edgeID: "+edgeID)
        const pk_from = oEdge.from;
        const eId_to = oEdge.to;
        // make sure this edge is from a user to an instance;
        // alternatively, could check the ratingTemplateSlug
        if (
          aAllUserNodes.includes(pk_from) &&
          aAllInstanceNodes.includes(eId_to)
        ) {
          const oNode_from = nodes.get(pk_from);
          const oNode_to = nodes.get(eId_to);

          // compositeScore: thisListCuration_allContexts
          const userCompScoreType = 'thisListCuration_allContexts';
          const instanceCompScoreType = 'thisListCuration_allContexts';
          const oScores_from = oNode_from.scores[userCompScoreType];
          const oScores_to = oNode_to.scores[instanceCompScoreType];

          const raterCurrentInfluence = oScores_from.influence;
          const raterCurrentAverage = oScores_from.average;
          // const rating = 1; // assume this for now
          const rating = oEdge.rating;
          const ratingConfidence = 0.8; // assume this for now

          const mod1Coeff =
          raterCurrentAverage * strat1Coeff_directRating + 1 * (1 - strat1Coeff_directRating);
        const mod3Coeff = convertRatingToMod3Coeff(
          rating,
          strat3Coeff_directRating,
          strat4Coeff_directRating,
          strat5Coeff_directRating
        );

        const weight =
          (attenuationFactor_directRating *
          mod3Coeff *
          strat2Coeff_directRating_regular *
          ratingConfidence *
          raterCurrentInfluence);

        const weightAdjusted = weight;
        sumOfWeights_directRatings += weightAdjusted;
        const product = (weightAdjusted * rating * mod1Coeff);
        sumOfProducts += product;
        oEdge.mod1Coeff = mod1Coeff.toPrecision(4);
        oEdge.weightAdjusted = weightAdjusted.toPrecision(4);
        oEdge.weight = weight.toPrecision(4);
        oEdge.product = product.toPrecision(4);
        oEdge.raterInfluence = raterCurrentInfluence;
        oEdge.ratingConfidence = ratingConfidence * 100;
        oEdge.mod3Coeff = mod3Coeff.toPrecision(4);
        oEdge.strat2Coeff = strat2Coeff_directRating_regular.toPrecision(4);
        oEdge.attenuationFactor = attenuationFactor_directRating;
        oEdge.color.opacity = weightAdjusted;
        edges.update(oEdge);
        }
      }

      // STEP 2: ADD INHERITED SCORE
      // * not yet implemented *

      // STEP 3: ADD DEFAULT SCORE
      let weight_default = (attenuationFactor_default * mod3Coeff_default * strat2Coeff_default * strat1Coeff_default * ratingConfidence_default * raterCurrentInfluence_default);
      let weightAdjusted_default = weight_default - sumOfWeights_directRatings;
      // console.log("qwerty; "+weightAdjusted_default + " = " + weight_default + " - " + sumOfWeights_directRatings)
      if (weightAdjusted_default < 0) { weightAdjusted_default = 0} // should not neet this
      sumOfWeights += sumOfWeights_directRatings;
      sumOfWeights += weightAdjusted_default;
      var product_default = (weightAdjusted_default * rating_default);
      sumOfProducts += product_default;

      let average = (sumOfProducts / sumOfWeights).toPrecision(4);
      let input = sumOfWeights.toPrecision(4);
      let certainty = (convertInputToCertainty(input,rigor_defaultScore)).toPrecision(4);
      let influence = (average * certainty).toPrecision(4);

      if (!oNode.scores.thisListCuration_allContexts) {
        oNode.scores.thisListCuration_allContexts = {};
      }
      if (!oNode.scores.thisListCuration_allContexts.defaultScore) {
        oNode.scores.thisListCuration_allContexts.defaultScore = {};
      }

      oNode.scores.thisListCuration_allContexts.defaultScore.product = parseFloat(product_default.toPrecision(4));
      oNode.scores.thisListCuration_allContexts.defaultScore.weight = parseFloat(weight_default.toPrecision(4));
      oNode.scores.thisListCuration_allContexts.defaultScore.weightAdjusted = parseFloat(weightAdjusted_default.toPrecision(4));
      // oNode.scores.thisListCuration_allContexts.defaultScore.weightAdjusted = weight_default - sumOfWeights_directRatings;

      oNode.scores.thisListCuration_allContexts.sumOfProducts = sumOfProducts.toPrecision(4);
      // oNode.scores.thisListCuration_allContexts.sumOfWeights = oNode.name;
      oNode.scores.thisListCuration_allContexts.sumOfWeights = sumOfWeights.toPrecision(4);
      oNode.scores.thisListCuration_allContexts.influence = influence;
      oNode.scores.thisListCuration_allContexts.average = average;
      oNode.scores.thisListCuration_allContexts.certainty = certainty;
      oNode.scores.thisListCuration_allContexts.input = input;

      oNode.x = 200;
      let yNew = 0;
      if (curatedListInstanceYAxis === "influence") {
        yNew = influence;
        // oNode.y = yNew;
      }
      if (curatedListInstanceYAxis === "average") {
        yNew = average;
        // oNode.y = yNew;
      }
      oNode.y = yAxisDisplacement - yNew * yAxisConst;
      oNode.opacity = certainty;
      oNode.color = '#000000';
      // oNode.size = 50 * influence;
      oNode.title = oNode.name;
      oNode.title += "\n average: "+average;
      oNode.title += "\n influence: "+influence;
      nodes.update(oNode);


      ///////////////////////////////////////////////////////////////////////
      //////////////////// START CREATE Y-AXIS //////////////////////////////
      // Labels for the y-axis. For some reason if I set these once during setup, the axis is misaligned.
      // Future: see if I can make this its own function and call this only once, or less frequently, rather than
      // with every calculation iteration
      const xPosition = 300;

      const yVal0 = 0;
      const yConverted0 = yAxisDisplacement - yVal0 * yAxisConst;
      const oNode0 = {
        id: 0,
        group: 'legend',
        physics: false,
        x: xPosition,
        y: yConverted0,
        label: '0',
        shape: 'circle',
        size: 15,
      }
      nodes.update(oNode0);

      const yVal02 = 0.2;
      const yConverted02 = yAxisDisplacement - yVal02 * yAxisConst;
      const oNode02 = {
        id: 2,
        group: 'legend',
        physics: false,
        x: xPosition,
        y: yConverted02,
        label: '0.2',
        shape: 'circle',
        size: 5,
      }
      nodes.update(oNode02);

      const yVal04 = 0.4;
      const yConverted04 = yAxisDisplacement - yVal04 * yAxisConst;
      const oNode04 = {
        id: 4,
        group: 'legend',
        physics: false,
        x: xPosition,
        y: yConverted04,
        label: '0.4',
        shape: 'circle',
        size: 5,
      }
      nodes.update(oNode04);

      const yVal06 = 0.6;
      const yConverted06 = yAxisDisplacement - yVal06 * yAxisConst;
      const oNode06 = {
        id: 6,
        group: 'legend',
        physics: false,
        x: xPosition,
        y: yConverted06,
        label: '0.6',
        shape: 'circle',
        size: 5,
      }
      nodes.update(oNode06);

      const yVal08 = 0.8;
      const yConverted08 = yAxisDisplacement - yVal08 * yAxisConst;
      const oNode08 = {
        id: 8,
        group: 'legend',
        physics: false,
        x: xPosition,
        y: yConverted08,
        label: '0.8',
        shape: 'circle',
        size: 5,
      }
      nodes.update(oNode08);

      const yVal1 = 1;
      const yConverted1 = yAxisDisplacement - yVal1 * yAxisConst;
      const oNode1 = {
        id: 10,
        group: 'legend',
        physics: false,
        x: xPosition,
        y: yConverted1,
        label: '1',
        shape: 'circle',
        size: 15,
      }
      nodes.update(oNode1);
      ////////////////////  END CREATE Y-AXIS ///////////////////////////////
      ///////////////////////////////////////////////////////////////////////

      const oNextTableRow = {
        id: oNode.id,
        name: oNode.name,
        description: 'foo',
        average: average,
        input: input,
        influence: influence,
        nodeID: oNode.id,
      }
      aInstanceCompScoreData.push(oNextTableRow)
    }
  }
  return aInstanceCompScoreData;
};
