import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';
import { convertNameToSlug } from 'renderer/window1/lib/conceptGraph';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import TechDetailsForNostrNerds1 from "./techDetailsForNostrNerds1";
import TechDetailsForNostrNerds2 from "./techDetailsForNostrNerds2";
import { timeout } from "renderer/window1/lib/pg";

/*
NOTE: I probably trigger createEvent too many times
And probably don't need to make it async
But I had encountered a problem where when updated the event and then went to createPublish,
I pulled the previous event, not the updated one. As if the hook update were slow? Or it
just pulled the previous hook. Got around this by throwing oEvent into the DOM and then retrieving
it from there. Inelegant, but works.
*/

const returnRelationshipWord = (sel1Id,sel2Id,myPk) => {
  const myPk6 = myPk.substr(-6);
  const e1 = document.getElementById(sel1Id);
  const e2 = document.getElementById(sel2Id);

  const rT_slug = "isASubcategoryOf";
  const rT_name = "is a subcategory of";
  const rT_eventId = "907d13f442bdae9c6b12aa27e8d424bdf009dc2e8785a6eee915297a4fd7c849";
  const rT_eventId6 = rT_eventId.substr(-6);

  let nF_slug = null;
  let nF_name = null;
  let nF_eventId = "abc123";
  let nT_slug = null;
  let nT_name = null;
  let nT_eventId = "abc123";
  if (e1) {
    // oRelationship.relationshipData.nodeFrom.slug = e1.selectedOptions[0].dataset.slug;
    // oRelationship.relationshipData.nodeFrom.id = e1.selectedOptions[0].dataset.eventid;
    nF_slug = e1.selectedOptions[0].dataset.slug;
    nF_name = e1.selectedOptions[0].dataset.name;
    nF_eventId = e1.selectedOptions[0].dataset.eventid;
  }
  if (e2) {
    // oRelationship.relationshipData.nodeTo.slug = e2.selectedOptions[0].dataset.slug;
    // oRelationship.relationshipData.nodeTo.id = e2.selectedOptions[0].dataset.eventid;
    nT_slug = e2.selectedOptions[0].dataset.slug;
    nT_name = e2.selectedOptions[0].dataset.name;
    nT_eventId = e2.selectedOptions[0].dataset.eventid;
  }
  const nF_eventId6 = nF_eventId.substr(-6);
  const nT_eventId6 = nT_eventId.substr(-6);

  const wordSlug = "relationship_"+ nF_slug + "-" + nF_eventId6 + "_" + rT_slug + "-" + rT_eventId6 + "_" + nT_slug + "-" + nT_eventId6 + "_" + myPk6;

  const relSummary = nF_name + " " + rT_name + " " + nT_slug;

  const oRelationship = {
    wordData: {
      slug: wordSlug,
      wordTypes: ["relationship"],
    },
    relationshipData: {
      summary: relSummary,
      nodeFrom: {
        slug: nF_slug,
        id: nF_eventId,
      },
      relationshipType: {
        slug: rT_slug,
        name: rT_name,
        id: rT_eventId,
        stewardPubkey: "e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f",
        version: "sandbox"
      },
      nodeTo: {
        slug: nT_slug,
        id: nT_eventId,
      },
    }
  };

  return oRelationship;
}

