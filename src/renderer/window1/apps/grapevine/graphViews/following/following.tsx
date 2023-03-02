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
  const nodePubkeys_arr = [];

  const myPubkey = oMyNostrProfileData.pubkey;

  let imageUrl = 'https://nostr.build/i/2282.png';
  if (oMyNostrProfileData?.picture_url) {
    imageUrl = oMyNostrProfileData?.picture_url;
  }

  const oSeedNode = {
    id: myPubkey,
    label: oMyNostrProfileData.display_name,
    title: oMyNostrProfileData.display_name,
    shape: 'circularImage',
    // shape: "circle",
    image: imageUrl,
    brokenImage: 'https://nostr.build/i/2282.png',
    size: 100,
  };
  nodes_arr.push(oSeedNode);
  nodePubkeys_arr.push(myPubkey)

  let aSeedFollowing = [];
  if (oMyNostrProfileData.following) {
    aSeedFollowing = JSON.parse(oMyNostrProfileData.following);
  }

  let oKind0ProfilesData = {};
  let oKind3ProfilesData = {};
  let aMasterFollowingList = [];
  aNostrProfilesData.map((oNostrProfileData) => {
    const pk = oNostrProfileData.pubkey;
    // console.log("qwerty oNostrProfileData; pk: "+pk)
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
      const aTags = oKind3Event.tags;
      const aFollowing = [];
      for (var f=0;f<aTags.length;f++) {
        var fPk = aTags[f][1];
        aFollowing.push(fPk)
      }
      aMasterFollowingList[pk] = aFollowing
    }
  });
  for (let x=0; x<aSeedFollowing.length; x++) {
    const nexkPubkey = aSeedFollowing[x];
    if (oKind0ProfilesData.hasOwnProperty(nexkPubkey)) {
      const oKind0Event = oKind0ProfilesData[nexkPubkey]
      const oProfileData = JSON.parse(oKind0Event.content);
      // console.log("oKind0ProfilesData exists for: "+nexkPubkey+"; oProfileData: "+JSON.stringify(oProfileData))
      let imageUrl = 'https://nostr.build/i/2282.png';
      if (oProfileData?.picture) {
        imageUrl = oProfileData?.picture;
      }
      // console.log("oKind0ProfilesData exists for: "+nexkPubkey+"; imageUrl: "+imageUrl+"; oProfileData: "+JSON.stringify(oProfileData))
      const oProfileNode = {
        id: nexkPubkey,
        label: oProfileData.display_name,
        title: oProfileData.display_name,
        shape: 'circularImage',
        // shape: "circle",
        image: imageUrl,
        brokenImage: 'https://nostr.build/i/2282.png',
        // shape: "circle",
        size: 50,
      };
      if (!nodePubkeys_arr.includes(nexkPubkey)) {
        nodes_arr.push(oProfileNode);
        nodePubkeys_arr.push(nexkPubkey);
      }
      // const oNxtEdge = { from: myPubkey, to: nexkPubkey };
      // console.log("oKind0ProfilesData exists for: "+nexkPubkey+"; imageUrl: "+imageUrl+"; oNxtEdge: "+JSON.stringify(oNxtEdge))
      // edges_arr.push(oNxtEdge);
    }
  }

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

    network.current.on("hoverNode", function (params) {
      const nodeID = params.node;
      const aAllNodes = nodes.getIds()
      for (var n=0; n<aAllNodes.length;n++) {
        const nxtPk = aAllNodes[n];
        if (aMasterFollowingList.hasOwnProperty(nxtPk) && aMasterFollowingList[nxtPk].includes(nodeID)) {
          var oNxtEdge = {from:nxtPk, to:nodeID, color: 'red' }
          edges.update(oNxtEdge)
        }
        if (aMasterFollowingList.hasOwnProperty(nodeID) && aMasterFollowingList[nodeID].includes(nxtPk)) {
          var oNxtEdge = {from:nodeID, to:nxtPk, color: 'black' }
          edges.update(oNxtEdge)
        }
      }
    });
    network.current.on("blurNode", function (params) {
      var aAllEdges = edges.getIds()
      data.edges.remove(aAllEdges)
    });
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
