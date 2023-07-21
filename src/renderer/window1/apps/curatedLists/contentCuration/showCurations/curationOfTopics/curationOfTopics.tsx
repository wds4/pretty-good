import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import {
  updateSelectedPubkeyForShowingTrustCalculations,
  updateSelectedInstanceIDForShowingCompScoreCalculations,
  updateEntityTypeForShowingCalculations,
} from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';
import { noProfilePicUrl } from 'renderer/window1/const';
import RightPanel from './controlPanels/rightPanel';
import Header from './header';
import { singleIterationCompositeUserScoreCalculations } from './calculations/singleIterationCompositeUserScoreCalculations';
import { singleIterationInstanceScoreCalculations } from './calculations/singleIterationInstanceScoreCalculations';
import ShowSingleEntityCompScoreCalculations from './showSingleEntityCompScoreCalculations';

export const yAxisConst = 400;
export const yAxisDisplacement = 200;

export let nodes = new DataSet([]);
export let edges = new DataSet([]);
let network = {};
let data = {
  nodes,
  edges,
};
export let aAllUserNodes = [];
export let aAllItemNodes = [];

const { options } = VisStyleConstants;

export const VisNetwork = () => {
  // moved from singleIterationCompositeUserScoreCalculations
  // might want to move this to makeVisGraph
  const aAllNodes = nodes.getIds();
  for (let n = 0; n < aAllNodes.length; n++) {
    const nodeID = aAllNodes[n];
    const oNode = nodes.get(nodeID);
    if (oNode.group == "user") {
      if (!aAllUserNodes.includes(nodeID)) {
        aAllUserNodes.push(nodeID);
      }

    }
    if (oNode.group == "instance") {
      if (!aAllItemNodes.includes(nodeID)) {
        aAllItemNodes.push(nodeID);
      }
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
    network.current.on('doubleClick', function (params) {
      // console.log("doubleClick ")
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
      if (numNodes == 1) {
        const nodeID = nodes_arr[0];
        let oNode = nodes.get(nodeID);
        if (oNode.physics) {
          oNode.physics = false;
        } else {
          oNode.physics = true;
        }
        // console.log("doubleClick; oNode: "+JSON.stringify(oNode,null,4))
        nodes.update(oNode);
      }
    });
  }, [domNode, network, data, options]);

  return <div style={{ height: '100%', width: '100%' }} ref={domNode} />;
};

