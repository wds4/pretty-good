import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  addCuratedListEventToSql,
  addInstanceEventToSql,
  addRatingOfCuratedListInstanceEventToSql,
  addEndorsementOfListCuratorEventToSql,
} from 'renderer/window1/lib/pg/sql';
import {
  addCuratedList,
  addCuratedListInstance,
  addRatingOfCuratedListInstance,
  addCuratorEndorsement,
  addThreadedTapestryEvent,
} from 'renderer/window1/redux/features/curatedLists/lists/slice';

const CuratedListsMasterFilter = () => {
  const dispatch = useDispatch();

  const { devMode } = useSelector((state) => state.myNostrProfile.devModes);
  // const devMode = false;

  // set up filter
  const kind0 = 9901; // concept graph
  const kind1 = 39901; // grapevine
  const filter = {
    since: 0,
    kinds: [kind0, kind1],
    // ids: ["f83f2a931c8cc15d536366c9f6065e79425e804309d528cfce552fb11d7b7306"],
    // "#c": ["concept-graph-testnet-901"],
    // "#s": ["nostrCuratedList"],
    // "#t": ["createInstance"],
  };
  const { events } = useNostrEvents({
    filter,
  });

  // METHOD: NEW
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {
      dispatch(addThreadedTapestryEvent(event));
    }
  });
  // METHOD: OLD
  /*
  events.forEach(async (event, item) => {
    if (doesEventValidate(event)) {

      const kind = event.kind;
      let c0 = event.tags.filter(([k, v]) => k === 'c' && v && v !== '')[0];
      let d0 = event.tags.filter(([k, v]) => k === 'd' && v && v !== '')[0];
      let e0 = event.tags.filter(([k, v]) => k === 'e' && v && v !== '')[0];
      let g0 = event.tags.filter(([k, v]) => k === 'g' && v && v !== '')[0];
      let l0 = event.tags.filter(([k, v]) => k === 'l' && v && v !== '')[0];
      let m0 = event.tags.filter(([k, v]) => k === 'm' && v && v !== '')[0];
      let p0 = event.tags.filter(([k, v]) => k === 'p' && v && v !== '')[0];
      let r0 = event.tags.filter(([k, v]) => k === 'r' && v && v !== '')[0];
      let s0 = event.tags.filter(([k, v]) => k === 's' && v && v !== '')[0];
      let t0 = event.tags.filter(([k, v]) => k === 't' && v && v !== '')[0];

      if (c0 && (typeof c0 == "object") && (c0.length > 1)) { c0 = c0[1]; }
      if (d0 && (typeof d0 == "object") && (d0.length > 1)) { d0 = d0[1]; }
      if (e0 && (typeof e0 == "object") && (e0.length > 1)) { e0 = e0[1]; }
      if (g0 && (typeof g0 == "object") && (g0.length > 1)) { g0 = g0[1]; }
      if (l0 && (typeof l0 == "object") && (l0.length > 1)) { l0 = l0[1]; }
      if (m0 && (typeof m0 == "object") && (m0.length > 1)) { m0 = m0[1]; }
      if (p0 && (typeof p0 == "object") && (p0.length > 1)) { p0 = p0[1]; }
      if (r0 && (typeof r0 == "object") && (r0.length > 1)) { r0 = r0[1]; }
      if (s0 && (typeof s0 == "object") && (s0.length > 1)) { s0 = s0[1]; }
      if (t0 && (typeof t0 == "object") && (t0.length > 1)) { t0 = t0[1]; }

      // c0 and g0 will not be needed if 9901, 33901 are reserved for these purposes;
      // but for now at least, c0 and g0 will be used as additional checks that these are
      // following the DCoSL protocol. (Maybe change to z0 == dcosl ???)

      if ( (kind == 9901) && (c0 == "concept-graph-testnet-901") ) {
        console.log("qwerty concept graph testnet")
        // lists
        if ( (t0 == "createInstance") && (s0 == "nostrCuratedList")) {
          dispatch(addCuratedList(event));
          await addCuratedListEventToSql(event);
        }

        // list items
        if (t0 == "createInstance") {
          if (e0 && s0) {
            const parentConceptNostrEventID = e0;
            const parentConceptSlug = s0;
            dispatch(addCuratedListInstance(event));
            await addInstanceEventToSql(
              event,
              parentConceptSlug,
              parentConceptNostrEventID
            );
          }
        }
      }

      if ( (kind == 39901) && (g0 == "grapevine-testnet-901") ) {
        console.log("qwerty grapevine testnet")
        // endorsements of items
        dispatch(addRatingOfCuratedListInstance(event));
        // endorsements of users
        dispatch(addCuratorEndorsement(event));

        if (l0) {
          // console.log("qwerty endorsement of item")
          const parentConceptNostrEventID = l0;
          const oWord = JSON.parse(event.content);
          if (oWord) {
            if (oWord.hasOwnProperty("ratingData")) {
              if (oWord.ratingData.hasOwnProperty("ratingFieldsetData")) {
                // endorsements of items
                if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListInstanceRatingFieldsetData")) {
                  const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                  if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                    addRatingOfCuratedListInstanceEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                  }
                }
                // endorsements of users
                if (oWord.ratingData.ratingFieldsetData.hasOwnProperty("nostrCuratedListsCuratorEndorsementFieldsetData")) {
                  const parentConceptSlug = oWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.contextData.nostrParentCuratedListData.slug.singular;
                  if ( (parentConceptSlug) && (parentConceptNostrEventID) ) {
                    addEndorsementOfListCuratorEventToSql(event,parentConceptSlug,parentConceptNostrEventID);
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  */

  if (devMode) {
    // console.log("qwerty devMode YES; number of events: "+events.length)
    return (
      <>
        <div style={{ textAlign: 'center' }}>CuratedListsMasterFilter</div>
        <div>number of events: {events.length}</div>
        {events.map((event) => {
          if (doesEventValidate(event)) {
            const kind = event.kind;
            let c0 = event.tags.filter(([k, v]) => k === 'c' && v && v !== '')[0];
            let d0 = event.tags.filter(([k, v]) => k === 'd' && v && v !== '')[0];
            let e0 = event.tags.filter(([k, v]) => k === 'e' && v && v !== '')[0];
            let g0 = event.tags.filter(([k, v]) => k === 'g' && v && v !== '')[0];
            let l0 = event.tags.filter(([k, v]) => k === 'l' && v && v !== '')[0];
            let m0 = event.tags.filter(([k, v]) => k === 'm' && v && v !== '')[0];
            let p0 = event.tags.filter(([k, v]) => k === 'p' && v && v !== '')[0];
            let r0 = event.tags.filter(([k, v]) => k === 'r' && v && v !== '')[0];
            let s0 = event.tags.filter(([k, v]) => k === 's' && v && v !== '')[0];
            let t0 = event.tags.filter(([k, v]) => k === 't' && v && v !== '')[0];

            if (c0 && (typeof c0 == "object") && (c0.length > 1)) { c0 = c0[1]; }
            if (d0 && (typeof d0 == "object") && (d0.length > 1)) { d0 = d0[1]; }
            if (e0 && (typeof e0 == "object") && (e0.length > 1)) { e0 = e0[1]; }
            if (g0 && (typeof g0 == "object") && (g0.length > 1)) { g0 = g0[1]; }
            if (l0 && (typeof l0 == "object") && (l0.length > 1)) { l0 = l0[1]; }
            if (m0 && (typeof m0 == "object") && (m0.length > 1)) { m0 = m0[1]; }
            if (p0 && (typeof p0 == "object") && (p0.length > 1)) { p0 = p0[1]; }
            if (r0 && (typeof r0 == "object") && (r0.length > 1)) { r0 = r0[1]; }
            if (s0 && (typeof s0 == "object") && (s0.length > 1)) { s0 = s0[1]; }
            if (t0 && (typeof t0 == "object") && (t0.length > 1)) { t0 = t0[1]; }

            let parentConceptNostrEventID = "none";
            if (e0) {
              parentConceptNostrEventID = e0[1];
            }

            return (
              <>
                <div
                  style={{
                    fontSize: '10px',
                    border: '2px solid purple',
                    padding: '5px',
                    marginBottom: '10px',
                  }}
                >
                  {JSON.stringify(event, null, 4)}
                  <br />
                  <div>kind: {kind}</div>
                  <div>c0: {c0}</div>
                  <div>d0: {d0}</div>
                  <div>e0: {e0}</div>
                  <div>g0: {g0}</div>
                  <div>l0: {l0}</div>
                  <div>m0: {m0}</div>
                  <div>p0: {p0}</div>
                  <div>r0: {r0}</div>
                  <div>s0: {s0}</div>
                  <div>t0: {t0}</div>
                </div>
              </>
            );
          }
          return <></>;
        })}
      </>
    );
  }
  // console.log("qwerty devMode NO; number of events: "+events.length);
  return <></>;


  return (
    <>
      <div>
      {events.map((event) => {
          if (doesEventValidate(event)) {
            if (event.id == "f83f2a931c8cc15d536366c9f6065e79425e804309d528cfce552fb11d7b7306") {
              return (
                <>
                  <div>{JSON.stringify(event,null,4)}</div>
                </>
              )
            }
            return (
              <>
                <div>{event.id}</div>
              </>
            )
          }
        })}
      </div>
    </>
  );


};

export default CuratedListsMasterFilter;
