import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import {
  updateSelectedPubkeyForShowingTrustCalculations,
  updateSelectedInstanceIDForShowingCompScoreCalculations,
  updateEntityTypeForShowingCalculations,
} from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';
import {
  noProfilePicUrl,
} from 'renderer/window1/const';
import TopControlPanel from './controlPanels/topControlPanel';
import RightPanel from './controlPanels/rightPanel';
import ShowSingleEntityCompScoreCalculations from './showSingleEntityCompScoreCalculations';
// import ShowSingleEntityCompScoreCalculations from 'renderer/window1/apps/grapevine/components/showSingleEntityCompScoreCalculations';
import { singleIterationCompositeUserScoreCalculations } from './calculations/singleIterationCompositeUserScoreCalculations';
import { singleIterationInstanceScoreCalculations } from './calculations/singleIterationInstanceScoreCalculations';
import {
  uDefaultScores_seed,
  iDefaultScores,
} from './const';
import Header from './header';

const uScoresDefault_seed = {
  allPurposeTypes_allContexts: JSON.parse(JSON.stringify(uDefaultScores_seed)),
  allListCuration_allContexts: JSON.parse(JSON.stringify(uDefaultScores_seed)),
  thisListCuration_allContexts: JSON.parse(JSON.stringify(uDefaultScores_seed)),
},

const { options } = VisStyleConstants;

export let nodes = new DataSet([]);
export let edges = new DataSet([]);
let network = {};
let data = {
  nodes,
  edges,
};
export const aAllUserNodes = [];
export const aAllInstanceNodes = [];

export const VisNetwork_Grapevine = () => {
  // moved from singleIterationCompositeUserScoreCalculations
  // might want to move this to makeVisGraph_Grapevine
  const aAllNodes = nodes.getIds();
  for (let n = 0; n < aAllNodes.length; n++) {
    const pk = aAllNodes[n];
    const oNode = nodes.get(pk);
    if (oNode.group == "user") {
      aAllUserNodes.push(pk);
    }
    if (oNode.group == "instance") {
      aAllInstanceNodes.push(pk);
    }
  }
  //end moved from singleIterationCompositeUserScoreCalculations

  // A reference to the div rendered by this component
  const domNode = useRef(null);

  // A reference to the vis network instance
  network = useRef(null);

  useEffect(() => {
    network.current = new Network(domNode.current, data, options);
    network.current.fit();

    network.current.on('click', function (params) {
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
    });

    // EDGES
    network.current.on('selectEdge', function (params) {
      // console.log("selectEdge event triggered")
      const edges_arr = params.edges;
      const numEdges = edges_arr.length;
      if (numEdges == 1) {
        const edgeID = edges_arr[0];
      }
    });
    network.current.on('deselectEdge', function (params) {});

    // NODES
    network.current.on('selectNode', function (params) {
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
      if (numNodes == 1) {
        const nodeID = nodes_arr[0];
        document.getElementById('selectedUserElem').value = nodeID;
        document.getElementById('selectedUserElem')?.click();
      }
    });
    network.current.on('deselectNode', function (params) {});
  }, [domNode, network, data, options]);

  return <div style={{ height: '100%', width: '100%' }} ref={domNode} />;
};

