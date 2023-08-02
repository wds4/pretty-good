import {
  nip19,
} from 'nostr-tools';

const NewItemIdentifier = ({setIsItemValid_yes, setIsItemValid_no, newListKind}) => {
  let placeholderText = "NIP-19 identifier for an event: nevent, note";
  if ((newListKind == 10000) || (newListKind == 30000)) {
    placeholderText = "NIP-19 identifier for a person: npub, nprofile";
  }
  const determineNip19IdentifierType = () => {
    const e = document.getElementById("listItemTextarea");
    if (e) {
      const item = e.value;
      if (item) {
        try {
          const { type, data } = nip19.decode(item);
          console.log("nip19 decode: "+item+"; type: "+type)
          document.getElementById("nip19IdentifierTypeContainer").innerHTML = type;
          document.getElementById("listItemTextarea").dataset.nip19type = type;
          if (type=="nevent") {
            document.getElementById("dataContainer").innerHTML = JSON.stringify(data);
            document.getElementById("hexContainer").innerHTML = data.id
            document.getElementById("listItemTextarea").dataset.nip19data = JSON.stringify(data);
            if ((newListKind == 10000) || (newListKind == 30000)) { // people
              document.getElementById("listItemTextarea").dataset.isitemvalid = "no";
              setIsItemValid_no();
              document.getElementById("isItemValidContainer").innerHTML = "no";

            }
            if ((newListKind == 10001) || (newListKind == 30001)) { // events
              document.getElementById("listItemTextarea").dataset.isitemvalid = "yes";
              setIsItemValid_yes()
              document.getElementById("isItemValidContainer").innerHTML = "yes";
            }
          }
          if (type=="note") {
            document.getElementById("dataContainer").innerHTML = data
            document.getElementById("hexContainer").innerHTML = data
            document.getElementById("listItemTextarea").dataset.nip19data = data;
            if ((newListKind == 10000) || (newListKind == 30000)) { // people
              document.getElementById("listItemTextarea").dataset.isitemvalid = "no";
              setIsItemValid_no();
              document.getElementById("isItemValidContainer").innerHTML = "no";
            }
            if ((newListKind == 10001) || (newListKind == 30001)) { // events
              document.getElementById("listItemTextarea").dataset.isitemvalid = "yes";
              setIsItemValid_yes();
              document.getElementById("isItemValidContainer").innerHTML = "yes";
            }
          }
          if (type=="npub") {
            document.getElementById("dataContainer").innerHTML = data;
            document.getElementById("hexContainer").innerHTML = data
            document.getElementById("listItemTextarea").dataset.nip19data = data;
            if ((newListKind == 10000) || (newListKind == 30000)) { // people
              document.getElementById("listItemTextarea").dataset.isitemvalid = "yes";
              setIsItemValid_yes();
              document.getElementById("isItemValidContainer").innerHTML = "yes";
            }
            if ((newListKind == 10001) || (newListKind == 30001)) { // events
              document.getElementById("listItemTextarea").dataset.isitemvalid = "no";
              setIsItemValid_no();
              document.getElementById("isItemValidContainer").innerHTML = "no";
            }
          }
          if (type=="nprofile") {
            document.getElementById("dataContainer").innerHTML = JSON.stringify(data);
            document.getElementById("hexContainer").innerHTML = data.pubkey
            document.getElementById("listItemTextarea").dataset.nip19data = JSON.stringify(data);
            if ((newListKind == 10000) || (newListKind == 30000)) { // people
              document.getElementById("listItemTextarea").dataset.isitemvalid = "yes";
              setIsItemValid_yes();
              document.getElementById("isItemValidContainer").innerHTML = "yes";
            }
            if ((newListKind == 10001) || (newListKind == 30001)) { // events
              document.getElementById("listItemTextarea").dataset.isitemvalid = "no";
              setIsItemValid_no();
              document.getElementById("isItemValidContainer").innerHTML = "no";
            }
          }
        } catch (error) {
          document.getElementById("nip19IdentifierTypeContainer").innerHTML = "????";
          document.getElementById("dataContainer").innerHTML = "";
          document.getElementById("hexContainer").innerHTML = "";
          document.getElementById("listItemTextarea").dataset.nip19type = "";
          document.getElementById("listItemTextarea").dataset.nip19data = "";
          document.getElementById("listItemTextarea").dataset.isitemvalid = "";
          setIsItemValid_no();
        }
      } else {
        document.getElementById("nip19IdentifierTypeContainer").innerHTML = "";
        document.getElementById("dataContainer").innerHTML = "";
        document.getElementById("hexContainer").innerHTML = "";
        document.getElementById("listItemTextarea").dataset.nip19type = "";
        document.getElementById("listItemTextarea").dataset.nip19data = "";
        document.getElementById("listItemTextarea").dataset.isitemvalid = "";
        setIsItemValid_no();
        document.getElementById("isItemValidContainer").innerHTML = "";
      }
    }
  }
  return (
    <>
      <textarea
        id="listItemTextarea"
        style={{
          height: '32px',
          padding: '5px',
          width: '97%',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: "14px",
        }}
        onChange={determineNip19IdentifierType}
        placeholder={placeholderText}
        data-nip19data=""
        data-nip19type=""
        data-isitemvalid=""
      />
      <div style={{display:"none"}}>
        <div style={{textAlign: "left", color: "grey", marginLeft: "5px"}}>
          NIP-19 identifier type:{' '}
          <span id="nip19IdentifierTypeContainer"></span>
        </div>
        <div style={{textAlign: "left", color: "grey", marginLeft: "5px", fontSize: "12px"}}>
          data{' '}
          <span id="dataContainer"></span>
        </div>
        <div style={{textAlign: "left", color: "grey", marginLeft: "5px", fontSize: "12px"}}>
          hex{' '}
          <span id="hexContainer"></span>
        </div>
        <div style={{textAlign: "left", color: "grey", marginLeft: "5px", fontSize: "12px"}}>
          valid item for this list?{' '}
          <span id="isItemValidContainer"></span>
        </div>
      </div>
    </>
  )
}

export default NewItemIdentifier;
