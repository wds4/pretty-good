import { useSelector } from 'react-redux';

export default function NostrNotesHelloWorld() {
  const oNostrNotesData = useSelector((state) => state.nostrNotes.notes);
  const aAuthors = Object.keys(oNostrNotesData);

  return (
    <div className="reduxStoreOverviewContainer" style={{ maxHeight: '400px'}}>
      <div className="h4">Nostr Notes store</div>
      <div>
        num note authors: <span>{aAuthors.length}</span>
        {aAuthors.map((pk)=>{
          const oNotesThisAuthor = oNostrNotesData[pk];
          const aNotesThisAuthor = Object.keys(oNotesThisAuthor)
          return (
            <>
              <div style={{border:'1px dashed grey', marginBottom: '5px' }}>
                <div>pubkey: {pk}</div>
                <div>number of notes: {aNotesThisAuthor.length}</div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  );
}
