import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg';
import ScoresCalculationsWithTimer from './calculations/scoresCalculationsWithTimer';

const { options } = VisStyleConstants;

export let nodes = new DataSet([]);
export let edges = new DataSet([]);
let network = {};
let data = {
  nodes,
  edges,
};

const allPurposeTypes_allContexts_starter = {
  influence: 0,
  average: 0,
  input: 0,
  confidence: 0,
}
const allPurposeTypes_allContexts_seed = {
  influence: 1,
  average: 1,
  input: 10000,
  confidence: 100,
}
const relaysCuration_allRelayTypes_starter = {
  influence: 0,
  average: 0,
  input: 0,
  confidence: 0,
}
const relaysCuration_allRelayTypes_seed = {
  influence: 1,
  average: 1,
  input: 10000,
  confidence: 100,
}

const GraphInit = ({
  aNodes,
  oMyNostrProfileData,
  oNostrProfilesData,
  aEndorseAsRelaysPicker,
  aEndorseAsRelaysPickerHunter,
}) => {
  const [count, setCount] = useState(0);
  const nodes_arr = [];
  const edges_arr = [];

  const myPubKey = oMyNostrProfileData.pubkey;

  const defaultImageUrl = 'https://nostr.build/i/2282.png';

  // ADD NODES
  const oKind0ProfilesData = {};
  for (let n = 0; n < aNodes.length; n++) {
    const pk = aNodes[n];
    let size = 10;
    let scoresA = allPurposeTypes_allContexts_starter;
    let scoresB = relaysCuration_allRelayTypes_starter;
    if (myPubKey == pk) {
      size = 50;
      let scoresA = allPurposeTypes_allContexts_seed;
      let scoresB = relaysCuration_allRelayTypes_seed;
    }
    const oNode = {
      id: pk,
      pubkey: pk,
      shape: 'circularImage',
      image: defaultImageUrl,
      brokenImage: defaultImageUrl,
      title: pk,
      afferentEdgeIDs: [],
      seed: false,
      scores: {
        allPurposeTypes_allContexts: scoresA,
        relaysCuration_allRelayTypes: scoresB,
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
    };
    edges_arr.push(oEdge);
  }

  nodes = new DataSet(nodes_arr);
  edges = new DataSet(edges_arr);

  data = {
    nodes,
    edges,
  };

  const domNode = useRef(null);

  network = useRef(null);

  useEffect(() => {
    network.current = new Network(domNode.current, data, options);
    network.current.fit();

    network.current.on('hoverNode', function (params) {
      const nodeID = params.node;
      const aAllNodes = nodes.getIds();
    });
  }, [domNode, network, data, options]);

  return (
    <>
      <ScoresCalculationsWithTimer
        myPubKey={myPubKey}
        nodes={nodes}
        edges={edges}
      />
      <div
        style={{ height: '500px', width: '100%', border: '1px solid purple' }}
        ref={domNode}
      >
        Hello
      </div>
    </>
  );
};

const GraphView = ({
  oMyNostrProfileData,
  oNostrProfilesData,
  aRatingsData,
}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const listCuration = useSelector((state) => state.listCuration);
  const oPicker = listCuration.relays.ratings.notes.endorseAsRelaysPicker;
  const oPickerHunter =
    listCuration.relays.ratings.notes.endorseAsRelaysPickerHunter;
  const aPicker = Object.keys(oPicker);
  const aPickerHunter = Object.keys(oPickerHunter);

  const aNodes = [...aPicker, ...aPickerHunter]; // array of all pubkeys to use as nodes in the graph
  const aEndorseAsRelaysPicker = []; // 2 arrays of all ratings to use as edges in the graph
  const aEndorseAsRelaysPickerHunter = [];

  for (let x = 0; x < aPicker.length; x++) {
    const pk_picker = aPicker[x];
    const o39901Event = oPicker[pk_picker];
    const aTags = o39901Event.tags;
    for (let t = 0; t < aTags.length; t++) {
      const aTag = aTags[t];
      if (aTag[0] == 'p') {
        aNodes.push(aTag[1]);
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
        aNodes.push(aTag[1]);
        aEndorseAsRelaysPickerHunter.push([pk_pickerHunter, aTag[1]]);
      }
    }
  }

  const aNodes2 = removeDuplicatesFromArrayOfStrings(aNodes);

  /// ////////// INITIALIZE TRUST SCORE RATINGS: relaysCuration_allRelayTypes
  // initializeCompositeScores(nodes)
  return (
    <>
      <GraphInit
        aNodes={aNodes2}
        oMyNostrProfileData={oMyNostrProfileData}
        oNostrProfilesData={oNostrProfilesData}
        aEndorseAsRelaysPicker={aEndorseAsRelaysPicker}
        aEndorseAsRelaysPickerHunter={aEndorseAsRelaysPickerHunter}
      />
    </>
  );
};
export default GraphView;
