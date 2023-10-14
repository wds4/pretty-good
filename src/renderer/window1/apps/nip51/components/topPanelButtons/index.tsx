import Nip51Listener from './nip51Listener';

const TopPanelButtons = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          border: '1px solid purple',
          borderRadius: '3px',
          margin: '2px',
          padding: '5px',
          color: 'white',
          backgroundColor: 'black',
        }}
      >
        <div style={{ flex: 1, minWidth: '100px', textAlign: 'center' }}>
          <Nip51Listener />
        </div>

      </div>
    </>
  )
}
export default TopPanelButtons;

