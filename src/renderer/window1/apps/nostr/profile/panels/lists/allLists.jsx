import React, { useState } from 'react';
import { useNostrEvents } from 'nostr-react';
import { useDispatch, useSelector } from 'react-redux';
import { secsToTime } from 'renderer/window1/lib/pg';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import List from './list';
import TechDetailsForNostrNerds1 from './techDetailsForNostrNerds1';
import { addList } from 'renderer/window1/redux/features/nip51/lists/slice';

const AllLists = ({pubkey}) => {
  const dispatch = useDispatch();
  const { aListEventIDs } = useSelector(
    (state) => state.nip51
  );

  const [catPeopleCount, setCatPeopleCount] = useState(0);
  const filter = {
    kinds: [3, 10000, 10001, 30000, 30001],
    authors: [pubkey],
    since: 0
  };
  const { events } = useNostrEvents({
    filter,
  });

  for (let x=0; x < events.length; x++) {
    const event = events[x];
    if (!aListEventIDs.includes(event.id)) {
      dispatch(addList(event));
    }
  }

  const toggleLists = (e) => {
    const elemID = `listsContainer_${e.target.dataset.liststype}`;
    const buttonID = `button_${e.target.dataset.liststype}`;
    // console.log("elemID: "+elemID)
    const elem = document.getElementById(elemID)
    const elem_button = document.getElementById(buttonID)

    const currentState = elem.style.display;
    // console.log("currentState: "+currentState)

    if (currentState == 'none') {
      elem.style.display = 'block';
      elem_button.innerHTML = "-"
    }
    if (currentState == 'block') {
      elem.style.display = 'none';
      elem_button.innerHTML = "+"
    }
  };

  let k10000 = 0;
  let k10001 = 0;
  let k30000 = 0;
  let k30001 = 0;
  let k3 = 0;
  for (let x=0;x<events.length;x++) {
    const event = events[x];
    const k = event.kind;
    const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
    if (k==10000) { k10000++; }
    if (k==10001) { k10001++; }
    if (k==30000) {
      if (aTags_d.length > 0) {
        k30000++;
      }
    }
    if (k==30001) {
      if (aTags_d.length > 0) {
        k30001++;
      }
    }
    if (k==3) { k3++; }
  }

  return (
    <>
      <center>
        <a target="_blank" href="https://github.com/nostr-protocol/nips/blob/master/51.md" >NIP-51</a> Lists{' '}
        <span style={{color:"grey"}}>({events.length} lists)</span>
       </center>

      <TechDetailsForNostrNerds1 filter={filter} />

      <div className="listsGroupContainer">
        <div className="listsGroupTitleContainer">
          <button
            type="button"
            id="button_muteList"
            className="listsGroupToggleButton"
            data-liststype="muteList"
            data-currentstate="closed"
            onClick={(e) => toggleLists(e)}
          >
            +
          </button>
          <span>Mute List</span>
          <span className="listsGroupTitleParentheses">(kind: 10000)</span>
          <div className="numItemsNip51OuterContainer">
            <span className="numItemsNip51Container"  id="numItems_muteList">{k10000}</span>
            lists
          </div>
        </div>
        <div id="listsContainer_muteList" className="listsContainer" style={{display:"none"}}>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              if (event.kind == 10000) {
                return (
                  <>
                    <List event={event} />
                  </>
                );
              }
            }
          })}
        </div>
      </div>

      <div className="listsGroupContainer">
        <div className="listsGroupTitleContainer">
          <button
            type="button"
            id="button_pinList"
            className="listsGroupToggleButton"
            data-liststype="pinList"
            data-currentstate="closed"
            onClick={(e) => toggleLists(e)}
          >
            +
          </button>
          <span>Pin List</span>
          <span className="listsGroupTitleParentheses">(kind: 10001)</span>
          <div className="numItemsNip51OuterContainer">
            <span className="numItemsNip51Container"  id="numItems_pinList">{k10001}</span>
            lists
          </div>
        </div>
        <div id="listsContainer_pinList" className="listsContainer" style={{display:"none"}}>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              if (event.kind == 10001) {
                return (
                  <>
                    <List event={event} />
                  </>
                );
              }
            }
          })}
        </div>
      </div>

      <div className="listsGroupContainer">
        <div className="listsGroupTitleContainer">
          <button
            type="button"
            id="button_categorizedPeople"
            className="listsGroupToggleButton"
            data-liststype="categorizedPeople"
            data-currentstate="closed"
            onClick={(e) => toggleLists(e)}
          >
            +
          </button>
          <span>Categorized People Lists</span>
          <span className="listsGroupTitleParentheses">(kind: 30000)</span>
          <div className="numItemsNip51OuterContainer">
            <span className="numItemsNip51Container"  id="numItems_categorizedPeople">{k30000}</span>
            lists
          </div>
        </div>
        <div id="listsContainer_categorizedPeople" className="listsContainer" style={{display:"none"}}>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              if (event.kind == 30000) {
                const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
                if (aTags_d.length > 0) {
                  return (
                    <>
                      <List event={event} />
                    </>
                  );
                }
              }
            }
          })}
        </div>
      </div>

      <div className="listsGroupContainer">
        <div className="listsGroupTitleContainer">
          <button
            type="button"
            id="button_categorizedBookmarks"
            className="listsGroupToggleButton"
            data-liststype="categorizedBookmarks"
            data-currentstate="closed"
            onClick={(e) => toggleLists(e)}
          >
            +
          </button>
          <span>Categorized Bookmark Lists</span>
          <span className="listsGroupTitleParentheses">(kind: 30001)</span>
          <div className="numItemsNip51OuterContainer">
            <span className="numItemsNip51Container"  id="numItems_categorizedBookmarks">{k30001}</span>
            lists
          </div>
        </div>
        <div id="listsContainer_categorizedBookmarks" className="listsContainer" style={{display:"none"}}>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              if (event.kind == 30001) {
                const aTags_d = event.tags.filter(([k, v]) => k === 'd' && v && v !== '');
                if (aTags_d.length > 0) {
                  return (
                    <>
                      <List event={event} />
                    </>
                  );
                }
              }
            }
          })}
        </div>
      </div>

      <div className="listsGroupContainer">
        <div className="listsGroupTitleContainer">
          <button
            type="button"
            id="button_following"
            className="listsGroupToggleButton"
            data-liststype="following"
            data-currentstate="closed"
            onClick={(e) => toggleLists(e)}
          >
            +
          </button>
          <span>Following</span>
          <span className="listsGroupTitleParentheses">(kind: 3)</span>
          <div className="numItemsNip51OuterContainer">
            <span className="numItemsNip51Container"  id="numItems_following">{k3}</span>
            lists
          </div>
        </div>
        <div id="listsContainer_following" className="listsContainer" style={{display:"none"}}>
          {events.map((event, index) => {
            if (doesEventValidate(event)) {
              if (event.kind == 3) {
                return (
                  <>
                    <List event={event} />
                  </>
                );
              }
            }
          })}
        </div>
      </div>
    </>
  )
};

export default AllLists;
