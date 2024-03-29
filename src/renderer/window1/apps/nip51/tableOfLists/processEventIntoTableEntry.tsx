import { noProfilePicUrl } from 'renderer/window1/const';
import { nip19 } from 'nostr-tools';
import { useSelector } from 'react-redux';

export const foo = () => {};

export const processEventIntoTableEntry = (event, nostrProfiles) => {
  const { listsByNaddr } = useSelector(
    (state) => state.myNostrProfile.curatedChannelsData
  );
  const aListsByNaddr = Object.keys(listsByNaddr);

  const { pubkey } = event;
  /// // STEP 1 ///// First load default profile info
  let avatarUrl = noProfilePicUrl;
  let name = '';
  let displayName = '';

  /// // STEP 2 ///// If already present in redux store, replace with that
  let profileContent = {};
  if (nostrProfiles.hasOwnProperty(pubkey)) {
    profileContent = JSON.parse(nostrProfiles[pubkey].content);
    name = `@${profileContent.name}`;
    displayName = profileContent.display_name;
    if (profileContent.picture) {
      avatarUrl = profileContent?.picture;
    }
  }

  const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
  let listName = '';
  if (aTags_d.length > 0) {
    listName = aTags_d[0][1];
  }
  if (!listName) { listName = "NO NAME"; }
  const aTags_a = event.tags.filter(([k, v]) => k === 'a' && v && v !== '');
  const aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
  const aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
  const aTags_t = event.tags.filter(([k, v]) => k === 't' && v && v !== '');

  const numItemsDirect = aTags_e.length + aTags_p.length + aTags_t.length;
  const numImportedLists = aTags_a.length;

  const authorFilterText = name + displayName + event.pubkey;

  const oAuthorData = {
    pubkey: event.pubkey,
    avatarUrl,
    name,
    displayName,
    authorFilterText,
  };

  const oListNameData = {
    listName: listName,
    event: event,
  };

  const oTimeData = {
    created_at: parseInt(event.created_at),
  }

  const naddr = nip19.naddrEncode({
    pubkey: event.pubkey,
    kind: event.kind,
    identifier: listName,
    relays: [],
  });

  let isChannel = 'no';
  if (aListsByNaddr.includes(naddr)) {
    isChannel = 'yes';
  }
  const oChannelData = {
    isChannel,
  }

  let kindName = event.kind;
  if (event.kind == 10000) { kindName = 'People (Mute)'; }
  if (event.kind == 10001) { kindName = 'Bookmarks (Pin)'; }
  if (event.kind == 30000) { kindName = 'People'; }
  if (event.kind == 30001) { kindName = 'Bookmarks'; }

  const oNextEntry = {
    foo: "bar",
    listName: oListNameData,
    author: oAuthorData,
    kind: kindName,
    channel: oChannelData,
    curation: 'author',
    items: parseInt(numItemsDirect),
    imports: parseInt(numImportedLists),
    time: oTimeData,
  };

  // reduxNum++;

  return { oNextEntry };
}
