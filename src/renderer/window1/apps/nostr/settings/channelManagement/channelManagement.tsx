import { useSelector } from 'react-redux';
import { nip19 } from 'nostr-tools';
import PopulateChannelListener from './populateChannelListener';
import { useRef } from 'react';

const ChannelManagement = () => {

  /*
  const { listsByNaddr } = useSelector(
    (state) => state.myNostrProfile.curatedChannelsData
  );
  const aListsByNaddr = Object.keys(listsByNaddr);

  const curatedChannelsData = useSelector(
    (state) => state.myNostrProfile.curatedChannelsData
  );
  */

  const aListsByNaddr = useSelector(
    (state) => state.myNostrProfile.curatedChannelsData.aListsByNaddr
  );

  const aListsByNaddrUR = useRef(aListsByNaddr);

  return (
    <>
      <div className="h2">Channel Management</div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">Channels</div>
        <div className="profileManagementFaqText">
          Pretty Good Apps offers an experimental feature called Channels. This
          feature allows you to select a "Channel" and see a feed that is
          tailored for that channel, rather than a feed generated using your
          follows list.
        </div>
      </div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">Functionality</div>
        <div className="profileManagementFaqText">
          Initial functionality includes two Channels: one called Nostr
          Development, and one called Fed Watch. For each Channel, there is a
          corresponding NIP-51 List of people (public; kind:30000) managed by wds4
          called, respectively:
          <li>Nostr Devs</li>
          <li>Fed Watchers</li>
          When you choose a Channel, your feed is generated using the pubkeys on
          the corresponding list.
        </div>
      </div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">Roadmap</div>
        <div className="profileManagementFaqText">
          The eventual plan is for each Channel's NIP-51 list to be replaced by
          a "crowdsourced" or "curated" list. Also, more Channels will be made
          available. Eventually, the list of Channels will be crowdsourced.
          These changes will be carried out incrementally. The precise roadmap
          is yet to be determined.
        </div>
        <div className="profileManagementFaqText" style={{marginTop:"10px"}}>
          Tentative next steps:
          <li>Allow user to create new Channels (maintained locally); each Channel has a name and points to one NIP-51 List</li>
          <li>Allow one Channel to point to multiple NIP-51 lists</li>
          <li>Admit not just kind 30000, but also kind 30001 lists</li>
          <li>Allow to link Channels to Curated Lists (which do not yet exist)</li>
          <li>Allow the list of Channels to be stored as its own NIP-51 List</li>
          <li>Organize Channels into a hierarchy</li>
        </div>
      </div>
      <div>
        <div>aListsByNaddr: {JSON.stringify(aListsByNaddr,null,4)}</div>
        <div>aListsByNaddrUR: {JSON.stringify(aListsByNaddrUR,null,4)}</div>
        {aListsByNaddrUR.current.map((naddr)=>{
          const { type, data } = nip19.decode(naddr);
          if (type=="naddr") {
            return (
              <>
                <PopulateChannelListener naddr={naddr} />
              </>
            );
          }
        })}
      </div>
    </>
  )
}
export default ChannelManagement;
