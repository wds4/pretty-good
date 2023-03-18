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
const createNewInstanceWord = ({parentConceptPropertyPath}) => {
  const name_singular = document.getElementById(
    'newInstanceNameSingularField'
  ).value;
  const description = document.getElementById(
    'newInstanceDescriptionField'
  ).value;
  let oWord = {};
  oWord[parentConceptPropertyPath] = {
    name:  name_singular,
    slug: convertNameToSlug(name_singular),
    description,
  };
  const e1 = document.getElementById('newInstanceRawFileField');
  e1.value = JSON.stringify(oWord, null, 4);
}

const CreateNewInstance = ({parentConceptPropertyPath, parentConceptNostrID, parentConceptSlug}) => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const kind0 = 9901;
  const aTag0 = ["c","concept-graph-testnet-901"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["e", parentConceptNostrID]; // if t = createInstance; e for parent concept of the instance (e for the nostr event id of the parent concept)
  const aTag3 = ["s", parentConceptSlug]; // if t = createInstance; s for parent concept of the instance (s for slug of the parent concept)

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

  return (
    <>
      <div className="h4">Create New Instance of This Curated List</div>
      <div
        onChange={() => createNewInstanceWord({parentConceptPropertyPath})}
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

        <div className="h4">Properties</div>
        <div
          style={{
            fontSize: '12px',
            marginLeft: '20%',
            padding: '20px',
            width: '60%',
          }}
        >
          These will be the properties of instances of this list. Default
          properties are name and description. For now, properties are all of
          type: strings. Future property types will include: objects, arrays,
          numbers, boolean, etc.
        </div>

        <div>
          rawFile
          <button onClick={() => createEvent()} className="doSomethingButton">
            create event
          </button>
          <button onClick={() => submitEvent()} className="doSomethingButton">
            submit event
          </button>
        </div>
        <textarea
          id="newInstanceRawFileField"
          style={{
            display: 'inline-block',
            height: '400px',
            width: '40%',
            fontSize: '10px',
          }}
        />
        <textarea
          id="newInstanceEventField"
          style={{
            display: 'inline-block',
            height: '400px',
            width: '40%',
            fontSize: '10px',
          }}
        />
      </div>
    </>
  );
};
export default CreateNewInstance;
