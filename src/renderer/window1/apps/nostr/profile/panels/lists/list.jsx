import { useNostrEvents } from 'nostr-react';
import { secsToTime } from 'renderer/window1/lib/pg';
import TechDetailsForNostrNerds from './techDetailsForNostrNerds';
import MiniProfile from './miniProfile';

const List = ({event}) => {
  const displayTime = secsToTime(event.created_at);
  let title = "-- unknown --";
  let itemType = "-- foo -- ";
  let itemNumber = 0;
  // categorized people
  let aTags_p = [];
  if (event.kind == 30000) {
    aTags_p = event.tags.filter(([k, v]) => k === 'p' && v && v !== '');
    const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
    if (aTags_d.length > 0) {
      title = aTags_d[0][1];
    }
    itemType = "people";
    itemNumber = aTags_p.length;
  }
  // categorized events
  let aTags_e = [];
  if (event.kind == 30001) {
    aTags_e = event.tags.filter(([k, v]) => k === 'e' && v && v !== '');
    const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
    if (aTags_d.length > 0) {
      title = aTags_d[0][1];
    }
    itemType = "items";
    itemNumber = aTags_e.length;
  }
  const elem_id = "listItemsContainer_"+event.id;
  const button_id = "toggleButton_"+event.id;
  const elem = document.getElementById(elem_id)
  const elem_button = document.getElementById(button_id)

  const toggleList = (e) => {
    const currentState = elem.style.display;
    console.log("currentState: "+currentState)
    if (currentState == 'none') {
      elem.style.display = 'block';
      elem_button.innerHTML = "-"
    }
    if (currentState == 'block') {
      elem.style.display = 'none';
      elem_button.innerHTML = "+"
    }
  };

  return (
    <>
      <div style={{border:"1px solid black",borderRadius:"5px",padding:"5px",margin:"5px"}}>
        <div className="listsGroupTitleContainer">
          <button
            type="button"
            id={button_id}
            className="listsGroupToggleButton"
            data-liststype="kind30000"
            onClick={(e) => toggleList(e)}
          >
            +
          </button>
          <span>{title}</span>
          <div className="numItemsNip51OuterContainer">
            <span style={{color:"grey",marginRight:"20px"}}>{displayTime}</span>
            <div style={{display:"inline-block", width:"100px",marginRight:"20px",textAlign:"right"}}>
              <span className="numItemsNip51Container"  id="numItems_muteList">{itemNumber}</span>
              {itemType}
            </div>
          </div>
        </div>
        <div id={elem_id} className="listsContainer" style={{display:"none"}}>
          {aTags_p.map((a)=>{
            const pk = a[1];
            return (
              <>
                <MiniProfile pubkey={pk} />
              </>
            )
          })}
          {aTags_e.map((a)=>{
            const event_id = a[1];
            return (
              <>
                <div>event_id: {event_id}</div>
                <div>{JSON.stringify(event,null,4)}</div>
              </>
            )
          })}
        </div>
        <TechDetailsForNostrNerds event={event} />
      </div>
    </>
  )
};

export default List;
