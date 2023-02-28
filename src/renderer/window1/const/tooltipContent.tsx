let followRelaysButtonContent = '';
followRelaysButtonContent += 'Follow Relays:';
followRelaysButtonContent += '<br/>This button will allow you to add the relays from this profile to your relays list.';
followRelaysButtonContent += '<br/>Relays are either added automatically or will await manual confirmation on the nostr relays settings page.';
followRelaysButtonContent += '<br/>You can follow relays from as many profiles as you would like.';
followRelaysButtonContent += '<br/>This setting is not published to your nostr profile.';

let endorseAsRelaysPickerButtonContent = '';
endorseAsRelaysPickerButtonContent += 'Endorse as Relays Picker';

let endorseAsRelaysPickerHunterButtonContent = '';
endorseAsRelaysPickerHunterButtonContent += 'Endorse as Relays Picker Hunter';
endorseAsRelaysPickerHunterButtonContent += '<br/>This is transitive.';

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
};


