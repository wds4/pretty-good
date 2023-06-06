import React from 'react';
import { singleIterationCompositeUserScoreCalculationsRedo } from 'renderer/window1/lib/curatedLists/singleIterationCompositeUserScoreCalculationsRedo';
import { singleIterationInstanceScoreCalculationsRedo } from 'renderer/window1/lib/curatedLists/singleIterationInstanceScoreCalculationsRedo';
import CalculationResultsRedo from './controlPanels/rightPanel/scores/scoresRedo';

export default class ListUIRedo extends React.Component {
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

    const aProfileCompScoreData =
    singleIterationCompositeUserScoreCalculationsRedo(
      this.props.controlPanelSettings,
      this.props.aAllUserNodes,
      this.props.nodes,
      this.props.edges,
    );
    this.setState( {aProfileCompScoreData} )
    const aInstanceCompScoreData = singleIterationInstanceScoreCalculationsRedo(
      this.props.controlPanelSettings,
      this.props.aAllUserNodes,
      this.props.aAllInstanceNodes,
      this.props.nodes,
      this.props.edges,
    );
    this.setState( {aInstanceCompScoreData} )

    setInterval(() => {
      const aProfileCompScoreData =
        singleIterationCompositeUserScoreCalculationsRedo(
          this.props.controlPanelSettings,
          this.props.aAllUserNodes,
          this.props.nodes,
          this.props.edges,
        );
      this.setState( {aProfileCompScoreData} )
      const aInstanceCompScoreData = singleIterationInstanceScoreCalculationsRedo(
        this.props.controlPanelSettings,
        this.props.aAllUserNodes,
        this.props.aAllInstanceNodes,
        this.props.nodes,
        this.props.edges,
      );
      this.setState( {aInstanceCompScoreData} )
    }, 1500);
  }

  render() {
    return (
      <>
        <div style={{color: 'grey', textAlign: 'right', marginRight: '30px'}}>dev notes: loading data from redux store</div>
        <CalculationResultsRedo
          aInstanceCompScoreData={this.state.aInstanceCompScoreData}
          aProfileCompScoreData={this.state.aProfileCompScoreData}
          oMyNostrProfileData={this.props.oMyNostrProfileData}
          aAllUserNodes={this.props.aAllUserNodes}
          nodes={this.props.nodes}
          oCuratedListData={this.props.oCuratedListData}
          curatedListEventId={this.props.curatedListEventId}
          oNostrProfilesData={this.props.oNostrProfilesData}
        />
      </>
    );
  }
}