const makeVisGraph = async (
  oMyNostrProfileReduxData,
  oControlPanelSettings,
  oNostrProfilesData,
  oNostrNodes,
  aSeedUserOptionsPubkeys,
  aCuratorRatingEventIDs,
  aInstanceRatingEventIDs,
) => {
  const propertyPath = "nostrTopicData";
  // console.log("oMyNostrProfileReduxData: "+JSON.stringify(oMyNostrProfileReduxData,null,4))
  /*
  // fetch name from oNostrProfilesData if present
  const fetchNameFromPk = (pk) => {
    let result = "fetchedNameFromPk";
    if (oNostrProfilesData.hasOwnProperty(pk)) {
      const oEvent = JSON.parse(oNostrProfilesData[pk].event);
      const oContent = JSON.parse(oEvent.content);
      result = oContent?.name;
    }
    return result;
  }
  // fetch display_name from oNostrProfilesData if present
  const fetchDisplayNameFromPk = (pk) => {
    let result = "fetchDisplayNameFromPk";
    if (oNostrProfilesData.hasOwnProperty(pk)) {
      const oEvent = JSON.parse(oNostrProfilesData[pk].event);
      const oContent = JSON.parse(oEvent.content);
      result = oContent?.display_name;
    }
    return result;
  }
  */

  const nodes_arr = [];
  const edges_arr = [];

  const aNodesIDs = [];
  const aEdgesIDs = [];

  const {
    seedUser,
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
  } = oControlPanelSettings;

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

  const myPubKey = oMyNostrProfileReduxData.pubkey_hex;
  const myName = oMyNostrProfileReduxData.name;
  const myDisplayName = oMyNostrProfileReduxData.display_name;
  let myImageUrl = oMyNostrProfileReduxData.picture_url;
  if (!myImageUrl) {
    myImageUrl = noProfilePicUrl
  }

  // add my profile
  let amISeedUser = false;
  let physics = true;
  if (seedUser == myPubKey) {
    amISeedUser = true;
    physics = false;
  }
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
    seed: amISeedUser,
    scores: JSON.parse(JSON.stringify(uScoresDefault)),
    size: 50,
    physics: physics,
    fixed: amISeedUser,
  }
  if (seedUser == myPubKey) {
    oNode.x = -200;
    oNode.y = 0;
  }
  nodes_arr.push(oNode)
  aNodesIDs.push(myPubKey);

  // console.log("seedUser: "+seedUser+"; myPubKey: "+myPubKey)

  // add seed user if not me
  if (seedUser != myPubKey) {
    let seedUserImageUrl = noProfilePicUrl;
    let seedUserDisplayName = "seedUserDisplayName";
    let seedUserName = "seedUserName";
    if (oNostrProfilesData.hasOwnProperty(seedUser)) {
      const oEventProfile = JSON.parse(oNostrProfilesData[seedUser].event);
      const oProfileContent = JSON.parse(oEventProfile.content);
      if (oProfileContent.display_name) {
        seedUserDisplayName = oProfileContent.display_name;
      }
      if (oProfileContent.name) {
        seedUserName = oProfileContent.name;
      }
      if (oProfileContent.picture) {
        seedUserImageUrl = oProfileContent.picture;
      }
    }
    const oSeedUserNode = {
      id: seedUser,
      group: "user",
      image: seedUserImageUrl,
      brokenImage: noProfilePicUrl,
      shape: 'circularImage',
      title: seedUserDisplayName,
      label: seedUserName,
      name: seedUserName,
      display_name: seedUserDisplayName,
      afferentEdgeIDs: [],
      seed: true,
      scores: JSON.parse(JSON.stringify(uScoresDefault)),
      size: 50,
      physics: false,
      fixed: true,
      x: -200,
      y: 0,
    }
    if (!aNodesIDs.includes(seedUser)) {
      nodes_arr.push(oSeedUserNode)
      aNodesIDs.push(seedUser);
    }
  }

  // ADD ITEMS

  // fetch all topics from redux
  const oNostrTopicSlugs = oNostrNodes.byWordType.nostrTopic
  const aNostrTopicSlugs = Object.keys(oNostrTopicSlugs);
  for (let x = 0; x < aNostrTopicSlugs.length; x++) {
    const nostrTopicSlug = aNostrTopicSlugs[x];
    const nostrTopicEventID = oNostrNodes.bySlug[nostrTopicSlug].versionIndependent;
    const oWord = oNostrNodes.byEventID[nostrTopicEventID].word;
    // console.log("oWord: "+JSON.stringify(oWord,null,4));
    if (oWord.hasOwnProperty(propertyPath)) {
      const item_name = oWord[propertyPath]?.name;
      const item_description = oWord[propertyPath]?.description;
      if (!aNodesIDs.includes(nostrTopicEventID)) {
        const oNode = {
          id: nostrTopicEventID,
          group: 'instance',
          title: item_name,
          label: item_name,
          name: item_name,
          description: item_description,
          scores: JSON.parse(JSON.stringify(iScoresDefault)),
          size: 15,
          afferentEdgeIDs: [],
          physics: false,
          shape: 'diamond',
          color: '#FF9900',
          // x: 500,
          // y: 100 * aNodesIDs.length - 500,
        }
        nodes_arr.push(oNode);
        aNodesIDs.push(nostrTopicEventID);
      }
    }
  }

  // Add users

  for (let x=0;x<aSeedUserOptionsPubkeys.length;x++) {
    const pk = aSeedUserOptionsPubkeys[x];
    if (!aNodesIDs.includes(pk)) {
      let user_display_name = "unk";
      let user_name = "unk";
      let user_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          user_profilePicUrl = oProfileContent.picture;
          user_name = oProfileContent.name;
          user_display_name = oProfileContent.display_name;
        }
      }
      let oNode = {
        id: pk,
        group: "user",
        shape: 'circularImage',
        image: user_profilePicUrl,
        brokenImage: noProfilePicUrl,
        title: user_display_name,
        label: user_name,
        name: user_name,
        display_name: user_display_name,
        afferentEdgeIDs: [],
        seed: false,
        scores: JSON.parse(JSON.stringify(uScoresDefault)),
        size: 50 * uDefaultScores.influence,
      }
      nodes_arr.push(oNode);
      aNodesIDs.push(pk);
    }
  }

  // add ratings of users
  for (let x=0;x<aCuratorRatingEventIDs.length;x++) {
    const event_id = aCuratorRatingEventIDs[x];
    const oWord = oNostrNodes.byEventID[event_id].word;
    // console.log("oWord: "+JSON.stringify(oWord,null,4));
    if (oWord.hasOwnProperty("ratingData")) {
      if (oWord.ratingData.ratingTemplateData.ratingTemplateSlug == "nostrChannelTopicsTreeStructureCuratorEndorsement") {
        const pk_rater = oWord.ratingData.raterData.nostrProfileData.pubkey;
        const pk_ratee = oWord.ratingData.rateeData.nostrProfileData.pubkey;
        const regularSliderRating = oWord.ratingData.ratingFieldsetData.nostrChannelTopicsTreeStructureCuratorEndorsementFieldset.regularSliderRating;
        const referenceRegularSliderRating = oWord.ratingData.ratingFieldsetData.nostrChannelTopicsTreeStructureCuratorEndorsementFieldset.referenceRegularSliderRating;
        let title = '';
        const rating = (regularSliderRating / referenceRegularSliderRating).toPrecision(4);
        title += 'rating: '+ rating;
        // title += '\n confidence: '+confidence;
        const width = 5 * Math.log(rating * 10);
        if (!aEdgesIDs.includes(event_id)) {
          const oEdge = {
            id: event_id,
            // group: 'ratingOfInstance', // no group styling for edges (I think ???)
            from: pk_rater,
            to: pk_ratee,
            color: {
              color: '#0000FF',
              opacity: 1.0,
            },
            title: title,
            width: width,
            rating: rating,
          }
          edges_arr.push(oEdge);
          aEdgesIDs.push(event_id);
        }
      }
    }
  }

  // add ratings of items
  for (let x=0;x<aInstanceRatingEventIDs.length;x++) {
    const event_id = aInstanceRatingEventIDs[x];
    const oWord = oNostrNodes.byEventID[event_id].word;
    if (!aEdgesIDs.includes(event_id)) {
      console.log("oWord: "+JSON.stringify(oWord,null,4));
      console.log("qwerty A");
      if (oWord.hasOwnProperty("ratingData")) {
        if (oWord.ratingData.ratingTemplateData.ratingTemplateSlug == "nostrChannelTopicsInstanceEndorsement") {
          console.log("qwerty B");
          const pk_rater = oWord.ratingData.raterData.nostrProfileData.pubkey;
          const event_id_ratee = oWord.ratingData.rateeData.nostrChannelTopicInstanceData.eventID;
          const regularSliderRating = oWord.ratingData.ratingFieldsetData.nostrChannelTopicsInstanceEndorsementFieldsetData.regularSliderRating;
          let title = '';
          const rating = (regularSliderRating / 100).toPrecision(4);
          title += 'rating: '+ rating;
          // title += '\n confidence: '+confidence;
          const width = 5 * Math.log(rating * 10);
          if (!aEdgesIDs.includes(event_id)) {
            const oEdge = {
              id: event_id,
              // group: 'ratingOfInstance', // no group styling for edges (I think ???)
              from: pk_rater,
              to: event_id_ratee,
              color: {
                color: '#0000FF',
                opacity: 1.0,
              },
              title: title,
              width: width,
              rating: rating,
            }
            edges_arr.push(oEdge);
            aEdgesIDs.push(event_id);
          }
        }
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
    <VisNetwork
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
    if (oNode) {
      const { afferentEdgeIDs } = oNode;
      // console.log("afferentEdgeIDs: "+JSON.stringify(afferentEdgeIDs));
      if (!afferentEdgeIDs.includes(edgeID)) {
        afferentEdgeIDs.push(edgeID);
      }
      nodes.update({ id: pk_to, afferentEdgeIDs });
    }
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
    if (aAllItemNodes.includes(newSelectedPubkeyOrInstanceID)) {
      // console.log("aAllItemNodes newSelectedPubkeyOrInstanceID: "+newSelectedPubkeyOrInstanceID+"; aAllItemNodes: "+JSON.stringify(aAllItemNodes));
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

export default class CurationOfTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aInstanceCompScoreData: [],
      aProfileCompScoreData: [],
      oNostrProfilesData: {},
      contextDAG: "thisListCuration_allContexts",
    };
  }

  async componentDidMount() {
    aAllUserNodes = [];
    aAllItemNodes = [];

    const sql1 = ' SELECT * FROM nostrProfiles ';
    const aNostrProfilesData = await asyncSql(sql1);
    // console.log("qwerty aNostrProfilesData; number: "+aNostrProfilesData.length)
    const oNostrProfilesData = {};
    for (let p = 0; p < aNostrProfilesData.length; p++) {
      const oNostrProfileData = aNostrProfilesData[p];
      oNostrProfilesData[oNostrProfileData.pubkey] = oNostrProfileData;
    }
    this.setState({ oNostrProfilesData });

    await makeVisGraph(
      this.props.oMyNostrProfile,
      this.props.oControlPanelSettings,
      oNostrProfilesData,
      this.props.oNostrNodes,
      this.props.aSeedUserOptionsPubkeys,
      this.props.aCuratorRatingEventIDs,
      this.props.aInstanceRatingEventIDs,
    );

    populateEachNodeAfferentEdgeIDs(nodes, edges);

    const aContextDAG = ['thisListCuration_allContexts'];
    const myPubKey = this.props.oMyNostrProfile.pubkey_hex;

    setInterval(() => {
      let aProfileCompScoreData = singleIterationCompositeUserScoreCalculations(
        myPubKey,
        this.props.oControlPanelSettings,
        aContextDAG
      );
      this.setState( {aProfileCompScoreData} )

      let aInstanceCompScoreData = singleIterationInstanceScoreCalculations(
        myPubKey,
        this.props.oControlPanelSettings,
        aContextDAG
      );
      this.setState( {aInstanceCompScoreData} )
    }, 500);
  }

  render() {
    return (
      <>
        <div className="contentCreationWholePage">
          <div className="channelsHeaderContainer">
            <Header
              aProfileCompScoreData={this.state.aProfileCompScoreData}
              oNostrProfilesData={this.state.oNostrProfilesData}
            />
          </div>
          <UpdateSelectedNode />
          <div>
            <div className="channelsGraphContainer">
              <div
                id="grapevineContainerElem"
                style={{
                  display: 'inline-block',
                  width: '100%',
                  height: '100%',
                  border: '1px solid purple',
                  marginRight: '5px',
                }}
              />
            </div>
            <div className="channelsControlPanelsContainer">
              <RightPanel
                aInstanceCompScoreData={this.state.aInstanceCompScoreData}
                aProfileCompScoreData={this.state.aProfileCompScoreData}
              />
            </div>
          </div>
          <div className="channelsShowCalculationsContainer">
          <ShowSingleEntityCompScoreCalculations
              controlPanelSettings={this.props.oControlPanelSettings}
              contextDAG={this.state.contextDAG}
            />
          </div>
        </div>
      </>
    );
  }
}