const makeVisGraph_Grapevine = async (
  oMyNostrProfileData,
  oNostrProfilesData,
  aRatingsOfInstancesData,
  aEndorsementsOfCuratorsData,
  controlPanelSettings,
) => {
  // console.log("oNostrProfilesData: "+JSON.stringify(oNostrProfilesData,null,4))

  const nodes_arr = [];
  const edges_arr = [];

  const aNodesIDs = [];
  const aEdgesIDs = [];

  const {
    attenuationFactor,
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
  } = controlPanelSettings;

  const ave = defaultUserTrustAverageScore / 100;
  const cer = defaultUserTrustConfidence / 100;
  const inf = ave * cer;
  const uDefaultScores = {
    influence: inf,
    average: ave,
    certainty: cer,
    input: 0,
  }
  const uScoresDefault = {
    allPurposeTypes_allContexts: JSON.parse(JSON.stringify(uDefaultScores)),
    allListCuration_allContexts: JSON.parse(JSON.stringify(uDefaultScores)),
    thisListCuration_allContexts: JSON.parse(JSON.stringify(uDefaultScores)),
  };

  const iAve = defaultInstanceBaselineAverageScore / 100;
  const iCer = defaultInstanceBaselineConfidence / 100;
  const iInf = iAve * iCer;
  const iDefaultScores = {
    influence: iInf,
    average: iAve,
    certainty: iCer,
    input: 0,
  }
  const iScoresDefault = {
    allPurposeTypes_allContexts: JSON.parse(JSON.stringify(iDefaultScores)),
    allListCuration_allContexts: JSON.parse(JSON.stringify(iDefaultScores)),
    thisListCuration_allContexts: JSON.parse(JSON.stringify(iDefaultScores)),
  };

  // console.log("qwerty uScoresDefault: "+JSON.stringify(uScoresDefault)+"; iScoresDefault: "+JSON.stringify(iScoresDefault))

  const myPubKey = oMyNostrProfileData.pubkey;
  const myName = oMyNostrProfileData.name;
  const myDisplayName = oMyNostrProfileData.display_name;
  let myImageUrl = oMyNostrProfileData.picture_url;
  if (!myImageUrl) {
    myImageUrl = noProfilePicUrl
  }

  const oNodeN = {
    id: -1,
    group: 'legend',
    physics: false,
    x: 250,
    y: 100,
    label: '-1',
    shape: 'circle',
    size: 15,
  }
  // nodes_arr.push(oNodeN)

  const oNode0 = {
    id: 0,
    group: 'legend',
    physics: false,
    x: 250,
    y: 0,
    label: '0',
    shape: 'circle',
    size: 15,
  }
  nodes_arr.push(oNode0)

  const oNode1 = {
    id: 1,
    group: 'legend',
    physics: false,
    x: 250,
    y: -100,
    label: '1',
    shape: 'circle',
    size: 15,
  }
  nodes_arr.push(oNode1)

  const oNode = {
    id: myPubKey,
    group: "user",
    image: myImageUrl,
    brokenImage: noProfilePicUrl,
    shape: 'circularImage',
    title: myDisplayName,
    label: myName,
    name: myName,
    display_name: myDisplayName,
    afferentEdgeIDs: [],
    seed: true,
    scores: JSON.parse(JSON.stringify(uScoresDefault)),
    size: 50,
    physics: false,
    x: -200,
    y: 0,
  }
  nodes_arr.push(oNode)
  aNodesIDs.push(myPubKey);

  for (let r=0;r<aEndorsementsOfCuratorsData.length;r++) {
    const oEndorsementSql = aEndorsementsOfCuratorsData[r];
    const oEndorsementEvent = JSON.parse(oEndorsementSql.event);
    const oEndorsementWord = JSON.parse(oEndorsementEvent.content);
    const endorsement_event_id = oEndorsementEvent.id;
    // console.log("oEndorsementWord: "+JSON.stringify(oEndorsementWord))
    const ratingTemplateSlug = oEndorsementWord.ratingData.ratingTemplateData.ratingTemplateSlug;
    if (ratingTemplateSlug=="nostrCuratedListsCuratorEndorsement") {
      // rater data
      const pk_rater = oEndorsementWord.ratingData.raterData.nostrProfileData.pubkey;
      const name_rater = oEndorsementWord.ratingData.raterData.nostrProfileData?.name;
      const display_name_rater = oEndorsementWord.ratingData.raterData.nostrProfileData?.display_name;
      // ratee data
      const pk_ratee = oEndorsementWord.ratingData.rateeData.nostrProfileData.pubkey;
      const name_ratee = oEndorsementWord.ratingData.rateeData.nostrProfileData?.name;
      const display_name_ratee = oEndorsementWord.ratingData.rateeData.nostrProfileData?.display_name;
      // rating data
      const regularSliderRating = oEndorsementWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.regularSliderRating;
      const referenceRegularSliderRating = oEndorsementWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.referenceRegularSliderRating;
      const confidence = oEndorsementWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;

      let rater_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk_rater]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk_rater].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          rater_profilePicUrl = oProfileContent.picture;
        }
      }

      let ratee_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk_ratee]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk_ratee].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          ratee_profilePicUrl = oProfileContent.picture;
        }
      }

      if (!aEdgesIDs.includes(endorsement_event_id)) {
        // add endorsement as another edge
        let title = '';
        const rating = (regularSliderRating / referenceRegularSliderRating).toPrecision(4);
        title += 'rating: '+ rating;
        title += '\n confidence: '+confidence;
        const width = 5 * Math.log(rating * 10);
        if (!rater_profilePicUrl) {
          rater_profilePicUrl = noProfilePicUrl;
        }
        const oEdge = {
          id: endorsement_event_id,
          // group: 'ratingOfInstance', // no group styling for edges (I think ???)
          from: pk_rater,
          to: pk_ratee,
          color: 'blue',
          title: title,
          width: width,
          rating: rating,
        }
        edges_arr.push(oEdge);
        aEdgesIDs.push(endorsement_event_id);
      }

      if (!aNodesIDs.includes(pk_rater)) {
        // add rater as another rater node
        let oNode = {
          id: pk_rater,
          group: "user",
          shape: 'circularImage',
          image: rater_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_rater,
          label: name_rater,
          name: name_rater,
          display_name: display_name_rater,
          afferentEdgeIDs: [],
          seed: false,
          scores: JSON.parse(JSON.stringify(uScoresDefault)),
          size: 50 * uDefaultScores.influence,
        }
        if (pk_rater == myPubKey) {
          oNode.scores = JSON.parse(JSON.stringify(uScoresDefault_seed));
          oNode.seed = true;
        }
        nodes_arr.push(oNode);
        aNodesIDs.push(pk_rater);
      }

      if (!aNodesIDs.includes(pk_ratee)) {
        // add ratee as another ratee node
        let oNode = {
          id: pk_ratee,
          group: "user",
          shape: 'circularImage',
          image: ratee_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_ratee,
          label: name_ratee,
          name: name_ratee,
          display_name: display_name_ratee,
          afferentEdgeIDs: [],
          seed: false,
          scores: JSON.parse(JSON.stringify(uScoresDefault)),
          size: 50 * uDefaultScores.influence,
        }
        if (pk_ratee == myPubKey) {
          oNode.scores = JSON.parse(JSON.stringify(uScoresDefault_seed));
          oNode.seed = true;
          oNode.size = 50;
          oNode.physics = false;
          oNode.x = -200;
          oNode.y = 0;
        }
        nodes_arr.push(oNode);
        aNodesIDs.push(pk_ratee);
      }
    }
  }

  for (let r=0;r<aRatingsOfInstancesData.length;r++) {
    const oRatingSql = aRatingsOfInstancesData[r];
    const oRatingEvent = JSON.parse(oRatingSql.event);
    const oRatingWord = JSON.parse(oRatingEvent.content);
    const rating_event_id = oRatingEvent.id;
    // ratingTemplateData
    const ratingTemplateSlug = oRatingWord.ratingData.ratingTemplateData.ratingTemplateSlug;
    if (ratingTemplateSlug=="nostrCuratedListInstanceGenericRating") {
      // rater data
      const pk_rater = oRatingWord.ratingData.raterData.nostrProfileData.pubkey;
      const name_rater = oRatingWord.ratingData.raterData.nostrProfileData?.name;
      const display_name_rater = oRatingWord.ratingData.raterData.nostrProfileData?.display_name;
      // ratee data
      const instance_event_id = oRatingWord.ratingData.rateeData.nostrCuratedListInstanceData.eventID;
      const instance_name = oRatingWord.ratingData.rateeData.nostrCuratedListInstanceData?.name;
      // rating data
      const regularSliderRating = oRatingWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.regularSliderRating;
      const confidence = oRatingWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;

      let rater_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk_rater]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk_rater].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          rater_profilePicUrl = oProfileContent.picture;
        }
      }
      if (!aEdgesIDs.includes(rating_event_id)) {
        // add rating as another edge
        let title = '';
        title += 'rating: '+regularSliderRating;
        title += '\n confidence: '+confidence;
        const width = 5 * Math.log(regularSliderRating / 10);
        /*
        if (!rater_profilePicUrl) {
          rater_profilePicUrl = noProfilePicUrl
        }
        */
        const oEdge = {
          id: rating_event_id,
          // group: 'ratingOfInstance', // no group styling for edges (I think ???)
          from: pk_rater,
          to: instance_event_id,
          color: 'red',
          title: title,
          width: width,
          rating: regularSliderRating / 100,
        }
        edges_arr.push(oEdge);
        aEdgesIDs.push(rating_event_id);
      }

      if (!aNodesIDs.includes(instance_event_id)) {
        const oNode = {
          id: instance_event_id,
          group: 'instance',
          title: instance_name,
          label: instance_name,
          name: instance_name,
          scores: JSON.parse(JSON.stringify(iScoresDefault)),
          size: 15,
          afferentEdgeIDs: [],
          physics: false,
          shape: 'diamond',
          // x: 500,
          // y: 100 * aNodesIDs.length - 500,
        }
        nodes_arr.push(oNode);
        aNodesIDs.push(instance_event_id);
      }

      if (!aNodesIDs.includes(pk_rater)) {
        // add rater as another rater node
        let oNode = {
          id: pk_rater,
          group: "user",
          shape: 'circularImage',
          image: rater_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_rater,
          label: name_rater,
          name: name_rater,
          display_name: display_name_rater,
          afferentEdgeIDs: [],
          seed: false,
          scores: JSON.parse(JSON.stringify(uScoresDefault)),
          size: 50 * uDefaultScores.influence,
        }
        if (pk_rater == myPubKey) {
          oNode.scores = JSON.parse(JSON.stringify(uScoresDefault_seed));
          oNode.seed = true;
          oNode.size = 50;
          oNode.physics = false;
          oNode.x= -200;
          oNode.y = 0;
        }
        nodes_arr.push(oNode);
        aNodesIDs.push(pk_rater);
      }
    }
  }

  nodes = new DataSet(nodes_arr);
  edges = new DataSet(edges_arr);
  data = {
    nodes,
    edges,
  };
  ReactDOM.render(
    <VisNetwork_Grapevine
      clickHandler={console.log('click')}
      onSelectNode={console.log('onSelectNode')}
    />,
    document.getElementById('grapevineContainerElem')
  );
};

