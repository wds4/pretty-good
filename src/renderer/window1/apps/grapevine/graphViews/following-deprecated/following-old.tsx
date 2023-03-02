import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';

const { groupOptions } = VisStyleConstants;
const { options } = VisStyleConstants;
let nodes = new DataSet([]);
let edges = new DataSet([]);
let network = {};
let data = {
  nodes,
  edges,
};

const GraphInit = ({oMyNostrProfileData, aNostrProfilesData}) => {
  const nodes_arr = [];
  const edges_arr = [];

  const oSeedNode = {
    id: oMyNostrProfileData.pubkey,
    label: oMyNostrProfileData.display_name,
    title: oMyNostrProfileData.display_name,
    shape: "circle",
    size: 100,
  };
  nodes_arr.push(oSeedNode);

  let aSeedFollowing = [];
  if (oMyNostrProfileData.following) {
    aSeedFollowing = JSON.parse(oMyNostrProfileData.following);
  }

  let oKind0ProfilesData = {};
  let oKind3ProfilesData = {};
  aNostrProfilesData.map((oNostrProfileData) => {
    const pk = oNostrProfileData.pubkey;
    console.log("qwerty oNostrProfileData; pk: "+pk)
    const kind0Event = oNostrProfileData.event;
    const kind3Event = oNostrProfileData.kind3Event;
    let oProfileData = {};
    let oKind3Event = {};
    if (kind0Event) {
      oProfileData = JSON.parse(kind0Event);
      oKind0ProfilesData[pk] = oProfileData;
    }
    if (kind3Event) {
      oKind3Event = JSON.parse(kind3Event);
      oKind3ProfilesData[pk] = oKind3Event;
    }
  });
  aSeedFollowing.map((pk) => {
    if (oKind0ProfilesData.hasOwnProperty(pk)) {
      console.log("oKind0ProfilesData exists for: "+pk)
      const oKind0Event = oKind0ProfilesData[pk]
      const oProfileData = JSON.parse(oKind0Event.content);
      const oProfileNode = {
        id: oProfileData.pubkey,
        label: oProfileData.display_name,
        title: oProfileData.display_name,
        shape: "circle",
        size: 50,
      };
      nodes_arr.push(oProfileNode);
    }
  });

  nodes = new DataSet(nodes_arr);
  edges = new DataSet(edges_arr);
  data = {
      nodes,
      edges
  };

  const domNode = useRef(null);

  network = useRef(null);

  useEffect(() => {
    network.current = new Network(domNode.current, data, options);
    network.current.fit();
  }, [domNode, network, data, options]);

  return (
    <>
      <div style={{ height: '500px', width: '500px', border: '1px solid purple' }} ref={domNode}>
        Hello
      </div>
    </>
  );
};

const GraphViewFollowing = ({oMyNostrProfileData, aNostrProfilesData}) => {
  return (
    <>
      Following
      <GraphInit
        oMyNostrProfileData={oMyNostrProfileData}
        aNostrProfilesData={aNostrProfilesData}
      />
    </>
  );
};
export default GraphViewFollowing;
