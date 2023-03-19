import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import AllInstances from './allInstances';

const List = ({ curatedListFocusID, oListData }) => {
  let oWord = {};
  let oEvent = {};
  let listNamePlural = "";

  let sEvent = '';

  if (oListData) {
    sEvent = oListData.event;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;

      oWord = JSON.parse(sWord);
      listNamePlural = oWord.nostrCuratedListData.name.plural;
    }
  }

  return (
    <>

      <div className="techOverviewTitle">
        representation of the list of{' '}
        <div style={{ display: 'inline-block', color: 'blue' }}>
          {listNamePlural}
        </div>{' '}
        as a word in the concept graph:
      </div>

      <div className="techOverviewJSON">{JSON.stringify(oWord, null, 4)}</div>

      <div className="techOverviewTitle">the above object packaged into a nostr event:</div>
      <div className="techOverviewJSON">{JSON.stringify(oEvent, null, 4)}</div>

      <div className="techOverviewTitle">sql:</div>
      <div className="techOverviewJSON">
        {JSON.stringify(oListData, null, 4)}
      </div>
    </>
  );
};

export default List;
