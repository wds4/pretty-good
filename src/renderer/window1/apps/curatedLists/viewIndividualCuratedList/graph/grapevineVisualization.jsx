import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from 'renderer/window1/lib/visjs/visjs-style';
import {
  noProfilePicUrl,
} from 'renderer/window1/const';

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
        // do stuff with nodeID
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
  let myImageUrl = oMyNostrProfileData.picture_url;
  if (!myImageUrl) {
    myImageUrl = noProfilePicUrl
  }

  const oNode = {
    id: myPubKey,
    image: myImageUrl,
    brokenImage: noProfilePicUrl,
    shape: 'circularImage',
    title: "me",
    label: "me",
    physics: false,
    x: 0,
    y: 0,
  }
  nodes_arr.push(oNode)
  aNodesIDs.push(myPubKey);

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
        // add rater as another rater node
        let title = '';
        title += 'rating: '+regularSliderRating;
        title += '\n confidence: '+confidence;
        const width = 5 * Math.log(regularSliderRating / 10);
        if (!rater_profilePicUrl) {
          rater_profilePicUrl = noProfilePicUrl
        }
        const oEdge = {
          id: rating_event_id,
          // group: 'ratingOfInstance', // no group styling for edges (I think ???)
          from: pk_rater,
          to: instance_event_id,
          color: 'red',
          title: title,
          width: width,
        }
        edges_arr.push(oEdge);
        aEdgesIDs.push(rating_event_id);
      }

      if (!aNodesIDs.includes(instance_event_id)) {
        // add rater as another rater node
        const oNode = {
          id: instance_event_id,
          group: 'instance',
          title: instance_name,
          label: instance_name,
        }
        nodes_arr.push(oNode);
        aNodesIDs.push(instance_event_id);
      }

      if (!aNodesIDs.includes(pk_rater)) {
        // add rater as another rater node
        const oNode = {
          id: pk_rater,
          shape: 'circularImage',
          image: rater_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_rater,
          label: name_rater,
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

export default class GrapevineVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oMyNostrProfileData: {},
      oNostrProfilesData: {},
      aRatingsOfInstancesData: [],
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

    const sql2 = ` SELECT * FROM ratingsOfCuratedListInstances WHERE parentConceptNostrEventID = '${this.props.curatedListFocusID}' `;
    const aRatingsOfInstancesData2 = await asyncSql(sql2);

    await makeVisGraph_Grapevine(
      oMyNostrProfileData,
      oNostrProfilesData,
      aRatingsOfInstancesData2,
      this.props.oListData,
    );
  }

  render() {
    return (
      <>
        <div style={{display:'none'}}>{JSON.stringify(this.props.aRatingsOfInstancesData,null,4)}</div>
        <div style={{ width: '100%', height: '500px' }}>
          <div
            id="grapevineContainerElem"
            style={{ display: 'inline-block', width: '50%', height: '100%' }}
          />
          <div
            style={{ display: 'inline-block', width: '50%', height: '100%' }}
          >
            Right panel
          </div>
        </div>
      </>
    );
  }
}
