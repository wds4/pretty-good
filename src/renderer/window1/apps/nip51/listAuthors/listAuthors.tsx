import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniProfile from './miniProfile';

const List = () => {
  const oNip51 = useSelector(
    (state) => state.nip51
  );
  const byAuthors = oNip51.byAuthor;
  const aAuthors = Object.keys(byAuthors);

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  let aMyFollowing = [];
  if (myNostrProfile.following) {
    aMyFollowing = myNostrProfile.following;
  }
  let commonFollows = 0;
  let uniqueFollows = 0;
  for (let z=0;z<aAuthors.length;z++) {
    const pk = aAuthors[z];
    if (aMyFollowing.includes(pk)) {
      commonFollows++;
    } else {
      uniqueFollows++;
    }
  }

  const [whichFollowsSubset, setWhichFollowsSubset] = useState(0);
  let button0Class = "doSomethingButton";
  let button1Class = "doSomethingButton";
  let button2Class = "doSomethingButton";
  if (whichFollowsSubset==0) { button0Class += " doSomethingButtonActive" }
  if (whichFollowsSubset==1) { button1Class += " doSomethingButtonActive" }
  if (whichFollowsSubset==2) { button2Class += " doSomethingButtonActive" }
  const [searchStringForAuthors, setSearchStringForAuthors] = useState("");
  const [searchStringForLists, setSearchStringForLists] = useState("");

  const updateSearchStringForAuthors = (event) => {
    setSearchStringForAuthors(event.target.value);
  }
  const updateSearchStringForLists = (event) => {
    setSearchStringForLists(event.target.value);
  }

  let numInvisible = 0;
  let numVisible = 0;
  const aVisibleAuthorElements = document.getElementsByClassName("authorMiniProfileContainer");
  for (let x=0; x<aVisibleAuthorElements.length; x++) {
    const e = aVisibleAuthorElements[x];
    if (e.style.display == "none") {
      numInvisible ++;
    } else {
      numVisible ++;
    }
  }

  return (
    <>
      <div>
        <div className="h3" style={{marginBottom:"20px"}}>NIP-51 List Authors ({aAuthors.length} authors)</div>

        <div style={{textAlign: 'left',marginBottom: '5px'}}>
          <div style={{color: 'grey', marginBottom: '2px'}}>Search by author name, display_name, about, or pubkey (hex or bech32)</div>
          <textarea
            style={{width: '99%'}}
            id="authorSearchTextfield"
            onChange={updateSearchStringForAuthors}
          ></textarea>
        </div>

        <div style={{textAlign: 'left',marginBottom: '5px'}}>
          <div style={{color: 'grey', marginBottom: '2px'}}>Search by list title</div>
          <textarea
            style={{width: '99%'}}
            id="listSearchTextfield"
            onChange={updateSearchStringForLists}
          ></textarea>
        </div>

        <div style={{textAlign: 'left',marginBottom: '5px'}}>
          <div style={{display: 'inline-block', color: 'grey', paddingTop: '7px'}}>Authors:</div>
          <div
            className={button0Class}

            onClick={()=>{setWhichFollowsSubset(0)}}
          >
            full list ({aAuthors.length})
          </div>
          <div
            className={button1Class}
            onClick={()=>{setWhichFollowsSubset(1)}}
          >
            only authors I AM following ({commonFollows})
          </div>
          <div
            className={button2Class}
            onClick={()=>{setWhichFollowsSubset(2)}}
          >
            only authors I'm NOT following ({uniqueFollows})
          </div>
        </div>

        <div style={{textAlign: 'right',marginBottom: '5px', color: "grey"}}>
          showing <span style={{color: "black"}}>{numVisible}</span> of <span style={{color: "black"}}>{aVisibleAuthorElements.length}</span> authors
        </div>

        <div>{aAuthors.map((pk)=>{
          return (
            <>
              <MiniProfile
                pubkey={pk}
                searchStringForAuthors={searchStringForAuthors}
                searchStringForLists={searchStringForLists}
                aMyFollowing={aMyFollowing}
                whichFollowsSubset={whichFollowsSubset}
                oNip51={oNip51}
              />
            </>
          )
        })}</div>
      </div>
    </>
  );

};
export default List;
