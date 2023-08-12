import { useNostrEvents } from 'nostr-react';
import Post from './post';
import MiniProfile from './miniProfile';

const ShowSingleProfile = ({ item }) => {
  const thisItemType = item[1];
  let pubkey = '';
  if (thisItemType == 'npub') {
    pubkey = item[2];
  }
  if (thisItemType == 'nprofile') {
    pubkey = JSON.parse(item[2]).pubkey;
  }
  return (
    <>
      <MiniProfile pubkey={pubkey} />
    </>
  );
};

const ShowSingleNote = ({ item }) => {
  const thisItemType = item[1];
  let id = 'foo';
  if (item[2]) {
    if (thisItemType == 'nevent') {
      id = JSON.parse(item[2]).id;
    }
    if (thisItemType == 'note') {
      id = item[2];
    }
  }
  const filter = {
    ids: [id],
  };
  const { events } = useNostrEvents({
    filter,
  });
  if (events.length == 1) {
    return (
      <>
        <Post event={events[0]} />
      </>
    );
  }
  return <></>;
};

const DeleteButton = ({ removeSingleItem, itemNumber, showDeleteButton }) => {
  if (!showDeleteButton) {
    return <></>;
  }
  const deleteThisItem = () => {
    removeSingleItem(itemNumber);
  };
  return (
    <>
      <div style={{ flexGrow: '1' }}>
        <button
          type="button"
          className="nip51Button"
          style={{
            border: '1px solid red',
            borderRadius: '5px',
            width: '50px',
            height: '50px',
            fontSize: '26px',
          }}
          onClick={deleteThisItem}
        >
          ❌
        </button>
      </div>
    </>
  );
};

const PlainTextItem = ({item, removeSingleItem, itemNumber, showDeleteButton}) => {
  const itemText = item[0];
  if (!itemText) {
    return <></>;
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            border: '1px solid grey',
            borderRadius: '5px',
            fontSize: '22px',
            padding: '10px',
            textAlign: 'left',
            flexGrow: '999',
          }}
        >
          {itemText}
        </div>
        <DeleteButton
          removeSingleItem={removeSingleItem}
          itemNumber={itemNumber}
          showDeleteButton={showDeleteButton}
        />
      </div>
    </>
  );
}

/*
const DeleteButtonContainer = ({
  removeSingleItem,
  itemNumber,
  showDeleteButton,
}) => {
  if (!showDeleteButton) { return <></> }
  if (showDeleteButton) {
    return (
      <>
        <div style={{ flexGrow: '1' }}>
          <DeleteButton
            removeSingleItem={removeSingleItem}
            itemNumber={itemNumber}
            showDeleteButton={showDeleteButton}
          />
        </div>
      </>
    )
  }
}
*/

const SingleNoteItem = ({item, kind, removeSingleItem, itemNumber, showDeleteButton}) => {
  if (!showDeleteButton) {
    return (
      <>
        <div style={{marginBottom: '10px'}}>
          <ShowSingleNote item={item} kind={kind} />
        </div>
      </>
    )
  }
  if (showDeleteButton) {
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <div style={{ width: 'calc(100% - 200px)', flexGrow: '999' }}>
            <ShowSingleNote item={item} kind={kind} />
          </div>
          <div style={{ flexGrow: '1' }}>
            <DeleteButton
              removeSingleItem={removeSingleItem}
              itemNumber={itemNumber}
              showDeleteButton={showDeleteButton}
            />
          </div>
        </div>
      </>
    );
  }
}

const SingleProfileItem = ({item, kind, removeSingleItem, itemNumber, showDeleteButton}) => {
  if (!showDeleteButton) {
    return (
      <>
        <div style={{marginBottom: '10px'}}>
          <ShowSingleProfile item={item} kind={kind} />
        </div>
      </>
    )
  }
  if (showDeleteButton) {
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <div style={{ flexGrow: '999' }}>
            <ShowSingleProfile item={item} kind={kind} />
          </div>
          <div style={{ flexGrow: '1' }}>
            <DeleteButton
              removeSingleItem={removeSingleItem}
              itemNumber={itemNumber}
              showDeleteButton={showDeleteButton}
            />
          </div>
        </div>
      </>
    );
  }
}

