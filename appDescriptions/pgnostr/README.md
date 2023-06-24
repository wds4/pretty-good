pretty good nostr
=====

Basic [nostr](https://github.com/nostr-protocol/nostr) functionality is currently available. (List of supported [NIPs](https://github.com/nostr-protocol/nips) is coming soon.) Features include:
- create new profiles
- import profiles (do so with caution -- backup your profile first!)
- edit profiles
- manage multiple profiles
- main feed
- following and "firehose" options for the main feed
- post new note
- reply to notes
- find new users by pubkey
- look at user profiles
- send / receive direct messages
- manage relays

Features not available on most other clients:
- See a list of relays used by your follows list, organized by frequency of usage (demonstrates [DIP-01](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/01.md) but not [DIP-02](https://github.com/wds4/DCoSL/blob/main/dips/coreProtocol/02.md), because follow != trust to pick relays)
- easy switch between multiple accounts
- basic keyword search of your follow list

standard features not yet implemented in PGA:
- zaps
- likes, reposts, reactions
- notifications
- mentions (NIP-27)
- probably some other commonly used features
