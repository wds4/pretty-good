import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  addRatingOfCuratedListInstanceEventToSql,
  addEndorsementOfListCuratorEventToSql,
} from 'renderer/window1/lib/pg/sql';
import {
  addRatingOfCuratedListInstance,
  addCuratorEndorsement,
} from 'renderer/window1/redux/features/curatedLists/lists/slice';

const EndorsementListener = ({pubkey}) => {
  const dispatch = useDispatch();
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  // set up filter
  const kind1 = 39901; // grapevine
  const filter = {
    since: 0,
    kinds: [kind1],
    authors: [myPubkey],
  };
  const { events } = useNostrEvents({
    filter,
  });

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

      if ( (kind == 39901) && (g0 == "grapevine-testnet-901") ) {
        // console.log("qwerty grapevine testnet")
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
  })
  return (
    <>
      <div style={{display:'none'}}>listen for endorsement updates; number of events:</div>
    </>
  )
}
export default EndorsementListener;
