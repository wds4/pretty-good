import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';

const { groupOptions } = VisStyleConstants;
const { options } = VisStyleConstants;
export var nodes = new DataSet([]);
export var edges = new DataSet([]);
export var network = {};
let data = {
  nodes,
  edges,
};

const populateGraph = async (oMyNostrProfileData, aNostrProfilesData) => {
/*
  const sql0 = ' SELECT * FROM myNostrProfile WHERE active = true ';
  const oMyNostrProfileData = await asyncSql(sql0,'get');
  console.log("oMyNostrProfileData: "+JSON.stringify(oMyNostrProfileData))


  const sql1 = ' SELECT * FROM nostrProfiles ';
  const aNostrProfilesData = await asyncSql(sql1);
  console.log("qwerty aNostrProfilesData; number: "+aNostrProfilesData.length)
*/

  const aSeedFollowing = JSON.parse(oMyNostrProfileData.following)

  aNostrProfilesData.map((oNostrProfileData) => {
    const pk = oNostrProfileData.pubkey;
    console.log("qwerty oNostrProfileData; pk: "+pk)
    const kind0Event = oNostrProfileData.event;
    const kind3Event = oNostrProfileData.kind3Event;
    let oProfileData = {};
    let oKind3Event = {};
    if (kind0Event) {
      oProfileData = JSON.parse(kind0Event);
    }
    if (kind3Event) {
      oKind3Event = JSON.parse(kind3Event);
    }
    let imageUrl = 'https://nostr.build/i/2282.png';
    if (oProfileData?.picture) {
      imageUrl = oProfileData?.picture;
    }
    const oProfileNode = {
      id: oProfileData.pubkey,
      label: oProfileData.display_name,
      title: oProfileData.display_name,
      shape: 'circularImage',
      // shape: "circle",
      image: imageUrl,
      brokenImage: 'https://nostr.build/i/2282.png',
      size: 50,
    };
    nodes.update(oProfileNode);
  });

  var aAllNodes = nodes.getIds()

  /*
  aSeedFollowing.map((pk) => {
    if (oKind0ProfilesData.hasOwnProperty(pk)) {
      console.log("oKind0ProfilesData exists for: "+pk)
      const oKind0Event = oKind0ProfilesData[pk]
      const oProfileData = JSON.parse(oKind0Event.content);
      let imageUrl = 'https://nostr.build/i/2282.png';
      if (oProfileData?.picture) {
        imageUrl = oProfileData?.picture;
      }
      const oProfileNode = {
        id: oProfileData.pubkey,
        label: oProfileData.display_name,
        title: oProfileData.display_name,
        shape: 'circularImage',
        // shape: "circle",
        image: imageUrl,
        brokenImage: 'https://nostr.build/i/2282.png',
        size: 50,
      };
      nodes.update(oProfileNode);
    }
  });
  */

}

const GraphPopulate = ({oMyNostrProfileData, aNostrProfilesData}) => {
  if (oMyNostrProfileData && aNostrProfilesData) {
    // populateGraph(oMyNostrProfileData, aNostrProfilesData);
  }
  return (
    <>
      <div>
        GraphPopulate
      </div>
    </>
  );
}

