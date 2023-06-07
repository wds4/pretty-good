import { useSelector, useDispatch } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';
import {
  convertNameToPropertyPath,
  convertNameToSlug,
  convertNameToTitle,
} from 'renderer/window1/lib/conceptGraph';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';

/*
const event: NostrEvent = {
  content: sWord,
  kind: 9901,
  tags: aTags,
  created_at: dateToUnix(),
  pubkey: getPublicKey(myPrivkey),
};
LISTENER:
const { events } = useNostrEvents({
  filter: {
    since: 0,
    kinds: [9901],
    '#c': ['concept-graph-testnet-901'],
    '#t': ['endorseAsRelaysPickerHunter'],
    '#e': ['endorseAsRelaysPickerHunter'],
  },
});
*/
const createNewInstanceWord = ({ parentConceptPropertyPath }) => {
  const name_singular = document.getElementById(
    'newInstanceNameSingularField'
  ).value;
  const description = document.getElementById(
    'newInstanceDescriptionField'
  ).value;
  const oWord = {};
  oWord[parentConceptPropertyPath] = {
    name: name_singular,
    slug: convertNameToSlug(name_singular),
    description,
  };
  const e1 = document.getElementById('newInstanceRawFileField');
  e1.value = JSON.stringify(oWord, null, 4);
};

const CreateNewInstance = ({
  parentConceptPropertyPath,
  parentConceptNostrID,
  parentConceptSlug,
}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const kind0 = 9901;
  const aTag0 = ['c', 'concept-graph-testnet-901'];
  const aTag1 = ['t', 'createInstance']; // t for type of concept graph event
  const aTag2 = ['e', parentConceptNostrID]; // if t = createInstance; e for parent concept of the instance (e for the nostr event id of the parent concept)
  const aTag3 = ['s', parentConceptSlug]; // if t = createInstance; s for parent concept of the instance (s for slug of the parent concept)

  const createEvent = () => {
    const e1 = document.getElementById('newInstanceRawFileField');
    const e2 = document.getElementById('newInstanceEventField');

    const sWord = JSON.stringify(JSON.parse(e1.value));
    const aTags = [];
    aTags.push(aTag0);
    aTags.push(aTag1);
    aTags.push(aTag2);
    aTags.push(aTag3);
    const event: NostrEvent = {
      content: sWord,
      kind: kind0,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    e2.value = JSON.stringify(event, null, 4);
  };

  const submitEvent = () => {
    const sEvent = document.getElementById('newInstanceEventField').value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
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
      <div className="h4">add a new item to this list</div>
      <div
        onChange={() => createNewInstanceWord({ parentConceptPropertyPath })}
        id="allInputFieldsContainer"
        style={{ marginTop: '20px' }}
      >
        <div className="makeNewLeftPanel">name</div>
        <textarea
          id="newInstanceNameSingularField"
          className="makeNewRightPanel"
          placeholder="The Big Short"
        />

        <br />
        <div style={{ display: 'none' }}>
          <div className="makeNewLeftPanel">title</div>
          <textarea
            id="newInstanceTitleSingularField"
            className="makeNewRightPanel"
            style={{ backgroundColor: '#CFCFCF' }}
          />

          <br />

          <div className="makeNewLeftPanel">slug</div>
          <textarea
            id="newInstanceSlugSingularField"
            className="makeNewRightPanel"
            style={{ backgroundColor: '#CFCFCF' }}
          />
        </div>

        <div className="makeNewLeftPanel">description</div>
        <textarea
          id="newInstanceDescriptionField"
          className="makeNewRightPanel"
          placeholder="A cautionary tale about self deception at the institutional level."
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
          Item submitted successfully to the nostr network.
          <br />
          To listen for this item on the network, click the{' '}
          <i>view all items (nostr live)</i> button on the left.
        </div>

        <TechDetailsForNostrNerds />

        <div id={elem_id} style={{ display: 'none' }}>
          <div>
            <button
              type="button"
              onClick={() => createEvent()}
              className="doSomethingButton"
            >
              step 1: create event
            </button>
            <button
              type="button"
              onClick={() => submitEvent()}
              className="doSomethingButton"
            >
              step 2: submit event
            </button>
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
    </>
  );
};
export default CreateNewInstance;
