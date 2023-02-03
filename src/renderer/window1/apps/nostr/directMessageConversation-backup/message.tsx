import { useSelector } from 'react-redux';
import { nip04 } from 'nostr-tools';
import { timeout, secsToTime } from 'renderer/window1/lib/pg';

const decodeAndSend = async (event, showThisEvent, myPubkey, myPrivKey, pubkey) => {
  try {
    const rawContent = event.content;
    const decodedMessage = await nip04.decrypt(myPrivKey, pubkey, rawContent);
    // await timeout(50);
    // console.log(event.id);
    const e = document.getElementById(event.id);
    e.innerHTML = `${showThisEvent} <br/> ${decodedMessage}`;
  } catch (err) {}
};

const Message = ({ event }) => {
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
      (state) => state.nostrGlobalState.nostrProfileFocus
    );
    const myNostrProfile = useSelector((state) => state.myNostrProfile);
    const myPubkey = myNostrProfile.pubkey_hex;
    const myPrivKey = myNostrProfile.privkey;

    const pk_receiver = event.tags.find(
      ([k, v]) => k === 'p' && v && v !== ''
    )[1];
    let showThisEvent = 0;
    // IF THIS PROFILE IS SENDER && I AM RECEIVER
    if (event.pubkey == pubkey && pk_receiver == myPubkey) {
      showThisEvent = 1;
    }
    // IF I AM SENDER && THIS PROFILE IS RECEIVER
    if (event.pubkey == myPubkey && pk_receiver == pubkey) {
      showThisEvent = 2;
    }

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
