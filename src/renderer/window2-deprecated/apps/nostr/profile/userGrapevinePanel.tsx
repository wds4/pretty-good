import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { tooltipContent } from 'renderer/window1/const/tooltipContent';
import ComposeRatingAndEvent from './composeRatingAndEvent';

const UserGrapevinePanel = ({}) => {
  const [ratingPreset, setResponse] = useState('foo');

  const presets = useSelector(
    (state) => state.nostrGrapevineTrustRatingPresets.presets
  );
  const oRatingPreset = presets[ratingPreset];
  console.log(`oRatingPreset: ${JSON.stringify(oRatingPreset, null, 3)}`);

  const nostrGrapevineSettings = useSelector(
    (state) => state.nostrSettings.nostrGrapevineSettings
  );
  let showGrapevineClassName = 'userProfileGrapevineContainer';
  if (!nostrGrapevineSettings.active) {
    showGrapevineClassName = 'userProfileGrapevineContainer_hidden';
  }
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }

  let showHeaderClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.contexts) {
    showHeaderClassName = 'userProfileGrapevineContainer_hidden';
  }

  let showContextSelectorClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.contexts) {
    showContextSelectorClassName = 'grapevineSelector_hidden';
  }

  let showWorshipClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.worship.active) {
    showWorshipClassName = 'grapevineItemContainer_hidden';
  }
  let showWorship_up_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.worship.up) {
    showWorship_up_ClassName = 'leaveRatingButton_hidden';
  }
  let showWorship_down_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.worship.down) {
    showWorship_down_ClassName = 'leaveRatingButton_hidden';
  }
  let showWorship_contexts_ClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.worship.contexts) {
    showWorship_contexts_ClassName = 'grapevineSelector_hidden';
  }

  let showAttentionClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.attention.active) {
    showAttentionClassName = 'grapevineItemContainer_hidden';
  }
  let showAttention_up_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.attention.up) {
    showAttention_up_ClassName = 'leaveRatingButton_hidden';
  }
  let showAttention_down_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.attention.down) {
    showAttention_down_ClassName = 'leaveRatingButton_hidden';
  }
  let showAttention_contexts_ClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.attention.contexts) {
    showAttention_contexts_ClassName = 'grapevineSelector_hidden';
  }

  let showBeliefClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.believe.active) {
    showBeliefClassName = 'grapevineItemContainer_hidden';
  }
  let showBelief_up_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.believe.up) {
    showBelief_up_ClassName = 'leaveRatingButton_hidden';
  }
  let showBelief_down_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.believe.down) {
    showBelief_down_ClassName = 'leaveRatingButton_hidden';
  }
  let showBelief_contexts_ClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.believe.contexts) {
    showBelief_contexts_ClassName = 'grapevineSelector_hidden';
  }

  let showNostrClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.nostr.active) {
    showNostrClassName = 'grapevineItemContainer_hidden';
  }
  let showNostr_up_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.nostr.up) {
    showNostr_up_ClassName = 'leaveRatingButton_hidden';
  }
  let showNostr_down_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.nostr.down) {
    showNostr_down_ClassName = 'leaveRatingButton_hidden';
  }
  let showNostr_contexts_ClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.nostr.contexts) {
    showNostr_contexts_ClassName = 'grapevineSelector_hidden';
  }

  let showOntologyClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.ontology.active) {
    showOntologyClassName = 'grapevineItemContainer_hidden';
  }
  let showOntology_up_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.ontology.up) {
    showOntology_up_ClassName = 'leaveRatingButton_hidden';
  }
  let showOntology_down_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.ontology.down) {
    showOntology_down_ClassName = 'leaveRatingButton_hidden';
  }
  let showOntology_contexts_ClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.ontology.contexts) {
    showOntology_contexts_ClassName = 'grapevineSelector_hidden';
  }

  let showAdviceClassName = 'grapevineItemContainer';
  if (!nostrGrapevineSettings.advice.active) {
    showAdviceClassName = 'grapevineItemContainer_hidden';
  }
  let showAdvice_up_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.advice.up) {
    showAdvice_up_ClassName = 'leaveRatingButton_hidden';
  }
  let showAdvice_down_ClassName = 'leaveRatingButton';
  if (!nostrGrapevineSettings.advice.down) {
    showAdvice_down_ClassName = 'leaveRatingButton_hidden';
  }
  let showAdvice_contexts_ClassName = 'grapevineSelector';
  if (!nostrGrapevineSettings.advice.contexts) {
    showAdvice_contexts_ClassName = 'grapevineSelector_hidden';
  }
  const processRating = ({ value }) => {
    console.log(`processRating; value: ${value}`);
    setResponse(value);
  };

  return (
    <>
      <Tooltip
        anchorSelect="#purpose"
        html={tooltipContent.purpose}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#context"
        html={tooltipContent.context}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#worship"
        html={tooltipContent.worship}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#attention"
        html={tooltipContent.attention}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#believe"
        html={tooltipContent.believe}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#ontology"
        html={tooltipContent.ontology}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#advice"
        html={tooltipContent.advice}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#manageNostrRelays"
        html={tooltipContent.manageNostrRelays}
        clickable
        className="reactTooltip"
      />
      <Tooltip
        anchorSelect="#grapevineIcon"
        html={tooltipContent.grapevineIcon}
        clickable
        className="reactTooltip"
      />
      <div>
        <div
          style={{
            display: 'inline-block',
            fontSize: '46px',
            textAlign: 'center',
          }}
        >
          <a id="grapevineIcon">&#x1F347;</a>
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
              <a
                id="purpose"
                className="grapevineContainerLeftCol"
                style={{ fontSize: '18px' }}
              >
                Purpose
              </a>
              <a
                id="context"
                className="grapevineContainerLeftCol"
                style={{
                  position: 'absolute',
                  right: '10px',
                  fontSize: '18px',
                }}
              >
                Context
              </a>
            </div>
          </div>
          <div style={{ maxHeight: '350px', overflow: 'auto' }}>
            <div className={showWorshipClassName}>
              <a id="worship" className="grapevineContainerLeftCol">
                Every Purpose:
              </a>
              <button
                value="worship_up"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showWorship_up_ClassName}
              >
                Yes
              </button>
              <button
                value="worship_down"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showWorship_down_ClassName}
              >
                No
              </button>
              <select className={showWorship_contexts_ClassName}>
                <option>all</option>
                <option>bitcoin</option>
              </select>
            </div>

            <div className={showAttentionClassName}>
              <a id="attention" className="grapevineContainerLeftCol">
                Guide Attention:
              </a>
              <button
                value="attention_up"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showAttention_up_ClassName}
              >
                Follow
              </button>
              <button
                value="attention_down"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showAttention_down_ClassName}
              >
                Ignore
              </button>
              <select className={showAttention_contexts_ClassName}>
                <option>all</option>
                <option>bitcoin</option>
              </select>
            </div>

            <div className={showBeliefClassName}>
              <a id="believe" className="grapevineContainerLeftCol">
                Believe:
              </a>
              <button
                value="believe_up"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showBelief_up_ClassName}
              >
                Believe
              </button>
              <button
                value="believe_down"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showBelief_down_ClassName}
              >
                Don't believe
              </button>
              <select className={showBelief_contexts_ClassName}>
                <option>all</option>
                <option>bitcoin</option>
                <option>covid-19</option>
              </select>
            </div>

            <div className={showOntologyClassName}>
              <a id="ontology" className="grapevineContainerLeftCol">
                Ontology:
              </a>
              <button
                value="ontology_up"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showOntology_up_ClassName}
              >
                Trust
              </button>
              <button
                value="ontology_down"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showOntology_down_ClassName}
              >
                Don't trust
              </button>
              <select className={showOntology_contexts_ClassName}>
                <option>all</option>
                <option>nostr relays</option>
                <option>genders</option>
              </select>
            </div>

            <div className={showAdviceClassName}>
              <a id="advice" className="grapevineContainerLeftCol">
                Judgement / advice:
              </a>
              <button
                value="advice_up"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showAdvice_up_ClassName}
              >
                Trust
              </button>
              <button
                value="advice_down"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showAdvice_down_ClassName}
              >
                Don't trust
              </button>
              <select className={showAdvice_contexts_ClassName}>
                <option>all topics</option>
                <option>nostr relays</option>
                <option>dating</option>
              </select>
            </div>

            <div className={showNostrClassName}>
              <a className="grapevineContainerLeftCol" id="manageNostrRelays">
                Manage Nostr relays:
              </a>
              <button
                value="nostr_up"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showNostr_up_ClassName}
              >
                Trust this user
              </button>
              <button
                value="nostr_down"
                onClick={({ target: value }) => processRating(value)}
                type="button"
                className={showNostr_down_ClassName}
              >
                Don't trust
              </button>
              <select className={showNostr_contexts_ClassName}>
                <option>all relays</option>
                <option>eCommerce relays</option>
                <option>dating app relays</option>
                <option>news relays</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ border: '1px solid red', maxHeight: '300px' }}>
          <ComposeRatingAndEvent ratingPreset={ratingPreset} />
        </div>
      </div>
    </>
  );
};
export default UserGrapevinePanel;
