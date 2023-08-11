import ShowSingleItem from '../showSingleItem';

const ShowItemsPanel = ({ removeSingleItem, aItems, newListKind }) => {
  if (aItems.length == 0) {
    return <></>;
  }
  let items = 'items';
  if (aItems.length == 1) {
    items = 'item';
  }
  const showDeleteButton = true;
  return (
    <>
      <div
        id="listItemsContainer"
        style={{ borderTop: '2px solid black', paddingTop: '10px' }}
      >
        <div
          style={{
            fontSize: '22px',
            textAlign: 'left',
            marginBottom: '10px',
          }}
        >
          {aItems.length} {items}:
        </div>
        {aItems.map((item, itemNumber) => {
          return (
            <>
              <ShowSingleItem
                removeSingleItem={removeSingleItem}
                itemNumber={itemNumber}
                item={item}
                kind={newListKind}
                showDeleteButton={showDeleteButton}
              />
            </>
          );
        })}
      </div>
    </>
  );
};
export default ShowItemsPanel;
