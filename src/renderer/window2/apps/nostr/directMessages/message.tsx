import { useSelector } from 'react-redux';
import { nip04 } from 'nostr-tools';
import { secsToTime } from 'renderer/window1/lib/pg';

const decodeAndSend = async (event, showThisEvent, myPubkey, myPrivKey, pubkey) => {
  try {
    const rawContent = event.content;
    const decodedMessage = await nip04.decrypt(myPrivKey, pubkey, rawContent);
    const e = document.getElementById(event.id);
    e.innerHTML = `${decodedMessage}`;
  } catch (err) {}
};

const Message = ({ event, showThisEvent }) => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  let directMessageContainerClassName =
    'directMessageTooltip directMessageContainer';
  const displayTime = secsToTime(event.created_at);
  try {
    const pubkey = useSelector(
      (state) => state.nostrSettings.nostrProfileFocus
    );
    const myNostrProfile = useSelector((state) => state.myNostrProfile);
    const myPubkey = myNostrProfile.pubkey_hex;
    const myPrivKey = myNostrProfile.privkey;

    if (showThisEvent == 1) {
      directMessageContainerClassName += ' directMessageContainerFloatLeft';
    }
    if (showThisEvent == 2) {
      directMessageContainerClassName += ' directMessageContainerFloatRight';
    }
    if (showThisEvent) { decodeAndSend(event, showThisEvent, myPubkey, myPrivKey, pubkey); }
  } catch (err) {}

  return (
    <>
      <div className="eventContainer">
        <div className={directMessageContainerClassName}>
          <div className="directMessageContentContainer">
            <pre className={devModeClassName}>
              {JSON.stringify(event, null, 4)}
            </pre>
            <div id={event.id} />
            <div className="directMessageTooltipText">{displayTime}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Message;
