import React, { useState, useEffect } from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/viewLists';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import styled, { keyframes } from 'styled-components';
import ListsRedux from './listsRedux';

export default class CuratorsOfIndividualList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'curated lists';
    let mastheadHTML = '';
    mastheadHTML += "<a href='https://github.com/wds4/DCoSL' target='_blank' style='text-decoration:none' >";
    mastheadHTML += 'DCoSL:';
    mastheadHTML += '</a>';

    mastheadHTML += '<div>';
    mastheadHTML += '<span style=color:blue}>Decentralized Curation</span> ';
    mastheadHTML += 'of <span>Simple Lists</span>';

    mastheadHTML += '</div>';
    updateMastheadCenter(mastheadHTML);
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <ListsRedux />
            <center>
              <div
                style={{
                  display: 'none',
                  marginBottom: '10px',
                  textAlign: 'center',
                  width: '65%',
                  color: 'grey',
                  fontSize: '12px',
                  padding: '5px',
                  fontStyle: 'italic',
                  borderRadius: '5px',
                }}
              >
                <div style={{ fontSize: '20px' }}>
                  DCoSL:{' '}
                  <span style={{ color: 'blue' }}>Decentralized Curation</span>{' '}
                  of <span style={{ color: 'blue' }}>Simple Lists</span>
                </div>

                <div>
                  the atomic building block and the defining feature of the
                  decentralized web
                </div>
              </div>
            </center>

          </div>
        </div>
      </>
    );
  }
}
