import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { DataSet, Network} from 'vis-network/standalone/esm/vis-network';
import * as VisStyleConstants from '../../lib/visjs/visjs-style';
import * as MiscAppFxns from "../../lib/app/misc.ts";

const jQuery = require("jquery");

const cloneObj = MiscAppFxns.cloneObj;
const timeout = MiscAppFxns.timeout;

const groupOptions = VisStyleConstants.groupOptions;

const options = VisStyleConstants.options;

export var nodes = new DataSet([ ]);

export var edges = new DataSet([ ]);

export var network = {};

var oPubkeysInVis = {};
var numberVisNodeUpdates = 0;
var numberVisEdgeUpdates = 0;

var data = {
    nodes,
    edges
};

const loadFollowingNetwork = async (seed,pubkeys) => {
    var aPubkeys = Object.keys(pubkeys)
    console.log("loadFollowingNetwork; seed: "+seed+"; aPubkeys.length: "+aPubkeys.length)
    var totalNumberLoaded = 0;
    for (var p=0;p<aPubkeys.length;p++) {
        var nextPk = aPubkeys[p];
        await timeout(1)

        var oProfileData = pubkeys[nextPk].profileData
        var oFollowingData = pubkeys[nextPk].followingData
        // console.log(p+" oProfileData: "+JSON.stringify(oProfileData,null,4))
        // console.log(p+" oFollowingData: "+JSON.stringify(oFollowingData,null,4))
        var picture_url = "https://nostr.build/i/2282.png";
        if (pubkeys[nextPk].profileData.picture_url) {
            picture_url = pubkeys[nextPk].profileData.picture_url
        }
        var size = 200;
        var color = "white";
        if (pubkeys[nextPk].followingData.level) {
            var level = pubkeys[nextPk].followingData.level;
            // console.log("=================== level: "+level)
            if (level == 0) {
                size = 100;
                color = "purple"
            }
            if (level == 1) {
                size = 50;
                color = "red"
                }
            if (level == 2) {
                size = 12;
                color = "#CFCFCF"
            }
            if (level == 3) {
                size = 3;
                color = "#EFEFEF" }
        }
        // console.log(p+" loadFollowingNetwork; nextPk: "+nextPk+"; picture_url: "+picture_url)
        var xPos = Math.floor(Math.random() * 5000) - 2500;
        var yPos = Math.floor(Math.random() * 5000) - 2500;
        var oNextNode = {
            id: nextPk,
            label: oProfileData.name,
            title: oProfileData.display_name,
            // shape:"circle",
            shape:"circularImage",
            image: picture_url,
            brokenImage: "https://nostr.build/i/2282.png",
            size: size,
            // color: color,
            x: xPos,
            y: yPos,
        }
        nodes.update(oNextNode)
        totalNumberLoaded++;
        jQuery("#totalNumberLoadedContainer").html(totalNumberLoaded)
    }
    /*
    console.log("loadFollowingNetwork; about to start adding edges")
    for (var p=0;p<aPubkeys.length;p++) {
        var nextPk = aPubkeys[p];
        // await timeout(1)
        // console.log(p+" ====== loadFollowingNetwork; nextPk: "+nextPk)
        var aFollowing = [];
        if (pubkeys[nextPk].followingData.following) {
            aFollowing = pubkeys[nextPk].followingData.following;
        }
        console.log(p+" ====== loadFollowingNetwork; aFollowing.length: "+aFollowing.length)
        for (var f=0;f<aFollowing.length;f++) {
            // console.log("===========f: "+f)
            if (aFollowing[f][0]=="p") {
                var nextFollowingPk = aFollowing[f][1]
                var oNextEdge = {
                    from: nextPk,
                    to: nextFollowingPk,
                }
                edges.update(oNextEdge)
            }
        }
    }
    */
}

