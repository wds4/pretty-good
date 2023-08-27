const ShowTagsPanel = ({ tagsPanelState, aTags_t }) => {
  if (tagsPanelState == 'open') {
    return (
      <>
        <div>
          {aTags_t.map((oTag) => {
            const tag = oTag[1];
            return (
              <>
                <div
                  style={{
                    fontSize: '26px',
                    padding: '5px',
                    border: '1px solid grey',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  {tag}
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
export default ShowTagsPanel;
