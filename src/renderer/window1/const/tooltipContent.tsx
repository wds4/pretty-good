let followRelaysButtonContent = '';
followRelaysButtonContent += 'Follow Relays:';
followRelaysButtonContent += '<br/><br/>This button adds relays from this profile to your recommended relays list.';
followRelaysButtonContent += '<br/>If desired, recommended relays will be added automatically to your active relays list.';
followRelaysButtonContent += '<br/>Alternatively, you can review the recommended list and add them by hand individually.';
followRelaysButtonContent += '<br/>See nostr relays settings page.';
followRelaysButtonContent += '<br/>You can follow relays from as many profiles as you would like.';
followRelaysButtonContent += '<br/>This setting is not published to your nostr profile.';

let endorseAsRelaysPickerButtonContent = '';
endorseAsRelaysPickerButtonContent += 'Endorse this Relays List';
endorseAsRelaysPickerButtonContent += '<br/>Check if you trust this user to select profiles to feed into you Recommended Relays list.';
endorseAsRelaysPickerButtonContent += `<br/>'I trust this person to select relays.'`;
endorseAsRelaysPickerButtonContent += '<br/>This is NOT transitive.';

let endorseAsRelaysPickerHunterButtonContent = '';
endorseAsRelaysPickerHunterButtonContent += 'Endorse as Relays Picker Hunter';
endorseAsRelaysPickerHunterButtonContent += '<br/>Check if you trust this user to designate other user profiles as Recommended Relays Selector.';
endorseAsRelaysPickerHunterButtonContent += `<br/>'I trust this person (profile) to select other profiles.'`;
endorseAsRelaysPickerHunterButtonContent += '<br/>This is transitive.';

let mergeRelayAutoUpdateRecsContent = '';
mergeRelayAutoUpdateRecsContent += 'merge recommended relays with my official nostr relays list as broadcast to the network.';
mergeRelayAutoUpdateRecsContent += '<br/>(If no, then just listen to relays without broadcasting them.)';

let listsContent = {};
listsContent.kind10000 = "Mute Lists: NIP-51 kind 10000";
listsContent.kind10000 += "<br/><br/>Each item on a Mute list is a person (a nostr pubkey).";
listsContent.kind10001 = "Pin Lists: NIP-51 kind 10001";
listsContent.kind10001 += "<br/><br/>Each item on a Pin list is a nostr note.";
listsContent.kind30000 = "People Lists: NIP-51 kind 30000";
listsContent.kind30000 += "<br/><br/>Each item on a People list is a person (a nostr pubkey).";
listsContent.kind30000 += "<br/><br/>People lists can be used to generate a content feed,";
listsContent.kind30000 += "<br/>similar to a follows list.";
listsContent.kind30001 = "Bookmark Lists: NIP-51 kind 30001";
listsContent.kind30001 += "<br/><br/>Each item on a Bookmark list is a nostr note.";
listsContent.kind30001 += "<br/><br/>Items from other lists can also be imported.";
listsContent.kind30001 += "<br/>Imported lists are identified by the list name + author";
listsContent.kind30001 += "<br/>(naddr) of the imported list.";
listsContent.dcosl = "DCoSL: experimental protocol";
listsContent.dcosl += "<br/><br/>You can use DCoSL to delegate list curation to your web of trust.";
listsContent.channels = "Channels (experimental)";
listsContent.channels += "<br/><br/>Channels allows you to create a nostr content feed from a list of People.";

export const tooltipContent = {
  sampleContent: 'Hello World!',
  purpose: 'Purpose:<br />What will these ratings be used for?',
  context: 'category',
  grapevineIcon: 'The Grapvine has been activated!',
  worship:
    'a.k.a. Global Trust<br />Do you trust (or mistrust) this user in all things and for all purposes?',
  attention:
    'Attention:<br />How much influence should this user have over things like your nostr content feed?',
  believe:
    'Believe:<br />How much influence should this user have over things like poll results or statements of fact?',
  ontology:
    'Ontology<br />How much influence should this user have over things like: categorizations of contexts, definitions of words, data structures and schemas, and other social constructs?',
  advice:
    'Judgement:<br />How much do you trust this user s advice or judgement over things like which nostr relays to trust?',
  manageNostrRelays:
    'Manage Nostr Relays:<br/>How much influence should this user have over which nostr relays to use for various purposes?',
  followRelaysButton: followRelaysButtonContent,
  endorseAsRelaysPickerButton: endorseAsRelaysPickerButtonContent,
  endorseAsRelaysPickerHunterButton: endorseAsRelaysPickerHunterButtonContent,
  relaysSettingsMyRelays: 'The list of relays associated with my nostr profile, as broadcast to the network.',
  relaysAutoUpdateButton: 'add relays automatically or manually',
  mergeRelayAutoUpdateRecs: mergeRelayAutoUpdateRecsContent,
  attenuationFactor: 'adjust how much influence attenuates with each hop away from the seed user',
  seedUser: 'seed user (a.k.a. anchor user): the root (center) of the grapevine. The seed user influence is fixed at 1 by definition.',
  contextSelector: 'choose a context',
  scoreSelector: 'which score to view in the graph',
  purposeSelector: 'To what purpose will these ratings and score calculations be put?',
  testnetSelector: 'Currently only testnet is available.',
  lists: listsContent,
};