const Topic1Selector = ({oNostrNodesByEventID, oNostrTopics, selectorId}) => {
  const aNostrTopics = Object.keys(oNostrTopics);
  return (
    <>
      <div>
        <select id={selectorId}>
          <option
            data-slug=""
            data-name=""
            data-eventid=""
          ></option>
          {aNostrTopics.map((nostrTopicWordSlug)=>{
            const oNostrTopic = oNostrTopics[nostrTopicWordSlug];
            const event_id = oNostrTopic.versionIndependent;
            const oWord = oNostrNodesByEventID[event_id].word;
            let nostrTopicSlug = "";
            let nostrTopicName = "";
            if (oWord.hasOwnProperty("nostrTopicData")) {
              nostrTopicSlug = oWord.nostrTopicData.slug;
              nostrTopicName = oWord.nostrTopicData.name;
            }
            return (
              <>
                <option
                  data-slug={nostrTopicSlug}
                  data-name={nostrTopicName}
                  data-eventid={event_id}
                >{nostrTopicName}</option>
              </>
            )
          })}
        </select>
      </div>
    </>
  )
}
const CreateARelationship = () => {
  const [oRel, setORel] = useState({});
  const [oEvent, setOEvent] = useState({});

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const myPk = getPublicKey(myPrivkey);
  const myPk6 = myPk.substr(-6);

  const { publish } = useNostr();

  const submitEvent = async () => {
    const foo1 = await createEvent();
    const foo2 = await timeout(200);

    const e1 = document.getElementById("oEventStored")
    const oEventStored = JSON.parse(e1.innerHTML);

    const e2 = document.getElementById("oRelStored")
    const oRelStored = JSON.parse(e2.innerHTML);

    const e = document.getElementById("successMessageBox")
    let nF_slug = "";
    let nT_slug = "";
    if (oRelStored.relationshipData) {
      nF_slug = oRelStored.relationshipData.nodeFrom.slug;
      nT_slug = oRelStored.relationshipData.nodeTo.slug;
    }
    let successMessage = "";
    let okToPublish = false;

    if (doesEventValidate(oEventStored)) {
      successMessage = "<div style='border:1px solid grey;padding:10px;display:inline-block;text-align:center;' >";
      successMessage += "<div>You have successfully submitted the message:</div><br/>";
      successMessage += "<div style=color:red; >"+oRelStored.relationshipData.summary+"</div><br/>";
      successMessage += "<div>to the network.</div>"
      successMessage += "</div>";
      okToPublish = true;
    } else {
      successMessage = "message send failure: nostr event is invalid \n";
      okToPublish = false;
    }
    if ((!nF_slug) || (!nT_slug)) {
      successMessage = "message send failure: relationship is invalid \n";
      okToPublish = false;
    }
    if (e) {
      e.innerHTML = successMessage;
    }
    console.log(`qwerty oRelStored: ${JSON.stringify(oRelStored, null,4)} oEventStored: ${JSON.stringify(oEventStored, null,4)} okToPublish: ${okToPublish}`);
    if (okToPublish) {
      publish(oEventStored);
    }
  };

  const createEvent = async () => {
    // const e2 = document.getElementById('newRelationshipEventField');
    // const myPk = getPublicKey(myPrivkey);
    // const myPk6 = myPk.substr(-6);
    /*

    const nF_slug = oRel.relationshipData.nodeFrom.slug;
    const nF_eventId = oRel.relationshipData.nodeFrom.id;
    const nF_eventId6 = nF_eventId.substr(-6);

    const rT_slug = oRel.relationshipData.relationshipType.slug;
    const rT_eventId = oRel.relationshipData.relationshipType.id;
    const rT_eventId6 = rT_eventId.substr(-6);

    const nT_slug = oRel.relationshipData.nodeTo.slug;
    const nT_eventId = oRel.relationshipData.nodeTo.id;
    const nT_eventId6 = nT_eventId.substr(-6);
    */
    const parentConceptSlug = "relationship";
    const parentConceptNostrID = "6a7794b2b1d1cb33c05473fe2a52f4460eec63311e851e3c3fa8e787ca7d88fb";
    // const wordSlug = "relationship_"+ nF_slug + "-" + nF_eventId6 + "_" + rT_slug + "-" + rT_eventId6 + "_" + nT_slug + "-" + nT_eventId6 + "_" + myPk6;

    const sel1Id = "topic1Selector";
    const sel2Id = "topic2Selector";
    const oWord = returnRelationshipWord(sel1Id, sel2Id, myPk6);

    const wordSlug = oWord.wordData.slug;

    const kind0 = 9902;
    const aTag0 = ['c', 'concept-graph-testnet-902'];
    const aTag1 = ['t', 'createInstance']; // t for type of concept graph event
    const aTag2 = ['e', parentConceptNostrID]; // if t = createInstance; e for parent concept of the instance (e for the nostr event id of the parent concept)
    const aTag3 = ['s', parentConceptSlug]; // if t = createInstance; s for parent concept of the instance (s for slug of the parent concept)
    const aTag4 = ['w', wordSlug];

    const aTags = [];
    aTags.push(aTag0);
    aTags.push(aTag1);
    aTags.push(aTag2);
    aTags.push(aTag3);
    aTags.push(aTag4);

    const event: NostrEvent = {
      content: JSON.stringify(oWord),
      kind: kind0,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: myPk
    };

    console.log("event: "+JSON.stringify(event,null,4));
    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    setOEvent(event);

    return true;

    // e2.value = JSON.stringify(event, null, 4);
  }

  const oNostrNodesByEventID = useSelector((state) => state.channels.conceptGraph.nodes.byEventID);
  const oNostrTopics = useSelector((state) => state.channels.conceptGraph.nodes.byWordType.nostrTopic);

  const sel1Id = "topic1Selector";
  const sel2Id = "topic2Selector";

  const createWordCreateEventSubmitEvent = async () => {
    const oRelationship = returnRelationshipWord(sel1Id,sel2Id,myPk);
    setORel(oRelationship);
    const foo1 = await createEvent();
    submitEvent();
  }

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode) {
    devElemClass = 'devElemShow';
  }

  return (
    <>
      <div className="contentCreationWholePage">
        <div className="h3">Create New Topic Relationship</div>
        <div
          onChange={()=>{
            const oRelationship = returnRelationshipWord(sel1Id,sel2Id,myPk);
            setORel(oRelationship)
            createEvent();
          }}
        >
          <div className="h4">Organize into categories</div>

          <div style={{display: 'inline-block'}}
          >
            <Topic1Selector
              oNostrNodesByEventID={oNostrNodesByEventID}
              oNostrTopics={oNostrTopics}
              selectorId={sel1Id}
            />
          </div>

          <div style={{display: 'inline-block', marginLeft: '10px'}}>is a subcategory of</div>

          <div style={{display: 'inline-block', marginLeft: '10px'}}>
            <Topic1Selector
              oNostrNodesByEventID={oNostrNodesByEventID}
              oNostrTopics={oNostrTopics}
              selectorId={sel2Id}
            />
          </div>

          <br />

          <div className={devElemClass}>
            <button
              type="button"
              onClick={()=>{
                const oRelationship = returnRelationshipWord(sel1Id,sel2Id,myPk);
                setORel(oRelationship)
                createEvent();
              }}
            >
              create word
            </button>

            <button
              type="button"
              onClick={() => createEvent()}
            >
              create event (microtask only)
            </button>

            <button
              type="button"
              onClick={() => submitEvent()}
            >
              submit (microtask only)
            </button>
          </div>

          <button
            type="button"
            onClick={() => createWordCreateEventSubmitEvent()}
          >
            submit
          </button>
        </div>

        <div id="successMessageBox" style={{textAlign: 'center'}}></div>
        <div style={{display:'none'}} id="oRelStored">{JSON.stringify(oRel,null,4)}</div>
        <div style={{display:'none'}} id="oEventStored">{JSON.stringify(oEvent,null,4)}</div>
        <TechDetailsForNostrNerds1 oWord={oRel} />
        <TechDetailsForNostrNerds2 oEvent={oEvent} />
      </div>
    </>
  )
}

export default CreateARelationship;
