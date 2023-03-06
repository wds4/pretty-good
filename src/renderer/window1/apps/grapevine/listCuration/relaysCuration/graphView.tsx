import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import { removeDuplicatesFromArrayOfStrings } from 'renderer/window1/lib/pg';

const { options } = VisStyleConstants;

let nodes = new DataSet([]);
let edges = new DataSet([]);
let network = {};
let data = {
  nodes,
  edges,
};

const GraphInit = ({
  aNodes,
  oMyNostrProfileData,
  oNostrProfilesData,
  aEndorseAsRelaysPicker,
  aEndorseAsRelaysPickerHunter,
}) => {
  const nodes_arr = [];
  const edges_arr = [];

  const defaultImageUrl = 'https://nostr.build/i/2282.png';

  // ADD NODES
  const oKind0ProfilesData = {};
  for (let n = 0; n < aNodes.length; n++) {
    const pk = aNodes[n];
    const oNode = {
      id: pk,
      pubkey: pk,
      shape: 'circularImage',
      image: defaultImageUrl,
      brokenImage: defaultImageUrl,
      title: pk,
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
        console.log(`qwerty; oProfileData: ${JSON.stringify(oProfileData)}`);
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
      <div
        style={{ height: '500px', width: '100%', border: '1px solid purple' }}
        ref={domNode}
      >
        Hello
      </div>
    </>
  );
};

const GraphView = ({ oMyNostrProfileData, oNostrProfilesData }) => {
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
