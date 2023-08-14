import { Tooltip } from 'react-tooltip';
import { nip19 } from 'nostr-tools';

const MoreInfoTooltip = ({event}) => {
  const noteID = nip19.noteEncode(event.id);
  const npub = nip19.npubEncode(event.pubkey);
  const copyNoteID = () => {
    navigator.clipboard.writeText(noteID);
    // Alert the copied text
    alert("Copied the text: " + noteID);
  }
  const copyUserNpub = () => {
    navigator.clipboard.writeText(npub);
    // Alert the copied text
    alert("Copied the text: " + npub);
  }
  let tooltipHTML = "<div  ";
  tooltipHTML += " style=color:red;padding:5px;font-size:18px;text-align:center; ";
  tooltipHTML += ' >';
  tooltipHTML += "<div class=tooltipButton id=tooltipButtonA_"+event.id+" >copy note id</div>";
  tooltipHTML += "<div class=tooltipButton id=tooltipButtonB_"+event.id+" >copy user npub</div>";
  tooltipHTML += "</div>";

  const establishListeners = () => {
    const e1 = document.getElementById("tooltipButtonA_"+event.id);
    const e2 = document.getElementById("tooltipButtonB_"+event.id);
    if (e1) {
      e1.onclick = copyNoteID;
    }
    if (e2) {
      e2.onclick = copyUserNpub;
    }
  }
  const anchorSelect="#moreInfoSelector_"+event.id;
  const aId = "moreInfoSelector_"+event.id;
  return (
    <>
      <Tooltip
        anchorSelect={anchorSelect}
        html={tooltipHTML}
        clickable
        className="reactTooltip"
        place="left"
      />
      <a
        id={aId}
        style={{display:'inline-block', fontSize: '22px',height: '100%'}}
        onMouseLeave={establishListeners}
      >
        ⋯
      </a>
    </>
  )
}
export default MoreInfoTooltip;
