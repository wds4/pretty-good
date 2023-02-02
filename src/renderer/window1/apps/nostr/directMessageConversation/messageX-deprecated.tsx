import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { nip04 } from 'nostr-tools';
import { timeout, secsToTime } from 'renderer/window1/lib/pg';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await fetchUsers();
      setUsers(users);
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  if (!users) return <div>Loading...</div>;

  return (
    <ul>
      {users.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
};

const decodeMessage = async ({rawContent}) => {
  await timeout(5000);
  const myPrivKey = "618359f24c21a1df3202194f521d8b35323348e1404a6e970214fbdf3e3b0892"; // Thor
  // const pubkey = "npub1d68ynhfhwgy3xfwjfrt08jcyxgxthuxmn60tuksrmalfvygfg6ys804xkf"; // Thor
  const pubkey = "73811e530aaa1d3074f246a281a42626341fbe6c549b64909a894cca93166c87" // hottie
  const decodedMessage = await nip04.decrypt(myPrivKey, pubkey, rawContent);
  return "decoded "+decodedMessage+" message"
}

const DecodedMessage = ({rawContent}) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    (async () => {
      const rC = "HEYYYYY";
      const message = await decodeMessage({rawContent});
      setMessage(message);
    })();

    return () => {
      <div>!!!!!{message}!!!{rawContent}!!!</div>
    };
  }, []);

  if (!message) return <div>Loading...</div>;
  return <div>LOAD{rawContent}ING...{message}</div>;

};

const fooooFxn = async() => {
  timeout(10);
  return "BARRRR";
}

const DirectMessageX = ({ eventY, rawContent, showThisEvent }) => {
  const pubkey = useSelector(
    (state) => state.nostrGlobalState.nostrProfileFocus
  );
  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const myPubkey = myNostrProfile.pubkey_hex;
  const myPrivKey = myNostrProfile.privkey;

  let dataX = "not changed ";

  const fooFunc = async () => {
    dataX = await timeout(10).then((dataX)=>{
      return "CHANGED"
    });
    dataX = "changed";
    return dataX;
  }

  const fooFunc2 = (e) => {
    return "bar"+e.rawContent+"Var";
    dataX = "changed";
  }
  fooFunc()


  if (eventY) {
    const pubkey = useSelector(
      (state) => state.nostrGlobalState.nostrProfileFocus
    );
    const myNostrProfile = useSelector((state) => state.myNostrProfile);

    const displayTime = secsToTime(eventY.created_at);

    let directMessageContainerClassName =
      'directMessageTooltip directMessageContainer';
    if (showThisEvent == 1) {
      directMessageContainerClassName += ' directMessageContainerFloatLeft';
    }
    if (showThisEvent == 2) {
      directMessageContainerClassName += ' directMessageContainerFloatRight';
    }

    return (
      <>
        <div className="eventContainer">
          xyxy==<DecodedMessage rawContent={eventY.content} />==xyxy
          <pre style={{display:"none"}} >{JSON.stringify(eventY, null, 4)}</pre>
          <div className={directMessageContainerClassName}>
            <div className="directMessageContentContainer">
              {rawContent} QWERTY {fooFunc2({rawContent})} BLAH
              <div className="directMessageTooltipText">{displayTime}</div>
            </div>
            <div>dataX: {dataX}==</div>
          </div>
        </div>
      </>
    );
  }
};
export default DirectMessageX;