const ListAuthor = ({
  isNewItemValid,
  isNewItemAlreadyOnList,
  existingListAuthorPubkey,
}) => {
  if (isNewItemValid=="no") return ( <></> )
  if (isNewItemAlreadyOnList=="yes") return ( <></> )
  return (
    <>
      <MiniProfile pubkey={existingListAuthorPubkey} />
    </>
  )
}

const AnotherListItem = ({
  existingListRetrievalMethod,
  existingListName,
  isNewItemValid,
  isNewItemAlreadyOnList,
  existingListAuthorPubkey,
  removeSingleItem,
  itemNumber,
  showDeleteButton,
}) => {
  if (existingListRetrievalMethod=="") return <></>;
  if (existingListRetrievalMethod=="authorAndListName") {

  }
  if (existingListRetrievalMethod=="nip51identifier") {

  }
  let listName="";
  if (existingListName) {
    listName = existingListName;
  }
  return (
    <>
      <div style={{textAlign: 'left', padding: '3px'}}>
        import all items from this list:
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '10px',
        }}
      >

        <div style={{ flexGrow: '999' }}>
          <div
            style={{
              textAlign: 'left',
              border: '1px solid grey',
              borderRadius: '5px',
              height: '50px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: '50%',
                height: '100%',
                fontSize: '26px',
                padding: '5px',
              }}
            >
              {listName}
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '50%',
                height: '100%',
                fontSize: '26px',
                color: 'grey',
              }}
            >
              <ListAuthor
                isNewItemValid={isNewItemValid}
                isNewItemAlreadyOnList={isNewItemAlreadyOnList}
                existingListAuthorPubkey={existingListAuthorPubkey}
              />
            </div>
          </div>
        </div>
        <div style={{ flexGrow: '1' }}>
          <DeleteButton
            removeSingleItem={removeSingleItem}
            itemNumber={itemNumber}
            showDeleteButton={showDeleteButton}
          />
        </div>
      </div>
    </>
  )
}

const ShowSingleItem = ({
  isNewItemAlreadyOnList,
  removeSingleItem,
  itemNumber,
  item,
  kind,
  showDeleteButton,
  newItemGroup,
  existingListRetrievalMethod,
  existingListName,
  isNewItemValid,
  existingListAuthorPubkey,
}) => {
  if (isNewItemAlreadyOnList == 'yes') {
    return <></>;
  }

  if (item == '') {
    return <></>;
  }
  if (!item) {
    return <></>;
  }

  const thisItemType = item[1];

  if (thisItemType=="anotherList") {
    return (
      <>
        <AnotherListItem
          existingListRetrievalMethod={existingListRetrievalMethod}
          existingListName={item[2]}
          isNewItemValid={isNewItemValid}
          isNewItemAlreadyOnList={isNewItemAlreadyOnList}
          existingListAuthorPubkey={item[3]}
          removeSingleItem={removeSingleItem}
          itemNumber={itemNumber}
          showDeleteButton={showDeleteButton}
        />
      </>
    )
  }

  if (thisItemType == 'naddr') {
    return (
      <>
        <div>naddr: point to a preexisting list</div>
      </>
    )
  }

  if (thisItemType == 'plainText') {
    return (
      <>
        <PlainTextItem
          item={item}
          removeSingleItem={removeSingleItem}
          itemNumber={itemNumber}
          showDeleteButton={showDeleteButton}
        />
      </>
    )
  }

  // if thisItemType != plainText, then it should be: npub, nprofile, nevent, or note
  // if (kind == 10000 || kind == 30000) {
  if (thisItemType == 'npub' || thisItemType == 'nprofile') {
    return (
      <>
        <SingleProfileItem
          item={item}
          kind={kind}
          removeSingleItem={removeSingleItem}
          itemNumber={itemNumber}
          showDeleteButton={showDeleteButton}
        />
      </>
    )
  }
  // if (kind == 10001 || kind == 30001) {
  if (thisItemType == 'nevent' || thisItemType == 'note') {
    return (
      <>
        <SingleNoteItem
          item={item}
          kind={kind}
          removeSingleItem={removeSingleItem}
          itemNumber={itemNumber}
          showDeleteButton={showDeleteButton}
        />
      </>
    )
  }
  return (
    <>
      <div>
        <div>newItemGroup: {newItemGroup}</div>
        error
      </div>
    </>
  );
};

export default ShowSingleItem;
