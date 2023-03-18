import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg';
import TopControlPanel from './controlPanels/topControlPanel';
import GraphView from './graphView';
import RightPanel from './controlPanels/rightPanel';
import ShowSingleUserTrustScoreCalculations from './showSingleUserTrustScoreCalculations';
import { singleIterationCompositeScoreCalculations } from './calculations/singleIterationCompositeScoreCalculations'
import { updateSelectedPubkeyForShowingTrustCalculations } from 'renderer/window1/redux/features/grapevine/controlPanelSettings/slice';

import {
  allPurposeTypes_allContexts_starter,
  allPurposeTypes_allContexts_seed,
  relaysCuration_allRelayTypes_starter,
  relaysCuration_allRelayTypes_seed,
  defaultImageUrl,
} from './const';

const { options } = VisStyleConstants;

export let nodes = new DataSet([]);
export let edges = new DataSet([]);
let network = {};
let data = {
  nodes,
  edges,
};

export const VisNetwork_Grapevine = () => {
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
        document.getElementById("selectedUserElem").value = nodeID;
        document.getElementById("selectedUserElem")?.click();
      }
    });
    network.current.on('deselectNode', function (params) {

    });
  }, [domNode, network, data, options]);

  return <div style={{ height: '100%', width: '100%' }} ref={domNode} />;
};

const makeVisGraph_Grapevine = async (
  oMyNostrProfileData,
  oNostrProfilesData,
  aRatingsData,
  controlPanelSettings,
) => {
  const nodes_arr = [];
  const edges_arr = [];

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

  const ave = defaultUserTrustAverageScore / 100;
  const cer = defaultUserTrustConfidence / 100;
  const inf = ave * cer;
  const defaultScores = {
    influence: inf,
    average: ave,
    certainty: cer,
    input: 0,
  }

  const myPubKey = oMyNostrProfileData.pubkey;

  let listCuration = {
    relays: {
      ratings: {
        notes: {
          endorseAsRelaysPicker: {},
          endorseAsRelaysPickerHunter: {},
        },
      },
      compositeScores: {},
    },
  };

  for (let r = 0; r < aRatingsData.length; r += 1) {
    const oRatingData = aRatingsData[r];
    const { uniqueID, ratingSlug, pk_rater, event } = oRatingData;
    listCuration.relays.ratings.notes[ratingSlug][pk_rater] = JSON.parse(event);
  }
  const oPicker = listCuration.relays.ratings.notes.endorseAsRelaysPicker;
  const oPickerHunter =
    listCuration.relays.ratings.notes.endorseAsRelaysPickerHunter;
  const aPicker = Object.keys(oPicker);
  const aPickerHunter = Object.keys(oPickerHunter);

  const aNodesPre = [...aPicker, ...aPickerHunter]; // array of all pubkeys to use as nodes in the graph
  const aEndorseAsRelaysPicker = []; // 2 arrays of all ratings to use as edges in the graph
  const aEndorseAsRelaysPickerHunter = [];

  for (let x = 0; x < aPicker.length; x++) {
    const pk_picker = aPicker[x];
    const o39901Event = oPicker[pk_picker];
    const aTags = o39901Event.tags;
    for (let t = 0; t < aTags.length; t++) {
      const aTag = aTags[t];
      if (aTag[0] == 'p') {
        aNodesPre.push(aTag[1]);
        aEndorseAsRelaysPicker.push([pk_picker, aTag[1]]);
      }
    }
  }
  for (let x = 0; x < aPickerHunter.length; x++) {
    const pk_pickerHunter = aPickerHunter[x];
    const o39901Event = oPickerHunter[pk_pickerHunter];
    const aTags = o39901Event.tags;
    for (let t = 0; t < aTags.length; t++) {
      const aTag = aTags[t];
      if (aTag[0] == 'p') {
        aNodesPre.push(aTag[1]);
        aEndorseAsRelaysPickerHunter.push([pk_pickerHunter, aTag[1]]);
      }
    }
  }

  const aNodes = removeDuplicatesFromArrayOfStrings(aNodesPre);

  // ADD NODES
  const oKind0ProfilesData = {};
  for (let n = 0; n < aNodes.length; n++) {
    const pk = aNodes[n];

    // const scoresA = allPurposeTypes_allContexts_starter;
    // const scoresB = relaysCuration_allRelayTypes_starter;
    let scoresA = defaultScores;
    let scoresB = defaultScores;
    let size = 50 * defaultScores.influence;

    if (myPubKey == pk) {
      size = 50;
      scoresA = allPurposeTypes_allContexts_seed;
      scoresB = relaysCuration_allRelayTypes_seed;
    }
    const oNode = {
      id: pk,
      pubkey: pk,
      shape: 'circularImage',
      image: defaultImageUrl,
      brokenImage: defaultImageUrl,
      size: size,
      title: pk,
      label: null,
      name: null,
      display_name: null,
      afferentEdgeIDs: [],
      seed: false,
      scores: {
        allPurposeTypes_allContexts: JSON.parse(JSON.stringify(scoresA)),
        relaysCuration_allRelayTypes: JSON.parse(JSON.stringify(scoresB)),
      },
    };
    if (oNostrProfilesData.hasOwnProperty(pk)) {
      const oNostrProfileData = oNostrProfilesData[pk];
      const kind0Event = oNostrProfileData.event;
      let oProfileData = {};

      if (kind0Event) {
        const oKind0Event = JSON.parse(kind0Event);
        if (oKind0Event.content) {
          oProfileData = JSON.parse(oKind0Event.content);
        }
        oKind0ProfilesData[pk] = oProfileData;
        oNode.label = oProfileData?.name;
        oNode.title = oProfileData?.display_name;
        oNode.name = oProfileData?.name;
        oNode.display_name = oProfileData?.display_name;
        if (oProfileData.picture) {
          oNode.image = oProfileData?.picture;
        }
      }
    }
    nodes_arr.push(oNode);
  }

  // ADD EDGES
  for (let e = 0; e < aEndorseAsRelaysPicker.length; e++) {
    const aRating = aEndorseAsRelaysPicker[e];
    const oEdge = {
      from: aRating[0],
      to: aRating[1],
      color: 'green',
      width: 5,
      title: 'Endorse Relays',
      rating: 1,
    };
    edges_arr.push(oEdge);
  }

  for (let e = 0; e < aEndorseAsRelaysPickerHunter.length; e++) {
    const aRating = aEndorseAsRelaysPickerHunter[e];
    const oEdge = {
      from: aRating[0],
      to: aRating[1],
      color: 'black',
      width: 5,
      title: 'Endorse as Relays Curator Hunter',
      rating: 1,
    };
    edges_arr.push(oEdge);
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
    const afferentEdgeIDs = oNode.afferentEdgeIDs;
    // console.log("afferentEdgeIDs: "+JSON.stringify(afferentEdgeIDs));
    if (!afferentEdgeIDs.includes(edgeID)) {
      afferentEdgeIDs.push(edgeID);
    }
    nodes.update({ id: pk_to, afferentEdgeIDs: afferentEdgeIDs });
  }
};

