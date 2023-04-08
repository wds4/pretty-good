import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import Masthead from '../../mastheads/mainMasthead';
import LeftNavbar from '../../navbars/leftNav.js';
import * as MiscAppFxns from '../../lib/app/misc';
import * as StartupFxns from '../../lib/app/startup';

const jQuery = require('jquery');

const { updateMainColWidth } = MiscAppFxns;
const { cloneObj } = MiscAppFxns;
const { secsToTime } = MiscAppFxns;
const { timeout } = MiscAppFxns;

export default class SearchForUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pk_search:
        '10ce7cb95c73fbcf16cadda151bfd052a014f76281fc2a9e862236d82918a155',
      // pk_search: "npub1u5njm6g5h5cpw4wy8xugu62e5s7f6fnysv0sj0z3a8rengt2zqhsxrldq3",
      npub_search:
        'npub1u5njm6g5h5cpw4wy8xugu62e5s7f6fnysv0sj0z3a8rengt2zqhsxrldq3', // my iOS
    };
  }

  async componentDidMount() {
    updateMainColWidth();
    document.getElementById('mastheadCenterContainer').innerHTML =
      'search for user';
    jQuery('#userPubkey').change(function () {
      const userPubkey = jQuery('#userPubkey').val();
      console.log(`userPubkey: ${userPubkey}`);
      jQuery('#navLinkElem1').data('pubkey', userPubkey);
    });
    jQuery('#userNpub').change(function () {
      const userNpub = jQuery('#userNpub').val();
      console.log(`userNpub: ${userNpub}`);
      jQuery('#navLinkElem2').data('npub', userNpub);
      const { type, data } = nip19.decode(userNpub);
      console.log(`type: ${type}`);
      console.log(`data: ${data}`);
      jQuery('#userPubkey').val(data);
    });

    jQuery('#navLinkElem').click(function () {
      window.clickedPubKey = jQuery('#userPubkey').val();
    });
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar />
        </div>
        <div id="mainCol">
          <div id="mastheadElem">
            <Masthead />
          </div>
          <div id="mainPanel">
            <div>Enter a pubkey:</div>
            <textarea
              id="userPubkey"
              style={{ width: '80%', height: '40px' }}
            />

            <div>Enter a public account id (starts with npub):</div>
            <textarea id="userNpub" style={{ width: '80%', height: '40px' }} />

            <br />

            <div className="doSomethingButton">
              <NavLink
                to="/UserProfile"
                id="navLinkElem"
                className="goToUserProfileButton"
                data-pubkey={this.state.pk_search}
              >
                Search
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}
