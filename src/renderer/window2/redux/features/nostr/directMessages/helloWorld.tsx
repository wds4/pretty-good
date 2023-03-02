import { useSelector } from 'react-redux';

export default function NostrDirectMessagesHelloWorld() {
  const oDirectMessagesData = useSelector((state) => state.nostrDirectMessages.directMessages);
  const aAuthors = Object.keys(oDirectMessagesData);

  return (
    <div className="reduxStoreOverviewContainer">
      <div className="h4">Nostr Direct Messages store</div>
      <div>
        num authors: <span>{aAuthors.length}</span>
        <div className="storeHelloWorldFullDataContainer"><pre>{JSON.stringify(oDirectMessagesData,null,4)}</pre></div>
      </div>
    </div>
  );
}