const populateProfileInfoContainer = (pubkey,oPubkeys,aAllNodes) => {
    var nodeData = oPubkeys[pubkey];
    var oProfileData = nodeData.profileData;
    var oFollowingData = nodeData.followingData;
    var aaFollowing = oFollowingData.following
    var aFollowing = [];
    for (var f=0;f<aaFollowing.length;f++) {
       var fPk = aaFollowing[f][1];
       aFollowing.push(fPk)
    }

    var profileInfoHTML = "";
    profileInfoHTML += "<div>";
    // profileInfoHTML += JSON.stringify(nodeData);

    profileInfoHTML += "<div style='margin-bottom:10px;' >";
        profileInfoHTML += "<div style='color:grey;' >";
        profileInfoHTML += "name:";
        profileInfoHTML += "</div>";

        profileInfoHTML += "<div>";
        profileInfoHTML += oProfileData.name;
        profileInfoHTML += "</div>";
    profileInfoHTML += "</div>";

    profileInfoHTML += "<div style='margin-bottom:10px;' >";
        profileInfoHTML += "<div style='color:grey;' >";
        profileInfoHTML += "display name:";
        profileInfoHTML += "</div>";

        profileInfoHTML += "<div>";
        profileInfoHTML += oProfileData.display_name;
        profileInfoHTML += "</div>";
    profileInfoHTML += "</div>";

    profileInfoHTML += "<div style='margin-bottom:10px;' >";
        profileInfoHTML += "<div style='color:grey;' >";
        profileInfoHTML += "picture:";
        profileInfoHTML += "</div>";

        profileInfoHTML += "<div>";
        profileInfoHTML += oProfileData.picture_url;
        profileInfoHTML += "</div>";
    profileInfoHTML += "</div>";

    profileInfoHTML += "<div style='margin-bottom:10px;' >";
        profileInfoHTML += "<div style='color:grey;' >";
        profileInfoHTML += "pubkey:";
        profileInfoHTML += "</div>";

        profileInfoHTML += "<div>";
        profileInfoHTML += pubkey;
        profileInfoHTML += "</div>";
    profileInfoHTML += "</div>";

    /*
    profileInfoHTML += "<div style='margin-bottom:10px;' >";
        profileInfoHTML += "<div style='color:grey;' >";
        profileInfoHTML += "following:";
        profileInfoHTML += "</div>";

        profileInfoHTML += "<div style='height:200px;overflow:scroll;' >";
        profileInfoHTML += JSON.stringify(oFollowingData.following);
        profileInfoHTML += "</div>";
    profileInfoHTML += "</div>";

    profileInfoHTML += "<div style='margin-bottom:10px;' >";
        profileInfoHTML += "<div style='color:grey;' >";
        profileInfoHTML += "followers:";
        profileInfoHTML += "</div>";

        profileInfoHTML += "<div style='height:200px;overflow:scroll;' >";
        profileInfoHTML += "?";
        profileInfoHTML += "</div>";
    profileInfoHTML += "</div>";
    */

    profileInfoHTML += "</div>";

    jQuery("#profileInfoContainer").html(profileInfoHTML)

    // var aPubkeys = Object.keys(oPubkeys);
    for (var p=0;p<aAllNodes.length;p++) {
        var pk = aAllNodes[p];
        if (aFollowing.includes(pk)) {
            // var oNxtNode = {id: pk, color: "red", size: 1000, shape: "circle" }
            // nodes.update(oNxtNode);
            var oNxtEdge = {from:pubkey, to:pk}
            edges.update(oNxtEdge)
        }
    }
}

const NFG_Graphic3 = ({seed,pubkeys}) => {
    var aPubkeys = Object.keys(pubkeys)
    console.log("loadFollowingNetwork; seed: "+seed+"; aPubkeys.length: "+aPubkeys.length)

    loadFollowingNetwork(seed,pubkeys)
    /*
    for (var p=0;p<aPubkeys.length;p++) {
        var nextPk = aPubkeys[p];
    }
    */

    return (
        <>
        </>
    );
}

