import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import AllInstances from './allInstances';

const List = ({ curatedListFocusID, oListData }) => {
  let oWord = {};
  let oEvent = {};

  let sEvent = '';

  if (oListData) {
    sEvent = oListData.event;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;

      oWord = JSON.parse(sWord);
    }
  }

  return (
    <>
      <div className="techOverviewTitle">representation as a word in the concept graph:</div>
      <div className="techOverviewJSON">{JSON.stringify(oWord, null, 4)}</div>

      <div className="techOverviewTitle">nostr event:</div>
      <div className="techOverviewJSON">{JSON.stringify(oEvent, null, 4)}</div>

      <div className="techOverviewTitle">sql:</div>
      <div className="techOverviewJSON">
        {JSON.stringify(oListData, null, 4)}
      </div>
    </>
  );
};

export default List;