export const populateEachNodeAfferentEdgeIDs = (nodes, edges) => {
  // console.log("populateEachNodeAfferentEdgeIDs ");
  const aAllEdges = edges.getIds();
  for (let e = 0; e < aAllEdges.length; e++) {
    const edgeID = aAllEdges[e];
    const oEdge = edges.get(edgeID);
    const pk_from = oEdge.from;
    const pk_to = oEdge.to;
    // add edgeID to node[pk_to].afferentEdgeIDs
    const oNode = nodes.get(pk_to);
    const { afferentEdgeIDs } = oNode;
    // console.log("afferentEdgeIDs: "+JSON.stringify(afferentEdgeIDs));
    if (!afferentEdgeIDs.includes(edgeID)) {
      afferentEdgeIDs.push(edgeID);
    }
    nodes.update({ id: pk_to, afferentEdgeIDs });
  }
};

const UpdateSelectedNode = () => {
  const dispatch = useDispatch();
  const updateSelectedNode = () => {
    const newSelectedPubkeyOrInstanceID =
      document.getElementById('selectedUserElem')?.value;
    if (aAllUserNodes.includes(newSelectedPubkeyOrInstanceID)) {
      // console.log("aAllUserNodes newSelectedPubkeyOrInstanceID: "+newSelectedPubkeyOrInstanceID+"; aAllUserNodes: "+JSON.stringify(aAllUserNodes));
      dispatch(updateSelectedPubkeyForShowingTrustCalculations(newSelectedPubkeyOrInstanceID));
      dispatch(updateEntityTypeForShowingCalculations("nostrProfile"));
    }
    if (aAllInstanceNodes.includes(newSelectedPubkeyOrInstanceID)) {
      // console.log("aAllInstanceNodes newSelectedPubkeyOrInstanceID: "+newSelectedPubkeyOrInstanceID+"; aAllInstanceNodes: "+JSON.stringify(aAllInstanceNodes));
      dispatch(updateSelectedInstanceIDForShowingCompScoreCalculations(newSelectedPubkeyOrInstanceID));
      dispatch(updateEntityTypeForShowingCalculations("curatedListInstance"));
    }
  };
  return (
    <>
      <textarea
        id="selectedUserElem"
        onClick={() => {
          updateSelectedNode();
        }}
        style={{ display: 'none' }}
      >
        selectedUserElem
      </textarea>
    </>
  );
};