const GraphInit = ({oMyNostrProfileData, aNostrProfilesData}) => {
  // const myNostrProfile = useSelector((state) => state.myNostrProfile);

  // const oKind0ProfilesData = useSelector((state) => state.nostrProfiles.nostrProfiles);
  // const oKind3ProfilesData = useSelector((state) => state.nostrProfiles.kind3NostrProfiles);
  // const aProfiles = Object.keys(oProfilesData); // all profiles in redux

  const nodes_arr = [];
  const edges_arr = [];

  let imageUrl = 'https://nostr.build/i/2282.png';
  if (oMyNostrProfileData?.picture_url) {
    imageUrl = oMyNostrProfileData?.picture_url;
  }

  const oSeedNode = {
    id: oMyNostrProfileData.pubkey,
    label: oMyNostrProfileData.display_name,
    title: oMyNostrProfileData.display_name,
    // shape: 'circularImage',
    shape: "circle",
    // image: imageUrl,
    // brokenImage: 'https://nostr.build/i/2282.png',
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
      let imageUrl = 'https://nostr.build/i/2282.png';
      if (oProfileData?.picture) {
        imageUrl = oProfileData?.picture;
      }
      const oProfileNode = {
        id: oProfileData.pubkey,
        label: oProfileData.display_name,
        title: oProfileData.display_name,
        // shape: 'circularImage',
        shape: "circle",
        // image: imageUrl,
        // brokenImage: 'https://nostr.build/i/2282.png',
        size: 50,
      };
      nodes_arr.push(oProfileNode);
    }
  });
  /*
  const oSeedNode = {
    id: myNostrProfile.pubkey,
    label: myNostrProfile.display_name,
    title: myNostrProfile.display_name,
    shape: 'circularImage',
    // shape: "circle",
    image: myNostrProfile.picture_url,
    brokenImage: 'https://nostr.build/i/2282.png',
    size: 100,
  };
  nodes_arr.push(oSeedNode);

  const aSeedFollowing = myNostrProfile.following;

  aSeedFollowing.map((pk) => {
    if (oKind0ProfilesData.hasOwnProperty(pk)) {
      console.log("oKind0ProfilesData exists for: "+pk)
      const oKind0Event = oKind0ProfilesData[pk]
      const oProfileData = JSON.parse(oKind0Event.content);
      let imageUrl = 'https://nostr.build/i/2282.png';
      if (oProfileData?.picture) {
        imageUrl = oProfileData?.picture;
      }
      const oProfileNode = {
        id: oProfileData.pubkey,
        label: oProfileData.display_name,
        title: oProfileData.display_name,
        shape: 'circularImage',
        // shape: "circle",
        image: imageUrl,
        brokenImage: 'https://nostr.build/i/2282.png',
        size: 50,
      };
      nodes_arr.push(oProfileNode);
    }
  });
  */

  /*
  aSeedFollowing.map((pk) => {
    if (oKind3ProfilesData.hasOwnProperty(pk)) {
      console.log("oKind3ProfilesData exists for: "+pk)
      const oKind3Event = oKind3ProfilesData[pk];
      const aTags = oKind3Event?.tags;
      if (aTags) {
        console.log("oKind3ProfilesData & aTags exists for: "+pk+"; aTags: "+JSON.stringify(aTags))
        aTags.map((aTag) => {
          if (aTag[0] == "p") {
            const pk0 = aTag[1];
            if (aSeedFollowing.includes(pk0)) {
              var oNxtEdge = {from:pk, to:pk0, width: 10, color: 'black' };
              console.log("oKind3ProfilesData; oNxtEdge: "+JSON.stringify(oNxtEdge))
              // edges_arr.push(oNxtEdge);
            }
          }
        });
      }
    }
  });
  */
  // console.log("qwerty; edges_arr: "+JSON.stringify(edges_arr));

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
    /*

    network.current.on('hoverNode', function (params) {
      console.log('hoverNode Event:', params);
      console.log('hoverNode Event: params.node: ', params.node);
      const nodeID = params.node;
      const aAllNodes = nodes.getIds();
      // populateProfileInfoContainer(nodeID, pubkeys, aAllNodes);
    });
    network.current.on('blurNode', function (params) {
      // delete all edges; restore all nodes to normal
      const aAllEdges = edges.getIds();
      // data.edges.remove(aAllEdges);
    });

    network.current.on('click', function (params) {
      const aAllNodes = nodes.getIds();
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
      if (numNodes == 1) {
        const nodeID = nodes_arr[0];
        // console.log("clicked; nodeID: "+nodeID)
        // var nodeData = pubkeys[nodeID]
        // populateProfileInfoContainer(nodeID, pubkeys, aAllNodes);
      } else {
        // var aPubkeys = Object.keys(pubkeys);
        for (let p = 0; p < aAllNodes.length; p++) {}
      }
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
      // console.log("selectNode event triggered")
      const nodes_arr = params.nodes;
      const numNodes = nodes_arr.length;
      if (numNodes == 1) {
        const nodeID = nodes_arr[0];
        const node = nodes.get(nodeID);
        const { name } = node;
        // drawScoreCalculationPanel(nodeID)
      }
    });
    network.current.on('deselectNode', function (params) {
      // jQuery("#usernameContainer").html("none")
    });
    */
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
  // const myNostrProfile = useSelector((state) => state.myNostrProfile);
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
