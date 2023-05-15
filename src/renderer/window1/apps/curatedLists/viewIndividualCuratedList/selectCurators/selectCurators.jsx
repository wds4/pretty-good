import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import AllInstances from './allInstances';
import ChangeProfileFocus from './changeProfileFocus';
import RateProfile from './rateProfile';

const SelectCurators = ({
  curatedListFocusID,
  oListData,
  curatedListProfileFocusID,
  oProfileFocusSqlData,
}) => {
  const { devMode2 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode2) {
    devElemClass = 'devElemShow';
  }

  let name_plural = '';
  let oWord = {};
  let oEvent = {};
  let sEvent = '';

  if (oListData) {
    sEvent = oListData.event;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;
      oWord = JSON.parse(sWord);
      if (oWord.nostrCuratedListData) {
        if (oWord.nostrCuratedListData.name) {
          name_plural = oWord.nostrCuratedListData.name?.plural;
        }
      }
    }
  }

  return (
    <>
      <div className="h3">
        select curators for the list of{' '}
        <div style={{ display: 'inline-block', color: 'blue' }}>
          {name_plural}
        </div>
      </div>
      <div style={{ margin: '50px' }}>
        This page is being deprecated. To endorse a nostr profile as a curator,
        navigate to that user's profile page. (If not visible, make sure
        Grapevine is toggled to ON in the upper right masthead.)
      </div>
      <div className={devElemClass}>
        <RateProfile
          curatedListFocusID={curatedListFocusID}
          oListData={oListData}
          curatedListProfileFocusID={curatedListProfileFocusID}
          oProfileFocusSqlData={oProfileFocusSqlData}
        />
        <ChangeProfileFocus />
      </div>
    </>
  );
};

export default SelectCurators;
