import { useSelector } from 'react-redux';
import { nodes, edges, aAllUserNodes, } from '../grapevineVisualization';
import { convertInputToCertainty, convertRatingToMod3Coeff } from 'renderer/window1/lib/grapevine';

export const foo = () => {}

export const singleIterationCompositeUserScoreCalculations = (myPubKey,controlPanelSettings,aContextDAG) => {
  // for now, aContextDAG = ["thisListCuration_allContexts"]; bc those are the ratings I currently have to work with.
  // Future: will accomodate any generic aContextDAG
  const aAllEdges = edges.getIds();

  /*
  let controlPanelSettings_X = {};
  const e = document.getElementById("controlPanelSettingsContainer");
  if (e) {
    controlPanelSettings_X = JSON.parse(e.innerHTML);
  }
  */

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
    nostrProfileDisplaySize,
    curatedListInstanceYAxis,
  } = controlPanelSettings;

  // CYCLE THROUGH EACH NODE; THEN:
  //// STEP 1: ADD DIRECT-RATING SCORE
  //// STEP 2: ADD INHERITED SCORE
  //// STEP 3: ADD DEFAULT SCORE

  // directRating constants
  const strat1Coeff_directRating = strat1Coeff / 100;
  const strat1Coeff_directRating_inverse = strat1Coeff / 100;
  let attenuationFactor_directRating = attenuationFactor / 100;
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
  const rating_default = defaultUserTrustAverageScore / 100;
  const ratingConfidence_default = defaultUserTrustConfidence / 100;
  const rigor_defaultScore = rigor / 100;

  // CYCLE THROUGH EACH USER NODE AND CALC SCORES
  let aProfileCompScoreData = [];
  for (let n = 0; n < aAllUserNodes.length; n++) {
    const pk = aAllUserNodes[n];
    const oNode = nodes.get(pk);
    if (oNode) {
      let sumOfProducts = 0;
      let sumOfWeights = 0;
      let sumOfWeights_directRatings = 0;

      // STEP 1: ADD DIRECT-RATING SCORE
      let afferentEdgeIDs = oNode?.afferentEdgeIDs;
      if (!afferentEdgeIDs) { afferentEdgeIDs = []; }

      for (let e = 0; e < afferentEdgeIDs.length; e++) {
        const edgeID = afferentEdgeIDs[e];
        const oEdge = edges.get(edgeID);
        // console.log("afferentEdgeIDs; edgeID: "+edgeID)
        const pk_from = oEdge.from;
        const pk_to = oEdge.to;
        // make sure this edge is from a user to a user;
        // alternatively, could check the ratingTemplateSlug
        // better: make arrays: aAfferentEdgeIDsUserToUser and aAfferentEdgeIDsUserToInstance
        if ( (aAllUserNodes.includes(pk_from)) && (aAllUserNodes.includes(pk_to)) ) {
          const oNode_from = nodes.get(pk_from);
          const oNode_to = nodes.get(pk_to);

          if (oNode_from.seed == true) {
            attenuationFactor_directRating = 1;
          }
          else {
            attenuationFactor_directRating = attenuationFactor / 100;
          }

          // compositeScore: thisListCuration_allContexts
          const compScoreType = 'thisListCuration_allContexts';
          const oScores_from = oNode_from.scores[compScoreType];
          const oScores_to = oNode_to.scores[compScoreType];
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

      // if (myPubKey == pk) {
      if (oNode.seed) {
        influence = 1;
        average = 1;
        certainty = 1;
        input = 10000;
      };

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

      oNode.size = 50;
      if (nostrProfileDisplaySize === "influence") {
        oNode.size = 50 * influence;
        // console.log("nostrProfileDisplaySize === influence");
      }
      if (nostrProfileDisplaySize === "average") {
        oNode.size = 50 * average;
        // console.log("nostrProfileDisplaySize === average");
      }

      oNode.title = oNode.name;
      oNode.title += "\n averagee: "+average;
      oNode.title += "\n influence: "+influence;
      oNode.title += "\n input: "+input;
      oNode.title += "\n certainty: " + (certainty * 100) +" %";
      // oNode.label = attenuationFactor;
      oNode.opacity = certainty;
      nodes.update(oNode);

      const oNextTableRow = {
        id: oNode.id,
        name: oNode.name,
        description: 'foo',
        average: average,
        input: input,
        influence: influence,
        pubkey: oNode.id,
      }
      aProfileCompScoreData.push(oNextTableRow)
    }
  }
  return aProfileCompScoreData;
}
