import MiniProfile from '../makeNewList/showSingleItem/miniProfile'; // for items on the list

const ShowPeoplePanel = ({ peoplePanelState, aTags_p }) => {
  if (peoplePanelState == 'open') {
    return (
      <>
        <div>
          {aTags_p.map((oPubkey) => {
            return (
              <>
                <div
                  style={{
                    border: '1px solid grey',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  <MiniProfile pubkey={oPubkey[1]} />
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
  return <></>;
};
export default ShowPeoplePanel;
