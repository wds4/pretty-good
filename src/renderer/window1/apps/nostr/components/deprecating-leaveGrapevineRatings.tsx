import React from 'react';

// setGrapevineDefaults();

export default class LeaveGrapevineRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log(`this.props.pubkey: ${this.props.pubkey}`);
    // setGrapevineDefaults();
  }

  render() {
    console.log(
      `window.grapevineSettings.attention.contexts: ${window.grapevineSettings.attention.contexts}`
    );

    let showGrapevineClassName = 'userProfileGrapevineContainer';
    if (!window.grapevineSettings.active) {
      showGrapevineClassName = 'userProfileGrapevineContainer_hidden';
    }

    let showHeaderClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.contexts) {
      showHeaderClassName = 'grapevineItemContainer_hidden';
    }

    let showContextSelectorClassName = 'grapevineSelector';
    if (!window.grapevineSettings.contexts) {
      showContextSelectorClassName = 'grapevineSelector_hidden';
    }

    let showWorshipClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.worship.active) {
      showWorshipClassName = 'grapevineItemContainer_hidden';
    }
    let showWorship_up_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.worship.up) {
      showWorship_up_ClassName = 'leaveRatingButton_hidden';
    }
    let showWorship_down_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.worship.down) {
      showWorship_down_ClassName = 'leaveRatingButton_hidden';
    }
    let showWorship_contexts_ClassName = 'grapevineSelector';
    if (!window.grapevineSettings.worship.contexts) {
      showWorship_contexts_ClassName = 'grapevineSelector_hidden';
    }

    let showAttentionClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.attention.active) {
      showAttentionClassName = 'grapevineItemContainer_hidden';
    }
    let showAttention_up_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.attention.up) {
      showAttention_up_ClassName = 'leaveRatingButton_hidden';
    }
    let showAttention_down_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.attention.down) {
      showAttention_down_ClassName = 'leaveRatingButton_hidden';
    }
    let showAttention_contexts_ClassName = 'grapevineSelector';
    if (!window.grapevineSettings.attention.contexts) {
      showAttention_contexts_ClassName = 'grapevineSelector_hidden';
    }

    let showBeliefClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.believe.active) {
      showBeliefClassName = 'grapevineItemContainer_hidden';
    }
    let showBelief_up_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.believe.up) {
      showBelief_up_ClassName = 'leaveRatingButton_hidden';
    }
    let showBelief_down_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.believe.down) {
      showBelief_down_ClassName = 'leaveRatingButton_hidden';
    }
    let showBelief_contexts_ClassName = 'grapevineSelector';
    if (!window.grapevineSettings.believe.contexts) {
      showBelief_contexts_ClassName = 'grapevineSelector_hidden';
    }

    let showNostrClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.nostr.active) {
      showNostrClassName = 'grapevineItemContainer_hidden';
    }
    let showNostr_up_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.nostr.up) {
      showNostr_up_ClassName = 'leaveRatingButton_hidden';
    }
    let showNostr_down_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.nostr.down) {
      showNostr_down_ClassName = 'leaveRatingButton_hidden';
    }
    let showNostr_contexts_ClassName = 'grapevineSelector';
    if (!window.grapevineSettings.nostr.contexts) {
      showNostr_contexts_ClassName = 'grapevineSelector_hidden';
    }

    let showOntologyClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.ontology.active) {
      showOntologyClassName = 'grapevineItemContainer_hidden';
    }
    let showOntology_up_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.ontology.up) {
      showOntology_up_ClassName = 'leaveRatingButton_hidden';
    }
    let showOntology_down_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.ontology.down) {
      showOntology_down_ClassName = 'leaveRatingButton_hidden';
    }
    let showOntology_contexts_ClassName = 'grapevineSelector';
    if (!window.grapevineSettings.ontology.contexts) {
      showOntology_contexts_ClassName = 'grapevineSelector_hidden';
    }

    let showAdviceClassName = 'grapevineItemContainer';
    if (!window.grapevineSettings.advice.active) {
      showAdviceClassName = 'grapevineItemContainer_hidden';
    }
    let showAdvice_up_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.advice.up) {
      showAdvice_up_ClassName = 'leaveRatingButton_hidden';
    }
    let showAdvice_down_ClassName = 'leaveRatingButton';
    if (!window.grapevineSettings.advice.down) {
      showAdvice_down_ClassName = 'leaveRatingButton_hidden';
    }
    let showAdvice_contexts_ClassName = 'grapevineSelector';
    if (!window.grapevineSettings.advice.contexts) {
      showAdvice_contexts_ClassName = 'grapevineSelector_hidden';
    }

    const pk = this.props.pubkey;
    return (
      <>
        <div className={showGrapevineClassName}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '52px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginTop: '5px' }}>&#x1F347;</div>
          </div>
          <div
            style={{
              display: 'inline-block',
              marginLeft: '30px',
              width: '500px',
            }}
          >
            <div
              style={{
                marginBottom: '5px',
                paddingBottom: '3px',
                position: 'relative',
              }}
            >
              <div
                className={showHeaderClassName}
                style={{
                  borderBottom: '1px solid black',
                  paddingBottom: '5px',
                }}
              >
                <div
                  className="grapevineContainerLeftCol"
                  style={{ fontSize: '18px' }}
                >
                  <span className="tooltiptext">
                    Purpose:
                    <br />
                    What will these ratings be used for?
                  </span>
                  Purpose
                </div>
                <div
                  className="grapevineContainerLeftCol"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    fontSize: '18px',
                  }}
                >
                  <span className="tooltiptext">category</span>
                  Context
                </div>
              </div>
            </div>
            <div style={{ maxHeight: '350px', overflow: 'scroll' }}>
              <div className={showWorshipClassName}>
                <div className="grapevineContainerLeftCol">
                  <span className="tooltiptext">
                    a.k.a. "Global Trust"
                    <br />
                    Do you trust (or mistrust) this user in all things and for
                    all purposes?
                  </span>
                  Every Purpose:
                </div>
                <div className={showWorship_up_ClassName}>Yes</div>
                <div className={showWorship_down_ClassName}>No</div>
                <select className={showWorship_contexts_ClassName}>
                  <option>all</option>
                  <option>bitcoin</option>
                </select>
              </div>

              <div className={showAttentionClassName}>
                <div className="grapevineContainerLeftCol">
                  <span className="tooltiptext">
                    Attention:
                    <br />
                    How much influence should this user have over things like
                    your nostr content feed?
                  </span>
                  Guide Attention:
                </div>
                <div className={showAttention_up_ClassName}>Follow</div>
                <div className={showAttention_down_ClassName}>Ignore</div>
                <select className={showAttention_contexts_ClassName}>
                  <option>all</option>
                  <option>bitcoin</option>
                </select>
              </div>

              <div className={showBeliefClassName}>
                <div className="grapevineContainerLeftCol">
                  <span className="tooltiptext">
                    Believe:
                    <br />
                    How much influence should this user have over things like
                    poll results or statements of fact?
                  </span>
                  Believe:
                </div>
                <div className={showBelief_up_ClassName}>Believe</div>
                <div className={showBelief_down_ClassName}>Don't believe</div>
                <select className={showBelief_contexts_ClassName}>
                  <option>all</option>
                  <option>bitcoin</option>
                  <option>covid-19</option>
                </select>
              </div>

              <div className={showOntologyClassName}>
                <div className="grapevineContainerLeftCol">
                  <span className="tooltiptext">
                    Ontology
                    <br />
                    How much influence should this user have over things like:
                    categorizations of contexts, definitions of words, data
                    structures and schemas, and other social constructs?
                  </span>
                  Ontology:
                </div>
                <div className={showOntology_up_ClassName}>Trust</div>
                <div className={showOntology_down_ClassName}>Don't trust</div>
                <select className={showOntology_contexts_ClassName}>
                  <option>all</option>
                  <option>nostr relays</option>
                  <option>genders</option>
                </select>
              </div>

              <div className={showAdviceClassName}>
                <div className="grapevineContainerLeftCol">
                  <span className="tooltiptext">
                    Judgement:
                    <br />
                    How much do you trust this user's advice or judgement over
                    things like which nostr relays to trust?
                  </span>
                  Judgement / advice:
                </div>
                <div className={showAdvice_up_ClassName}>Trust</div>
                <div className={showAdvice_down_ClassName}>Don't trust</div>
                <select className={showAdvice_contexts_ClassName}>
                  <option>all topics</option>
                  <option>nostr relays</option>
                  <option>dating</option>
                </select>
              </div>

              <div className={showNostrClassName}>
                <div className="grapevineContainerLeftCol">
                  <span className="tooltiptext">
                    Nostr relays:
                    <br />
                    How much influence should this user have over which nostr
                    relays to use for various purposes?
                  </span>
                  Manage Nostr relays:
                </div>
                <div className={showNostr_up_ClassName}>Trust</div>
                <div className={showNostr_down_ClassName}>Don't trust</div>
                <select className={showNostr_contexts_ClassName}>
                  <option>all relays</option>
                  <option>eCommerce relays</option>
                  <option>dating app relays</option>
                  <option>news relays</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
