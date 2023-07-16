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
    mastheadHTML += '</a> Decentralized';
    mastheadHTML += '<div>';
    mastheadHTML += '<span style=color:blue}>Curation</span> ';
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
          </div>
        </div>
      </>
    );
  }
}
