import { useSelector, useDispatch } from 'react-redux';
import { updateNostrGrapevineGeneralSettings, updateNostrGrapevineTopicalSettings } from 'renderer/window1/redux/features/nostr/settings/slice';
import ToggleSwitch from './grToggleSwitch';

const ActiveGrapevine = () => {
  const nostrGrapevineSettings = useSelector((state) => state.nostrSettings.nostrGrapevineSettings);
  const dispatch = useDispatch();
  const processStateChangeX = (newState,topic,subtopic) => {
    console.log(`processStateChange callback; topic: ${topic} subtopic: ${subtopic} newState: ${newState}`);
    if (topic=="general") {
      let oUpdate = {};
      oUpdate[subtopic] = newState;
      dispatch(updateNostrGrapevineGeneralSettings(oUpdate));
    } else {
      let oData = {};
      oData.topic = topic;
      let oUpdate = {};
      oUpdate[topic] = {};
      oUpdate[topic][subtopic] = newState;
      oData.oUpdate = oUpdate;
      console.log("qwerty dispatch");
      dispatch(updateNostrGrapevineTopicalSettings(oData));
    }
  };
  return (
    <>
      <div
        className="grapevineSettingsItemContainer"
        style={{ textAlign: 'center' }}
      >
        <div
          className="grapevineSettingsItemLeftCol"
          style={{ width: '200px' }}
        >
          Activate Contexts
        </div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="general_contexts"
              processStateChange={(newState) => processStateChangeX(newState,"general","contexts")}
              initState={nostrGrapevineSettings.contexts}
            />
          </>
        </div>
      </div>
      <hr />
      <div
        className="grapevineSettingsItemContainer"
        style={{ backgroundColor: '#DFDFDF' }}
      >
        <div className="grapevineSettingsItemLeftCol">Purpose:</div>
        <div className="grapevineSettingsItemMainToggleCol">.</div>
        <div className="grapevineSettingsItemRatingNameCol">(affirmative)</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">.</div>
        <div className="grapevineSettingsItemRatingNameCol">(negative)</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">.</div>
        <div className="grapevineSettingsItemRatingNameCol">Contextual</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">.</div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsItemLeftCol">All Purposes</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="worship_active"
              processStateChange={(newState) => processStateChangeX(newState,"worship","active")}
              initState={nostrGrapevineSettings.worship.active}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">yes</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="worship_up"
              processStateChange={(newState) => processStateChangeX(newState,"worship","up")}
              initState={nostrGrapevineSettings.worship.up}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">no</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="worship_down"
              processStateChange={(newState) => processStateChangeX(newState,"worship","down")}
              initState={nostrGrapevineSettings.worship.down}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="worship_contextual"
              processStateChange={(newState) => processStateChangeX(newState,"worship","contextual")}
              initState={nostrGrapevineSettings.worship.contextual}
            />
          </>
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsItemLeftCol">Attention</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="attention_active"
              processStateChange={(newState) => processStateChangeX(newState,"attention","active")}
              initState={nostrGrapevineSettings.attention.active}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">follow</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="attention_up"
              processStateChange={(newState) => processStateChangeX(newState,"attention","up")}
              initState={nostrGrapevineSettings.attention.up}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">ignore</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="attention_down"
              processStateChange={(newState) => processStateChangeX(newState,"attention","down")}
              initState={nostrGrapevineSettings.attention.down}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="attention_contextual"
              processStateChange={(newState) => processStateChangeX(newState,"attention","contextual")}
              initState={nostrGrapevineSettings.attention.contextual}
            />
          </>
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsItemLeftCol">Believe</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="believe_active"
              processStateChange={(newState) => processStateChangeX(newState,"believe","active")}
              initState={nostrGrapevineSettings.believe.active}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">believe</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="believe_up"
              processStateChange={(newState) => processStateChangeX(newState,"believe","up")}
              initState={nostrGrapevineSettings.believe.up}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">disbelieve</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="believe_down"
              processStateChange={(newState) => processStateChangeX(newState,"believe","down")}
              initState={nostrGrapevineSettings.believe.down}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="believe_contextual"
              processStateChange={(newState) => processStateChangeX(newState,"believe","contextual")}
              initState={nostrGrapevineSettings.believe.contextual}
            />
          </>
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsItemLeftCol">Nostr relays</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="nostr_active"
              processStateChange={(newState) => processStateChangeX(newState,"nostr","active")}
              initState={nostrGrapevineSettings.nostr.active}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">trust</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="nostr_up"
              processStateChange={(newState) => processStateChangeX(newState,"nostr","up")}
              initState={nostrGrapevineSettings.nostr.up}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">don't trust</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="nostr_down"
              processStateChange={(newState) => processStateChangeX(newState,"nostr","down")}
              initState={nostrGrapevineSettings.nostr.down}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="nostr_contextual"
              processStateChange={(newState) => processStateChangeX(newState,"nostr","contextual")}
              initState={nostrGrapevineSettings.nostr.contextual}
            />
          </>
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsItemLeftCol">Ontology</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="ontology_active"
              processStateChange={(newState) => processStateChangeX(newState,"ontology","active")}
              initState={nostrGrapevineSettings.ontology.active}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">trust</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="ontology_up"
              processStateChange={(newState) => processStateChangeX(newState,"ontology","up")}
              initState={nostrGrapevineSettings.ontology.up}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">don't trust</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="ontology_down"
              processStateChange={(newState) => processStateChangeX(newState,"ontology","down")}
              initState={nostrGrapevineSettings.ontology.down}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="ontology_contextual"
              processStateChange={(newState) => processStateChangeX(newState,"ontology","contextual")}
              initState={nostrGrapevineSettings.ontology.contextual}
            />
          </>
        </div>
      </div>

      <div className="grapevineSettingsItemContainer">
        <div className="grapevineSettingsItemLeftCol">Advice</div>
        <div className="grapevineSettingsItemMainToggleCol">
          <>
            <ToggleSwitch
              label="advice_active"
              processStateChange={(newState) => processStateChangeX(newState,"advice","active")}
              initState={nostrGrapevineSettings.advice.active}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">trust</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="advice_up"
              processStateChange={(newState) => processStateChangeX(newState,"advice","up")}
              initState={nostrGrapevineSettings.advice.up}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingNameCol">don't trust</div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="advice_down"
              processStateChange={(newState) => processStateChangeX(newState,"advice","down")}
              initState={nostrGrapevineSettings.advice.down}
            />
          </>
        </div>
        <div className="grapevineSettingsItemRatingToggleButtonCol">
          <>
            <ToggleSwitch
              label="advice_contextual"
              processStateChange={(newState) => processStateChangeX(newState,"advice","contextual")}
              initState={nostrGrapevineSettings.advice.contextual}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default ActiveGrapevine;
