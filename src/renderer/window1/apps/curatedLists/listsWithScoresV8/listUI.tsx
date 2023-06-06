import React from 'react';
import { singleIterationCompositeUserScoreCalculations } from 'renderer/window1/lib/curatedLists/singleIterationCompositeUserScoreCalculations';
import { singleIterationInstanceScoreCalculations } from 'renderer/window1/lib/curatedLists/singleIterationInstanceScoreCalculations';
import CalculationResults from './controlPanels/rightPanel/scores';

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
    }, 2000);
  }

  render() {
    return (
      <>
        <div style={{color: 'grey', textAlign: 'right', marginRight: '30px'}}>dev notes: loading data from SQL</div>
        <CalculationResults
          aInstanceCompScoreData={this.state.aInstanceCompScoreData}
          aProfileCompScoreData={this.state.aProfileCompScoreData}
          oMyNostrProfileData={this.props.oMyNostrProfileData}
          aAllUserNodes={this.props.aAllUserNodes}
          nodes={this.props.nodes}
          oListData={this.props.oListData}
        />
      </>
    );
  }
}
