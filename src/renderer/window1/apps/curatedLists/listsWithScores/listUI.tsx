import React from 'react';
import { singleIterationCompositeUserScoreCalculations } from 'renderer/window1/lib/curatedLists/singleIterationCompositeUserScoreCalculations';
import { singleIterationInstanceScoreCalculations } from 'renderer/window1/lib/curatedLists/singleIterationInstanceScoreCalculations';
import RightPanel from './controlPanels/rightPanel';

export default class ListUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aProfileCompScoreData: [],
      aInstanceCompScoreData: [],
    };
  }

  async componentDidMount() {
    const myPubKey = this.props.oMyNostrProfileData.pubkey;
    const aContextDAG = ['thisListCuration_allContexts'];
    setInterval(() => {
      const aProfileCompScoreData =
        singleIterationCompositeUserScoreCalculations(
          myPubKey,
          this.props.controlPanelSettings,
          aContextDAG,
          this.props.aAllNodes,
          this.props.aAllUserNodes,
          this.props.aAllInstanceNodes,
          this.props.nodes,
          this.props.edges,
        );
      this.setState( {aProfileCompScoreData} )
      const aInstanceCompScoreData = singleIterationInstanceScoreCalculations(
        myPubKey,
        this.props.controlPanelSettings,
        aContextDAG,
        this.props.aAllNodes,
        this.props.aAllUserNodes,
        this.props.aAllInstanceNodes,
        this.props.nodes,
        this.props.edges,
      );
      this.setState( {aInstanceCompScoreData} )
    }, 300);
  }

  render() {
    return (
      <>
        <RightPanel
          oListData={this.props.oListData}
          aInstanceCompScoreData={this.state.aInstanceCompScoreData}
          aProfileCompScoreData={this.state.aProfileCompScoreData}
        />
      </>
    );
  }
}
