import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masthead from 'renderer/window1/mastheads/grapevineMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/grapevineNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/grapevine/home';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import { updateExtendedFollowing } from 'renderer/window1/redux/features/nostr/myNostrProfile/slice';

export const RecalculateMyExtendedFollowingList = () => {
  const { following } = useSelector((state) => state.myNostrProfile);
  const dispatch = useDispatch();
  const oKind3ProfilesData = useSelector((state) => state.nostrProfiles.kind3NostrProfiles);

  const aExtFollowing = JSON.parse(JSON.stringify(following));
  for (let x=0;x<following.length;x++) {
    const pk = following[x];
    if (oKind3ProfilesData.hasOwnProperty(pk)) {
      const oKind3Event = oKind3ProfilesData[pk];
      if (oKind3Event && oKind3Event.hasOwnProperty('tags')) {
        const aTags = oKind3Event.tags;
        for (let z=0;z<aTags.length;z++) {
          const aTag = aTags[z];
          const nxtPk = aTag[1];
          if (!aExtFollowing.includes(nxtPk)) {
            aExtFollowing.push(nxtPk);
          }
        }
      }
    }
  }
  console.log("aExtFollowing: "+JSON.stringify(aExtFollowing))
  const sendUpdateToStore = () => {
    dispatch(updateExtendedFollowing(aExtFollowing));
  }
  return (
    <>
      <div>recalculateMyExtendedFollowingList; aExtFollowing: {aExtFollowing.length}</div>
      <button onClick={sendUpdateToStore}>update</button>
    </>
  )
}

export default class GraphViewMyExtendedFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Graphical View: My Extended Following List';
    updateMastheadCenter(mastheadDescriptor);
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
            <div className="h4">Graphical View: My Extended Following List</div>
            <RecalculateMyExtendedFollowingList />
          </div>
        </div>
      </>
    );
  }
}
