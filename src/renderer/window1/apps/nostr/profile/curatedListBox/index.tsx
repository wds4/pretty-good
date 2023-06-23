import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import { useSelector, useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';
import CreateNewRating from './createNewRating';

const extractNostrListData = (oList) => {
  try {
    const sEvent = oList.event;
    const oEvent = JSON.parse(sEvent);
    const listID = oEvent.id;
    const oNostrListData = JSON.parse(oEvent.content);
    return { listID, oNostrListData };
  } catch (e) {
    return {};
  }

  return {};
};

const ListSelector = ({ aListData, aEndorsementsData }) => {
  const dispatch = useDispatch();
  const curatedListFocusID = useSelector(
    (state) => state.prettyGoodGlobalState.curatedListFocus
  );
  const updateSelectedList = () => {
    const e = document.getElementById('curatedListSelector');
    const newListID = e?.value;
    console.log(`updateSelectedList; newListID: ${newListID}`);
    dispatch(updateCuratedListFocus(newListID));
  };
  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <select id="curatedListSelector" onChange={() => updateSelectedList()}>
          {aListData.map((oList) => {
            const sqlID = oList.id;
            const oExtractedData = extractNostrListData(oList);
            const thisListID = oExtractedData?.listID;
            if (!curatedListFocusID) {
              dispatch(updateCuratedListFocus(thisListID));
            }
            let selected = false;
            if (curatedListFocusID == thisListID) {
              selected = true;
            }
            return (
              <>
                <option selected={selected} value={thisListID}>
                  {
                    oExtractedData.oNostrListData.nostrCuratedListData.name
                      .plural
                  }
                </option>
              </>
            );
          })}
          ;
        </select>
      </div>
    </>
  );
};

export class CuratedListBoxA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aListData: [],
      aEndorsementsData: [],
      curatedListProfileFocusID: null,
      oProfileFocusSqlData: null,
    };
  }

  async componentDidMount() {
    const sql1 = ` SELECT * FROM curatedLists `;
    const aListData = await asyncSql(sql1);
    this.setState({ aListData });

    const sql2 = ` SELECT * FROM endorsementsOfCurators `;
    const aEndorsementsData = await asyncSql(sql2);
    this.setState({ aEndorsementsData });
  }

  render() {
    return (
      <>
        <div style={{ border: '1px solid purple', padding: '5px' }}>
          <div style={{ color: 'grey' }}>
            Endorse as a Curator for this Nostr List:
          </div>
          <ListSelector
            aListData={this.state.aListData}
            aEndorsementsData={this.state.aEndorsementsData}
          />
          <br />
          <CreateNewRating
            aListData={this.state.aListData}
            pubkeyFocusID={this.props.pubkey}
            userData={this.props.userData}
          />
        </div>
      </>
    );
  }
}

const CuratedListBox = () => {
  const isNostrGrapevineOn = useSelector(
    (state) => state.nostrSettings.nostrGrapevineSettings.active
  );

  if (isNostrGrapevineOn) {
    return (
      <>
        <CuratedListBoxA />

      </>
    );
  }
  return <></>;
};
export default CuratedListBox;

/* <CuratedListsAllListeners /> */
