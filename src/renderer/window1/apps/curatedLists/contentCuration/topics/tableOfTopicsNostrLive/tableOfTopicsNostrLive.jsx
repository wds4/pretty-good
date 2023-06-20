import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addInstanceEventToSql } from 'renderer/window1/lib/pg/sql';
import { doesEventInstanceValidateAgainstEventParent } from 'renderer/window1/lib/conceptGraph';
import Instance from './instance';
import TechDetailsForNostrNerds3 from './techDetailsForNostrNerds3';

const oParentEvent = {
  "wordData": {
      "slug": "nostrTopic",
      "name": "nostr topic",
      "title": "Nostr Topic",
      "version": "testnet-902",
      "wordTypes": ["wordType","jsonSchema"],
      "metaData": {
          "nostr": {
              "stewardPubkey": "c51a542e4f93afe6f45e5bef002f7a0efcc0a47460a736654c0bee5402c482fa",
              "uniqueIDs": {
                  "slug": "nostrTopic",
                  "version": "testnet-902"
              }
          }
      }
  },
  "wordTypeData": {
      "oName": {
          "singular": "nostr topic",
          "plural": "nostr topics"
      },
      "oTitle": {
          "singular": "Nostr Topic",
          "plural": "Nostr Topics"
      },
      "oSlug": {
          "singular": "nostrTopic",
          "plural": "nostrTopics"
      },
      "description": "a list of topics for use in organizing and curating your nostr feed",
      "propertyPath": "nostrTopicData"
  },
  "jsonSchemaData": {
      "description": "This is the JSON Schema used to create and validate object files for the representation of instances of the list of nostr topics",
      "name": "json schema for an item on the list of nostr topics",
      "title": "JSON Schema for an Item on the List of Nostr Topics",
      "$schema": "http://json-schema.org/draft-07/schema",
      "type": "object",
      "required": [
          "nostrTopicData"
      ],
      "definitions": {},
      "properties": {
          "nostrTopicData": {
              "type": "object",
              "name": "nostr topic data",
              "title": "Nostr Topic Data",
              "description": "data about this nostr topic",
              "required": [
                  "name"
              ],
              "definitions": {},
              "properties": {
                  "name": {
                      "type": "string"
                  },
                  "title": {
                      "type": "string"
                  },
                  "slug": {
                      "type": "string"
                  },
                  "description": {
                      "type": "string"
                  }
              }
          }
      }
  }
}

const oParentJsonSchema = oParentEvent.jsonSchemaData;

const AllTopics = () => {
  const kind0 = 9902;
  const parentConceptSlug = "nostrTopic";
  const parentConceptNostrEventID = "ec9af0fa71b2f6c1e3556816ad7c06e6623069c04a6e486fc9312b0273697779";
  const parentConceptPropertyPath = "nostrTopicData";
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["c","concept-graph-testnet-902"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["s","nostrCuratedList"]; // if t = createInstance; s for slug of the parent concept of the instance
  const aTag3 = ["e","nostrCuratedList"]; // if t = createInstance; e for event id of the parent concept of the instance
  // could use s OR e OR both
  */
  const filter = {
    since: 0,
    kinds: [kind0],
    '#c': ['concept-graph-testnet-902'],
    '#t': ['createInstance'],
    '#s': [parentConceptSlug],
    '#e': [parentConceptNostrEventID],
  },
  const { events } = useNostrEvents({
    filter: filter
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h4">All Topics (loading live from nostr)</div>
        <TechDetailsForNostrNerds3 events={events} filter={filter} />
        {events.map((event, index) => {
          if (doesEventValidate(event)) {
            // ALSO NEED TO VALIDATE AGAINST JSON SCHEMA OF LIST
            // if (doesEventInstanceValidateAgainstEventParent(event,oParentJsonSchema)) {
            // Currently that function assumes nostrCuratedListData
            // and does not do true json schema valication.
            // So for now, skip the validation step.
            if (1) {
              addInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
              return (
                <>
                  <Instance parentConceptPropertyPath={parentConceptPropertyPath} event={event} />
                </>
              );
            } else {
              return (
                <>
                  <div>doesEventInstanceValidateAgainstEventParent: no!</div>
                  <div>event:</div>
                  <pre>{JSON.stringify(event,null,4)}</pre>
                  <div>oParentJsonSchema:</div>
                  <pre>{JSON.stringify(oParentJsonSchema,null,4)}</pre>
                </>
              )
            }
          }
        })}
      </div>
    </>
  );
};

export default AllTopics;
