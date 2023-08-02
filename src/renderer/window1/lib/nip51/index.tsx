import { nip19 } from "nostr-tools";
import { doesEventValidate } from "../nostr/eventValidation";

export const foo = () => {};

export const isValidPublicNip51Event = (event) => {
  /*
  Returns true if event is valid, false if not
  Content field is ignored
  Criteria for validity:
  1. kind 10000, 10001, 30000, or 30001
  2. contains a title tag if item 30000 or 30001 (or pin or mute title?)
  3. contains at least one valid item:
  -- p tag with valid pubkey if item 10000 or 30000
  -- e tag with valid event id if item 10001 or 30001
  4. Exclude chat/...

  // For 30001: from NIP-51: "Any standardized tag can be included in a Categorized Bookmarks List."
  ?? what about a tags or t tags? (or any other tags?)
  */
  if (!doesEventValidate(event)) {
    return false;
  }
  const kind = event?.kind;
  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');
  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  // ? other tag types?

  // ? cycle through above p, e (and a?) tags and check for validity

  if ( (kind != 10000) && (kind != 10001) && (kind != 30000) && (kind != 30001) ) {
    return false;
  }

  // if People or Bookmarks lists have no title then false
  if ( (kind == 30000) || (kind == 30001) ) {
    if (aTags_d.length == 0) {
      return false;
    }
  }

  // if mute or People lists have no valid p tags then false
  if ( (kind == 10000) || (kind == 30000) ) {
    if (aTags_p.length == 0) {
      return false;
    }
    // need to check to make sure pubkeys are all valid (or at least one valid?)
  }

  // if pin lists have no valid e tags then false
  if (kind == 10001) {
    if (aTags_e.length == 0) {
      return false;
    }
    // need to check to make sure event ids are all valid (or at least one valid?)
  }

  // ?if Bookmarks lists have no valid e, t, or a (or other??) tags then false
  if (kind == 30001) {
    if (aTags_e.length + aTags_t.length + aTags_a.length == 0) {
      return false;
    }
    // need to check to make sure event ids are all valid (or at least one valid?)
  }

  // ? need to exclude the ones with chat/...

  // return true if passes all the above tests
  return true;
}
