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
    '#t': ['createInstance'],
    '#s': ['nostrCuratedList'],
  },
});
*/
const kind0 = 9901;
const aTag0 = ['c', 'concept-graph-testnet-901'];
const aTag1 = ['t', 'createInstance']; // t for type of concept graph event
// use either the s tag (slug) OR the e tag (event id) to indicate the parent concept
const aTag2 = ['s', 'nostrCuratedList']; // if t = createInstance; s for the slug (singular) of the parent concept of the instance
// const aTag2 = ["e",event-id-forlist]; // if t = createInstance; e for the nostr event id of the parent concept of the instance

const createJSONSchema = (name_singular, name_plural) => {
  const oProperties = {};
  const propertyPath = convertNameToPropertyPath(name_singular);
  oProperties[propertyPath] = {
    type: 'object',
    name: `${name_singular} data`,
    title: `${convertNameToTitle(name_singular)} Data`,
    description: `data about this ${name_singular}`,
    require: true,
    required: ['name'],
    definitions: {},
    properties: {
      name: {
        type: 'string',
        require: true,
      },
      title: {
        type: 'string',
        require: false,
      },
      slug: {
        type: 'string',
        require: false,
      },
      description: {
        type: 'string',
        require: false,
      },
    },
  };
  return oProperties;
};

const createListWord = () => {
  const name_singular = document.getElementById(
    'newConceptNameSingularField'
  ).value;
  const name_plural = document.getElementById(
    'newConceptNamePluralField'
  ).value;
  const description = document.getElementById(
    'newConceptDescriptionField'
  ).value;

  document.getElementById('newConceptTitleSingularField').value =
    convertNameToTitle(name_singular);
  document.getElementById('newConceptTitlePluralField').value =
    convertNameToTitle(name_plural);

  document.getElementById('newConceptSlugSingularField').value =
    convertNameToSlug(name_singular);
  document.getElementById('newConceptSlugPluralField').value =
    convertNameToSlug(name_plural);
  const oWord = {
    nostrCuratedListData: {
      name: {
        singular: name_singular,
        plural: name_plural,
      },
      title: {
        singular: convertNameToTitle(name_singular),
        plural: convertNameToTitle(name_plural),
      },
      slug: {
        singular: convertNameToSlug(name_singular),
        plural: convertNameToSlug(name_plural),
      },
      description,
      propertyPath: convertNameToPropertyPath(name_singular),
    },
    jsonSchemaData: {
      description: `This is the JSON Schema used to create and validate object files for the representation of instances of the list of ${name_plural}`,
      name: `json schema for an instance of ${name_singular}`,
      title: `JSON Schema for an Instance of ${convertNameToTitle(
        name_singular
      )}`,
      type: 'object',
      required: [convertNameToPropertyPath(name_singular)],
      definitions: {},
      properties: createJSONSchema(name_singular, name_plural),
    },
  };
  const e1 = document.getElementById('newConceptRawFileField');
  e1.value = JSON.stringify(oWord, null, 4);
};

const CreateNewCuratedList = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const submitEvent = () => {
    const sEvent = document.getElementById('newConceptEventField').value;
    const oEvent = JSON.parse(sEvent);
    console.log(`oEvent: ${JSON.stringify(oEvent)}`);
    publish(oEvent);
  };

  const createEvent = () => {
    const e1 = document.getElementById('newConceptRawFileField');
    const e2 = document.getElementById('newConceptEventField');

    const sWord = JSON.stringify(JSON.parse(e1.value));
    const aTags = [];
    aTags.push(aTag0);
    aTags.push(aTag1);
    aTags.push(aTag2);
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

  return (
    <>
      <div className="h4">Create New Curated List</div>
      <div
        onChange={() => createListWord()}
        id="allInputFieldsContainer"
        style={{ marginTop: '20px' }}
      >
        <div className="makeNewLeftPanel">name (singular)</div>
        <textarea
          id="newConceptNameSingularField"
          className="makeNewRightPanel"
          placeholder="bitcoin hardware wallet"
        />

        <br />

        <div className="makeNewLeftPanel">name (plural)</div>
        <textarea
          id="newConceptNamePluralField"
          className="makeNewRightPanel"
          placeholder="bitcoin hardware wallets"
        />

        <br />
        <div style={{ display: 'none' }}>
          <div className="makeNewLeftPanel">title (singular)</div>
          <textarea
            id="newConceptTitleSingularField"
            className="makeNewRightPanel"
            style={{ backgroundColor: '#CFCFCF' }}
          />

          <br />

          <div className="makeNewLeftPanel">title (plural)</div>
          <textarea
            id="newConceptTitlePluralField"
            className="makeNewRightPanel"
            style={{ backgroundColor: '#CFCFCF' }}
          />

          <br />

          <div className="makeNewLeftPanel">slug (singular)</div>
          <textarea
            id="newConceptSlugSingularField"
            className="makeNewRightPanel"
            style={{ backgroundColor: '#CFCFCF' }}
          />

          <br />

          <div className="makeNewLeftPanel">slug (plural)</div>
          <textarea
            id="newConceptSlugPluralField"
            className="makeNewRightPanel"
            style={{ backgroundColor: '#CFCFCF' }}
          />
          <br />
        </div>

        <div className="makeNewLeftPanel">description</div>
        <textarea
          id="newConceptDescriptionField"
          className="makeNewRightPanel"
          placeholder="A physical device for storing and managing bitcoin private keys. Examples include Trezor One, Ledger Nano X, or Coldcard Mk4."
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
          id="newConceptRawFileField"
          style={{
            display: 'inline-block',
            height: '400px',
            width: '40%',
            fontSize: '10px',
          }}
        />
        <textarea
          id="newConceptEventField"
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
export default CreateNewCuratedList;