import { validateEvent, verifySignature } from 'nostr-tools';
import { isValidObj } from '../pg';

export const doesEventValidate = (event) => {
  let ok = false;
  let veryOk = false;
  if (isValidObj(event)) {
    ok = validateEvent(event);
    veryOk = verifySignature(event);
  }
  if (ok && veryOk) {
    return true;
  }
  return false;
};

export const foo = () => {}
