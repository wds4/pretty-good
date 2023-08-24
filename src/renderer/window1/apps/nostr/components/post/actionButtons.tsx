import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNostrPostFocusEvent,
  updateNostrActiveThreadFocus,
} from 'renderer/window1/redux/features/nostr/settings/slice';
import { useNostrEvents } from 'nostr-react';
import RepostButton from './repostButton';
import ReactionButton from './reactionButton';
import ZapButton from './zapButton';
import ZapPanelWithQrCode from './zapPanel/zapPanelWithQrCode';

const CountReplies = ({event}) => {
  const parentEventID = event.id;

  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [1],
      '#e': [parentEventID],
    },
  });
  return (
    <>
      <span className="replyNumberContainer" style={{ marginLeft: '7px' }}>{events.length}</span>
    </>
  )
}

const ActionButtons = ({ event }) => {
  const [showQrCode, setShowQrCode] = useState(0);

  const nostrProfiles = useSelector(
    (state) => state.nostrProfiles.nostrProfiles
  );
  const dispatch = useDispatch();
  // var randomNumber = Math.random();
  if (!window.linkToReply_base) {
    window.linkToReply_base = 'Reply';
  }
  // const linkToReply = `/${window.linkToReply_base}/${event.id}`;
  const linkToReply = `/NostrHome/NostrThread`;
  return (
    <>
      <div style={{ fontSize: '18px' }}>
        <span className="singleActionButtonContainer">
          <NavLink
            onClick={() => {
              dispatch(updateNostrPostFocusEvent(event));
              dispatch(updateNostrActiveThreadFocus(event));
            }}
            className="eventContentContainer"
            to={linkToReply}
          >
            &#x1F4AC;
            <CountReplies event={event} />
          </NavLink>
        </span>
        <span className="singleActionButtonContainer">
          <RepostButton parentEvent={event} />
        </span>
        <span className="singleActionButtonContainer">
          <ReactionButton parentEvent={event} />
        </span>
        <span className="singleActionButtonContainer">
          <ZapButton parentEvent={event} showQrCode={showQrCode} setShowQrCode={setShowQrCode} />
        </span>
      </div>
      <InvoiceQrCodePanel showQrCode={showQrCode} event={event} nostrProfiles={nostrProfiles} />
    </>
  );
};
export default ActionButtons;

const InvoiceQrCodePanel = ({showQrCode,event}) => {
  if (showQrCode == 0) {
    return <></>;
  }
  if (showQrCode == 1) {
    return (
      <>
        <ZapPanelWithQrCode parentEvent={event} />
      </>
    )
  }
  return <></>;
}
