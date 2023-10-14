export const foo = () => {}

export const populateListItemArrays = (event, autoImportNip51, oNaddrLookup, oNip51Lists) => {
  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');

  if (!aTags_a) { aTags_a = []; }
  if (!aTags_e) { aTags_e = []; }
  if (!aTags_p) { aTags_p = []; }
  if (!aTags_t) { aTags_t = []; }

  const aTags__a = [];
  for (let x=0; x < aTags_a.length; x++) {
    const foo = aTags_a[x][1];
    aTags__a.push(foo);
  }
  const aTags__e = [];
  for (let x=0; x < aTags_e.length; x++) {
    const foo = aTags_e[x][1];
    aTags__e.push(foo);
  }
  const aTags__p = [];
  for (let x=0; x < aTags_p.length; x++) {
    const foo = aTags_p[x][1];
    aTags__p.push(foo);
  }
  const aTags__t = [];
  for (let x=0; x < aTags_t.length; x++) {
    const foo = aTags_t[x][1];
    aTags__t.push(foo);
  }

  // console.log("qwerty autoImportNip51: "+autoImportNip51)

  if (!autoImportNip51) {
    return { aTags_a, aTags_e, aTags_p, aTags_t };
  }
  if (autoImportNip51) {
    let continueListImports = true;
    do {
      continueListImports = false;
      // cycle through each entry of aTags_a, extract items, and add them to aTags_a, aTags_e, aTags_p, and aTags_t
      for (let x=0; x<aTags_a.length; x++) {
        const aNextA = aTags_a[x];
        const sNextA = aNextA[1];
        // console.log("qwerty sNextA: "+sNextA);
        const naddrEventID = oNaddrLookup[sNextA];
        // console.log("qwerty naddrEventID: "+naddrEventID);
        if (oNip51Lists[naddrEventID]) {
          const oNaddrEvent = oNip51Lists[naddrEventID].event;
          // console.log("qwerty oNaddrEvent: "+JSON.stringify(oNaddrEvent,null,4));
          const aNaddrImportTags_a = oNaddrEvent.tags.filter(([k, v]) => k === 'a' && v && v !== '');
          const aNaddrImportTags_e = oNaddrEvent.tags.filter(([k, v]) => k === 'e' && v && v !== '');
          const aNaddrImportTags_p = oNaddrEvent.tags.filter(([k, v]) => k === 'p' && v && v !== '');
          const aNaddrImportTags_t = oNaddrEvent.tags.filter(([k, v]) => k === 't' && v && v !== '');

          if (!aNaddrImportTags_a) { aNaddrImportTags_a = []; }
          if (!aNaddrImportTags_e) { aNaddrImportTags_e = []; }
          if (!aNaddrImportTags_p) { aNaddrImportTags_p = []; }
          if (!aNaddrImportTags_t) { aNaddrImportTags_t = []; }

          // now add aNaddrImportTags_x to aTags_x
          for (let z=0;z<aNaddrImportTags_a.length;z++) {
            const aNextItem = aNaddrImportTags_a[z];
            const sNextItem = aNextItem[1];
            if (!aTags__a.includes(sNextItem)) {
              continueListImports = true; // if adding another list, then cycle through this process again
              aTags__a.push(sNextItem);
              aTags_a.push(aNextItem);
            }
          }
          for (let z=0;z<aNaddrImportTags_e.length;z++) {
            const aNextItem = aNaddrImportTags_e[z];
            const sNextItem = aNextItem[1];
            if (!aTags__e.includes(sNextItem)) {
              aTags__e.push(sNextItem);
              aTags_e.push(aNextItem);
            }
          }
          for (let z=0;z<aNaddrImportTags_p.length;z++) {
            const aNextItem = aNaddrImportTags_p[z];
            const sNextItem = aNextItem[1];
            if (!aTags__p.includes(sNextItem)) {
              aTags__p.push(sNextItem);
              aTags_p.push(aNextItem);
            }
          }
          for (let z=0;z<aNaddrImportTags_t.length;z++) {
            const aNextItem = aNaddrImportTags_t[z];
            const sNextItem = aNextItem[1];
            if (!aTags__t.includes(sNextItem)) {
              aTags__t.push(sNextItem);
              aTags_t.push(aNextItem);
            }
          }
        }
      }
    } while ( continueListImports )
    return { aTags_a, aTags_e, aTags_p, aTags_t };
  }
}
