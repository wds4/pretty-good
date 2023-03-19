import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { updateCuratedListProfileFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const ChangeProfileFocus = () => {
  const dispatch = useDispatch();

  const oNostrProfiles = useSelector((state) => state.nostrProfiles);
  const searchByPubkey = () => {
    const e1 = document.getElementById('userPubkeyElem');
    const e2 = document.getElementById('userNameElem');
    dispatch(updateCuratedListProfileFocus(e1.value));
    // may not need this function; or may check for validity of entered value?
  };

  return (
    <>
      <div>
        <div>Enter a pubkey:</div>
        <textarea
          id="userPubkeyElem"
          style={{ width: '80%', height: '40px' }}
        />
      </div>
      <button className="doSomethingButton" onClick={() => searchByPubkey()}>
        Search by pubkey
      </button>
    </>
  );
};

export default ChangeProfileFocus;
