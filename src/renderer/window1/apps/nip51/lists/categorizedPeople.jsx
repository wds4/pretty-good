import { useNostrEvents } from 'nostr-react';

const CategorizedPeople = () => {
  const filter = {
    kinds: [30000],
    since: 0
  };
  const { events } = useNostrEvents({
    filter,
  });

  return (
    <>
      <div>CategorizedPeople; number of events: {events.length}</div>
    </>
  )
};

export default CategorizedPeople;
