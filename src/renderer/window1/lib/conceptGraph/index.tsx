
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';

// This validation is specifically when parent has propertyPath: nosrCuratedListData
// FUTURE: make more generic version of this function; may need to pass parent propertyPath in as a parameter?
// ALSO CHECKS that the events are valid nostr events
export const doesEventInstanceValidateAgainstEventParent = (oChildEvent, oParentEvent) => {

  try {
    if (!doesEventValidate(oChildEvent)) {
      // console.log("doesEventInstanceValidateAgainstEventParent FALSE_A; oParentEvent: ")
      return false;
    }
    if (!doesEventValidate(oParentEvent)) {
      // console.log("doesEventInstanceValidateAgainstEventParent FALSE_B; oParentEvent: ")
      return false;
    }
    const childContent = oChildEvent.content;
    const parentContent = oParentEvent.content;
    const oChild = JSON.parse(childContent);
    const oParent = JSON.parse(parentContent);
    const propertyPath = oParent.nostrCuratedListData.propertyPath;
    // For now, this is the only check!
    // Future: fully validate JSON Schema
    // console.log("doesEventInstanceValidateAgainstEventParent_oChild: "+JSON.stringify(oParent))
    if (oChild.hasOwnProperty(propertyPath)) {
      // console.log("doesEventInstanceValidateAgainstEventParent TRUE_A; oParentEvent: ")
      return true;
    }
    // console.log("doesEventInstanceValidateAgainstEventParent FALSE_Z; oParentEvent: ")
    return false;
  } catch (e) {
    // console.log("doesEventInstanceValidateAgainstEventParent FALSE_C; oParentEvent: ")
    return false;
  }
  // console.log("doesEventInstanceValidateAgainstEventParent FALSE_D; oParentEvent: ")
  return false;
}

export const convertNameToPropertyPath = (name) => {
  var slug = name;
  if (name) {
    var slug = '';
    const aChunks = name.split(' ');
    for (let c = 0; c < aChunks.length; c++) {
      let nextChunk = aChunks[c];
      if (nextChunk) {
        if (c > 0) {
          nextChunk = nextChunk[0].toUpperCase() + nextChunk.substring(1);
        }
        slug += nextChunk;
      }
    }
  }
  return slug + "Data";
};

export const convertNameToSlug = (name) => {
  var slug = name;
  if (name) {
    var slug = '';
    const aChunks = name.split(' ');
    for (let c = 0; c < aChunks.length; c++) {
      let nextChunk = aChunks[c];
      if (nextChunk) {
        if (c > 0) {
          nextChunk = nextChunk[0].toUpperCase() + nextChunk.substring(1);
        }
        slug += nextChunk;
      }
    }
  }
  return slug;
};

export const convertNameToTitle = (name) => {
  var title = name;
  if (name) {
    var title = '';
    const aChunks = name.split(' ');
    for (let c = 0; c < aChunks.length; c++) {
      let nextChunk = aChunks[c];
      if (nextChunk) {
        nextChunk = nextChunk[0].toUpperCase() + nextChunk.substring(1);
        title += nextChunk;
        if (c < aChunks.length - 1) {
          title += ' ';
        }
      }
    }
  }
  return title;
};
