import { useSelector } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';
import { convertNameToSlug } from 'renderer/window1/lib/conceptGraph';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

const createWord = () => {
  const parentConceptPropertyPath = "nostrTopicData";
  const name_singular = document.getElementById(
    'newInstanceNameSingularField'
  ).value;
  const description = document.getElementById(
    'newInstanceDescriptionField'
  ).value;
  const slug = convertNameToSlug(name_singular);
  const oWord = {};
  oWord.wordData = {};
  oWord.wordData.slug = "nostrTopicFor_"+slug;
  oWord.wordData.wordTypes = ["nostrTopic"];
  oWord[parentConceptPropertyPath] = {
    name: name_singular,
    slug: slug,
    description,
  };
  const e1 = document.getElementById('newInstanceRawFileField');
  e1.value = JSON.stringify(oWord, null, 4);
};

const CreateATopic = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitEvent = () => {
    const sEvent = document.getElementById('newInstanceEventField').value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
  };

  const createEvent = () => {
    const parentConceptNostrID = "ec9af0fa71b2f6c1e3556816ad7c06e6623069c04a6e486fc9312b0273697779";
    const parentConceptSlug = "nostrTopic";
    const e = document.getElementById('newInstanceRawFileField');
    let name_singular = "foo";
    if (e) {
      name_singular = document.getElementById(
        'newInstanceNameSingularField'
      ).value;
    }

    const slug = convertNameToSlug(name_singular);
    const wordSlug = "nostrTopicFor_"+slug;

    const kind0 = 9902;
    const aTag0 = ['c', 'concept-graph-testnet-902'];
    const aTag1 = ['t', 'createInstance']; // t for type of concept graph event
    const aTag2 = ['e', parentConceptNostrID]; // if t = createInstance; e for parent concept of the instance (e for the nostr event id of the parent concept)
    const aTag3 = ['s', parentConceptSlug]; // if t = createInstance; s for parent concept of the instance (s for slug of the parent concept)
    const aTag4 = ['w', wordSlug];

    const e1 = document.getElementById('newInstanceRawFileField');
    const e2 = document.getElementById('newInstanceEventField');

    const sWord = JSON.stringify(JSON.parse(e1.value));
    const aTags = [];
    aTags.push(aTag0);
    aTags.push(aTag1);
    aTags.push(aTag2);
    aTags.push(aTag3);
    aTags.push(aTag4);
    const event: NostrEvent = {
      content: sWord,
      kind: kind0,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = getSignature(event, myPrivkey);

    e2.value = JSON.stringify(event, null, 4);
  };

  const createAndSubmitEvent = () => {
    createEvent();
    submitEvent();

    const e1 = document.getElementById('successMessageContainer');
    e1.style.display = 'block';

    const e2 = document.getElementById('createAndSubmitEventButtonContainer');
    e2.style.display = 'none';
  };

  const elem_id = 'technicalDetailsForNostrDevsContainer';

  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">Create New Topic</div>
        <div
          onChange={() => createWord()}
          style={{ marginTop: '20px' }}
        >
          <div className="makeNewLeftPanel">name</div>
          <textarea
            id="newInstanceNameSingularField"
            className="makeNewRightPanel"
            placeholder="electronics"
          />

          <div className="makeNewLeftPanel">description</div>
          <textarea
            id="newInstanceDescriptionField"
            className="makeNewRightPanel"
            placeholder="everything there is to know about electronic devices"
            style={{ height: '80px' }}
          />

          <br />

          <div
            id="createAndSubmitEventButtonContainer"
          >
            <button
              type="button"
              onClick={() => createAndSubmitEvent()}
              className="doSomethingButton"
            >
              submit
            </button>
          </div>

          <div
            id="successMessageContainer"
            style={{ display: 'none', marginBottom: '20px' }}
          >
            Topic submitted successfully to the nostr network.
            <br />
            To listen for this item on the network, click the{' '}
            <i>topics (nostr live)</i> button on the left.
          </div>

          <TechDetailsForNostrNerds />

          <div id={elem_id} style={{ display: 'none' }}>
            <div>
              <div style={{fontSize: '14px', marginLeft: '5px'}}>
                step 0: input name and description, above, to create the word (first textarea below).
              </div>
              <button
                type="button"
                onClick={() => createEvent()}
                className="doSomethingButton"
              >
                step 1: create event
              </button>
              <div style={{display: 'inline-block', fontSize: '14px', marginLeft: '5px', marginTop: '7px'}}>
                wrap word into a nostr event (second textarea below)
              </div>
              <br />
              <button
                type="button"
                onClick={() => submitEvent()}
                className="doSomethingButton"
              >
                step 2: submit event
              </button>
              <div style={{display: 'inline-block', fontSize: '14px', marginLeft: '5px', marginTop: '7px'}}>
                broadcast event to nostr network
              </div>
            </div>
            <div style={{ display: 'inline-block', width: '40%', fontSize: '12px' }}>
              <div>list item as a 'word' (concept graph format)</div>
              <textarea
                id="newInstanceRawFileField"
                style={{
                  display: 'inline-block',
                  height: '400px',
                  width: '100%',
                  fontSize: '10px',
                }}
              />
            </div>
            <div style={{ display: 'inline-block', width: '40%', fontSize: '12px' }}>
              <div>word wrapped as a nostr event</div>
              <textarea
                id="newInstanceEventField"
                style={{
                  display: 'inline-block',
                  height: '400px',
                  width: '100%',
                  fontSize: '10px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateATopic;
