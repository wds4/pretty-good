import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNostr, dateToUnix } from 'nostr-react';
import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

const NewListName = ({v}) => {
  if (v == "10000") {
    return (
      <>

        <textarea id="newListTitle" readonly value="mute" style={{border:"1px solid grey",width:"98%"}} />
      </>
    )
  }
  if (v == "10001") {
    return (
      <>
        <textarea id="newListTitle" readonly value="pin" style={{border:"1px solid grey",width:"98%"}} />
      </>
    )
  }
  return (
    <>
      <div>
        <textarea id="newListTitle" placeholder="give your new list a name" style={{fontSize: "18px", border:"1px solid grey", borderRadius: "2px", height: "30px", width:"98%"}}/>
      </div>
    </>
  )
}

const NewListDescriptors = () => {
  const [val, setVal] = useState(0);
  const updateSelector = () => {
    const e = document.getElementById("newListTypeSelector")
    if (e) {
      const v = e.options[e.selectedIndex].value;
      console.log("v; "+v)
      setVal(v);
    }
  }
  return (
    <>
      <div style={{display:"inline-block", border:"1px dashed red",width:"50%",height:"100%"}}>
        <div className="customSelectorContainerStyle1" style={{width: "100%"}}>
          <select onChange={()=>updateSelector()} id="newListTypeSelector" style={{width:"80%"}}>
            <option value="0" >Select List Type</option>
            <option value="10000" >Mute List: kind 10000</option>
            <option value="10001" >Pin List: kind 10001</option>
            <option value="30000" >People List: kind 30000</option>
            <option value="30001" >Bookmarks List: kind 30001</option>
            <option value="39901" >Curated List: kind 39901</option>
          </select>
        </div>
      </div>
      <div style={{display:"inline-block", border:"1px dashed red",width:"50%",height:"100%"}}>
        <div style={{width:"80%", fontSize: "24px", display:"inline-block"}}>
          <NewListName v={val} />
        </div>
      </div>
    </>
  )
}

const AddItem = () => {
  const addItem = () => {
    console.log("addItem");
  }
  return (
    <>
      <div style={{border: "1px solid grey", borderRadius: "5px", padding: "5px"}}>
        <div style={{display:"inline-block", width: "60%"}}>
          <textarea
            style={{height: "44px", padding: "3px", width: "95%", border: "2px solid black", borderRadius: "5px"}}
            placeholder="add a public item to this list. NIP-19 identifier (npub, nprofile, note, nevent, or naddr)"
          />
        </div>
        <div style={{display:"inline-block", width: "20%"}}>
          <div >
            <select style={{border:"1px solid grey", borderRadius: "5px", height: "50px", width: "100px", fontSize: "26px"}}>
              <option>public</option>
              <option>private</option>
            </select>
          </div>

        </div>
        <div style={{display:"inline-block", width: "10%"}}>
          <button
            type="button"
            style={{border:"1px solid grey", borderRadius: "5px", width: "50px", height: "50px", fontSize: "26px"}}
            onClick={addItem}
          >
          ✔️
          </button>
        </div>
        <div style={{display:"inline-block", width: "10%"}}>
          <button
            type="button"
            style={{border:"1px solid grey", borderRadius: "5px", width: "50px", height: "50px", fontSize: "26px"}}
          >
          ✖️
          </button>
        </div>
      </div>
    </>
  )
}

const MakeNewList = () => {
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPrivkey = myNostrProfile.privkey;
  const { publish } = useNostr();

  const postList = () => {
    console.log("postList")
  }

  const updateMessage = () => {
    const newListTitle = document.getElementById("newListTitle").value;
    const aTags = [];
    aTags.push(["d", newListTitle])
    const e = document.getElementById("newListTypeSelector")
    let kind = 0;
    if (e) {
      kind = e.options[e.selectedIndex].value;
    }
    const event: NostrEvent = {
      content: "",
      kind: kind,
      tags: aTags,
      created_at: dateToUnix(),
      pubkey: getPublicKey(myPrivkey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, myPrivkey);

    const event_ = JSON.parse(JSON.stringify(event));
    console.log("onChangeMessage; event_: "+JSON.stringify(event_,null,4))
    document.getElementById("newNoteTextarea").value = JSON.stringify(event_,null,4)
    // setNote(event_)
  }
  return (
    <>
      <div>
        <div className="h3" style={{marginBottom:"20px"}}>
          Make New{' '}
          <a href="https://github.com/nostr-protocol/nips/blob/master/51.md" target="_blank" style={{textDecoration: "none"}}>NIP-51</a>{' '}
          List
        </div>
        <center>
          <div style={{position:"relative", display:"inline-block"}}>
            <div onChange={updateMessage} style={{width:"800px", height: "100px", border: "1px solid grey", borderRadius: "10px", paddingTop:"20px", paddingBottom:"20px"}}>
              <NewListDescriptors />
            </div>
            <div style={{marginTop: "20px", width:"800px", border: "1px solid grey", borderRadius: "10px", padding:"10px"}}>
              <div className="h4">add items, using <a href="https://github.com/nostr-protocol/nips/blob/master/19.md" target="_blank" style={{textDecoration: "none"}}>NIP-19</a> identifiers</div>
              <AddItem />
            </div>
            <button
              type="button"
              onClick={postList}
              className="doSomethingButton"
            >
              Publish your list!
            </button>
          </div>
        </center>
        <div id="newPostTextareaContainer">
          <textarea id="newNoteTextarea" className="newPostTextarea" />
        </div>
      </div>
    </>
  );

};
export default MakeNewList;