export default class GrapevineVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oMyNostrProfileData: {},
      oNostrProfilesData: {},
      aRatingsOfInstancesData: [],
      contextDAG: "thisListCuration_allContexts",
      oListData: {},
    };
  }

  async componentDidMount() {
    const { curatedListFocusID } = this.props;
    const sql = ` SELECT * FROM curatedLists WHERE event_id = '${curatedListFocusID}' `;
    const oListData = await asyncSql(sql, 'get');
    this.setState({ oListData });

    const sql0 = ' SELECT * FROM myNostrProfile WHERE active = true ';
    const oMyNostrProfileData = await asyncSql(sql0, 'get');
    // console.log("oMyNostrProfileData: "+JSON.stringify(oMyNostrProfileData))
    this.setState({ oMyNostrProfileData });
    const myPubKey = oMyNostrProfileData.pubkey;

    const sql1 = ' SELECT * FROM nostrProfiles ';
    const aNostrProfilesData = await asyncSql(sql1);
    // console.log("qwerty aNostrProfilesData; number: "+aNostrProfilesData.length)
    const oNostrProfilesData = {};
    for (let p = 0; p < aNostrProfilesData.length; p++) {
      const oNostrProfileData = aNostrProfilesData[p];
      oNostrProfilesData[oNostrProfileData.pubkey] = oNostrProfileData;
    }
    this.setState({ oNostrProfilesData });

    const sql2 = ` SELECT * FROM ratingsOfCuratedListInstances WHERE parentConceptNostrEventID = '${this.props.curatedListFocusID}' `;
    const aRatingsOfInstancesData2 = await asyncSql(sql2);

    const sql3 = ` SELECT * FROM endorsementsOfCurators WHERE parentConceptNostrEventID = '${this.props.curatedListFocusID}' `;
    const aEndorsementsOfCuratorsData = await asyncSql(sql3);

    await makeVisGraph_Grapevine(
      oMyNostrProfileData,
      oNostrProfilesData,
      aRatingsOfInstancesData2,
      aEndorsementsOfCuratorsData,
      this.props.controlPanelSettings,
    );

    populateEachNodeAfferentEdgeIDs(nodes, edges);

    // an array of contextDAG nodes; assumed to contain at least one node, although if empty, just assume the apex of the contextDAG
    // any nodes past the first one specify nodes through which the inheritance pathway is assumed to traverse
    const aContextDAG = ['thisListCuration_allContexts'];

    setInterval(() => {
      singleIterationCompositeUserScoreCalculations(
        myPubKey,
        this.props.controlPanelSettings,
        aContextDAG
      );
      singleIterationInstanceScoreCalculations(
        myPubKey,
        this.props.controlPanelSettings,
        aContextDAG
      );
    }, 200);

  }

  render() {
    return (
      <>
        <div style={{display:'none'}}>{JSON.stringify(this.props.aRatingsOfInstancesData,null,4)}</div>
        <Header
          oListData={this.state.oListData}
        />
        <UpdateSelectedNode />
        <TopControlPanel />
        <div style={{ width: '100%', height: '500px', marginTop: '5px' }}>
          <div
            id="grapevineContainerElem"
            style={{ display: 'inline-block', width: '50%', height: '100%', border: '1px solid purple', marginRight: '5px' }}
          />
          <div
            style={{ display: 'inline-block', width: '48%', height: '100%' }}
          >
            <RightPanel />
          </div>
        </div>
        <ShowSingleEntityCompScoreCalculations
          controlPanelSettings={this.props.controlPanelSettings}
          contextDAG={this.state.contextDAG}
        />
      </>
    );
  }
}