const UpdateSelectedNode = () => {
  const dispatch = useDispatch();
  const updateSelectedNode = () => {
    const newSelectedPubkey = document.getElementById("selectedUserElem")?.value;
    dispatch(updateSelectedPubkeyForShowingTrustCalculations(newSelectedPubkey))
  }
  return (
    <>
      <textarea id="selectedUserElem" onClick={() => {updateSelectedNode()}}  style={{display:"none"}}>selectedUserElem</textarea>
    </>
  )
}

export default class GrapevineVisualizationMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oMyNostrProfileData: {},
      oNostrProfilesData: {},
      aRatingsData: [],
    };
  }

  async componentDidMount() {
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

    const sql2 = ' SELECT * FROM testnetListCurationRatings ';
    const aRatingsData = await asyncSql(sql2);
    // console.log("oMyNostrProfileData: "+JSON.stringify(oMyNostrProfileData))
    this.setState({ aRatingsData });

    await makeVisGraph_Grapevine(
      oMyNostrProfileData,
      oNostrProfilesData,
      aRatingsData,
      this.props.controlPanelSettings,
    );

    populateEachNodeAfferentEdgeIDs(nodes,edges)

     // an array of contextDAG nodes; assumed to contain at least one node, although if empty, just assume the apex of the contextDAG
     // any nodes past the first one specify nodes through which the inheritance pathway is assumed to traverse
    const aContextDAG = ["relaysCuration_allRelayTypes"];

    setInterval(() => {
      singleIterationCompositeScoreCalculations(myPubKey,this.props.controlPanelSettings,aContextDAG);
    }, 200);
  }

  render() {
    return (
      <>
        <div className="h3">Grapevine Visualization Main Page</div>
        aF: {this.props.controlPanelSettings.attenuationFactor} {' '}
        <UpdateSelectedNode />
        <TopControlPanel />
        <div style={{ width: '100%', height: '500px' }}>
          <div
            id="grapevineContainerElem"
            style={{ display: 'inline-block', width: '50%', height: '100%' }}
          />
          <div
            style={{ display: 'inline-block', width: '50%', height: '100%' }}
          >
            <RightPanel />
          </div>
        </div>
        <ShowSingleUserTrustScoreCalculations
          controlPanelSettings={this.props.controlPanelSettings}
        />
      </>
    );
  }
}