const NFG_Graphic2 = ({seed,pubkeys}) => {
    var oPubkeysInVis = {};
    numberVisNodeUpdates = 0;
    numberVisEdgeUpdates = 0;
    var nodes_arr = [];
    var edges_arr = [];

    var oSeedNode = {
        id: window.myPubkey,
        label: window.myProfile.display_name,
        title: window.myProfile.display_name,
        shape:"circularImage",
        // shape: "circle",
        image: window.myProfile.picture_url,
        brokenImage: "https://nostr.build/i/2282.png",
        size: 1000
    }
    nodes_arr.push(oSeedNode)

    /*
    var aPubkeys = Object.keys(pubkeys)
    console.log("loadFollowingNetwork; seed: "+seed+"; aPubkeys.length: "+aPubkeys.length)
    for (var p=0;p<aPubkeys.length;p++) {
        var nextPk = aPubkeys[p];

        var picture_url = "https://nostr.build/i/2282.png";
        if (pubkeys[nextPk].profileData.picture_url) {
            // picture_url = pubkeys[nextPk].profileData.picture_url
        }
        var size = 25;
        if (pubkeys[nextPk].profileData.level) {
            var level = pubkeys[nextPk].profileData.level;
            if (level==0) { size = 100; }
            if (level==1) { size = 50; }
            if (level==2) { size = 25; }
            if (level==3) { size = 12; }
        }
        console.log(p+" loadFollowingNetwork; nextPk: "+nextPk+"; picture_url: "+picture_url)

        var oNextNode = {
            id: nextPk,
            label: nextPk,
            shape:"circle",
            // image: picture_url,
            // brokenImage: "https://nostr.build/i/2282.png",
            size: size,
        }
        nodes_arr.push(oNextNode)
    }
    for (var p=0;p<aPubkeys.length;p++) {
        var nextPk = aPubkeys[p];
        // console.log(p+" ====== loadFollowingNetwork; nextPk: "+nextPk)
        var aFollowing = [];
        if (pubkeys[nextPk].followingData.following) {
            aFollowing = pubkeys[nextPk].followingData.following;
        }
        console.log(p+" ====== loadFollowingNetwork; aFollowing.length: "+aFollowing.length)
        for (var f=0;f<aFollowing.length;f++) {
            // console.log("===========f: "+f)
            if (aFollowing[f][0]=="p") {
                var nextFollowingPk = aFollowing[f][1]
                var oNextEdge = {
                    from: nextPk,
                    to: nextFollowingPk,
                }
                edges_arr.push(oNextEdge)
            }
        }
    }
    */

    nodes = new DataSet(nodes_arr);
    edges = new DataSet(edges_arr);
    data = {
        nodes,
        edges
    };

    var domNode = useRef(null);

    network = useRef(null);

    useEffect(
        () => {
            network.current = new Network(domNode.current, data, options);
            network.current.fit();

            network.current.on("hoverNode", function (params) {
                console.log("hoverNode Event:", params);
                console.log("hoverNode Event: params.node: ", params.node);
                var nodeID = params.node;
                var aAllNodes = nodes.getIds()
                populateProfileInfoContainer(nodeID,pubkeys,aAllNodes)
            });
            network.current.on("blurNode", function (params) {
                // delete all edges; restore all nodes to normal
                var aAllEdges = edges.getIds()
                data.edges.remove(aAllEdges)
                /*
                for (var e=0;e<aAllEdges.length;e++) {

                }
                */
            });

            network.current.on("click",function(params){
                var aAllNodes = nodes.getIds()
                var nodes_arr = params.nodes;
                var numNodes = nodes_arr.length;
                if (numNodes==1) {
                    var nodeID = nodes_arr[0]
                    // console.log("clicked; nodeID: "+nodeID)
                    // var nodeData = pubkeys[nodeID]
                    populateProfileInfoContainer(nodeID,pubkeys,aAllNodes)
                } else {
                    // var aPubkeys = Object.keys(pubkeys);
                    for (var p=0;p<aAllNodes.length;p++) {
                        /*
                        var pk = aAllNodes[p];
                        var size = 200;
                        if (pubkeys[pk].followingData.level) {
                            var level = pubkeys[pk].followingData.level;
                            var picture_url = null;
                            if (pubkeys[pk].profileData.picture_url) {
                                picture_url = pubkeys[pk].profileData.picture_url;
                            }
                            if (level == 0) {
                                size = 100;
                            }
                            if (level == 1) {
                                size = 50;
                            }
                            if (level == 2) {
                                size = 12;
                            }
                            if (level == 3) {
                                size = 3;
                            }
                        }

                        if (picture_url) {
                            var oNxtNode = {id: pk, size: size, color: "white",
                                shape: "circularImage",
                                // shape: "circle",
                                image: picture_url, brokenImage: "https://nostr.build/i/2282.png", }
                        } else {
                            var oNxtNode = {id: pk, size: size, color: "white", shape: "circle" }
                        }

                        nodes.update(oNxtNode);
                        */
                    }
                }

            });

            // EDGES
            network.current.on("selectEdge",function(params){
                // console.log("selectEdge event triggered")
                var edges_arr = params.edges;
                var numEdges = edges_arr.length;
                if (numEdges==1) {
                    var edgeID = edges_arr[0];
                }
            });
            network.current.on("deselectEdge",function(params){
            });

            // NODES
            network.current.on("selectNode",function(params){
                // console.log("selectNode event triggered")
                var nodes_arr = params.nodes;
                var numNodes = nodes_arr.length;
                if (numNodes==1) {
                    var nodeID = nodes_arr[0];
                    var node = nodes.get(nodeID);
                    var name = node.name;
                    // drawScoreCalculationPanel(nodeID)
                }
            });
            network.current.on("deselectNode",function(params){
                // jQuery("#usernameContainer").html("none")
            });
        },
        [domNode, network, data, options]
    );

    return (
        <>
            <div style={{height:"100%",width:"100%"}} ref = { domNode } />
        </>
    );
};

export default class NFG_Graphic1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        // loadFollowingNetwork(this.props.seed,this.props.pubkeys)
    }
    render() {
        return (
            <>
                <NFG_Graphic2
                    seed={this.props.seed}
                    pubkeys={this.props.pubkeys}
                />
                <NFG_Graphic3
                    seed={this.props.seed}
                    pubkeys={this.props.pubkeys}
                />
            </>
        );
    }
}
