import React from 'react';
import { useSelector } from 'react-redux';
import { nip04 } from 'nostr-tools';
import { timeout, secsToTime } from 'renderer/window1/lib/pg';
import DirectMessageX from './messageX-deprecated';

export default class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: {
        rawContent: null,
        showThisEvent: null,
        event: {},
        foo: null,
      },
    };
  }

  componentDidMount() {
    const event = this.props.eventX;
    let levelNew = this.state.level;
    levelNew.event = event;
    this.setState({ levelNew });
    const { myPubkey } = this.props;
    const { myPrivKey } = this.props;
    const { pubkey } = this.props;
    const { index } = this.props;

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
    this.setState({ showThisEvent });

    if (showThisEvent == 1) {
      const { content } = event;
      // const rawContent = await nip04.decrypt(myPrivKey, event.pubkey, content);
      const rawContent = content;
      const rawContent2 = `${rawContent} index: ${index}`;

      let levelNew = this.state.level;
      levelNew.rawContent = rawContent2;
      this.setState({ levelNew });



      /*
      this.setState({ rawContent: rawContent2 });
      await timeout(5000);
      const rawContent3 = ` === ${rawContent2} === ${index}`;
      await timeout(10);
      this.setState({ rawContent: rawContent3 });
      */
    }
    if (showThisEvent == 2) {
      const { content } = event;
      // const rawContent = await nip04.decrypt(myPrivKey, pubkey, content);
      const rawContent = content;
      const rawContent2 = `${rawContent} index: ${index}`;
      let levelNew = this.state.level;
      levelNew.rawContent = rawContent2;
      this.setState({ levelNew });

      /*
      this.setState({ rawContent: rawContent2 });
      await timeout(5000);
      const rawContent3 = ` === ${rawContent2} === ${index}`;
      await timeout(10);
      this.setState({ rawContent: rawContent3 });
      */
    }
  }

  render() {
    return (
      <>
        <div style={{border:"1px solid purple"}}>id: {this.state.level.event.id}</div>
        <DirectMessageX
          eventY={this.state.level.event}
          rawContent={this.state.level.rawContent}
          showThisEvent={this.state.level.showThisEvent}
        />
      </>
    );
  }
}
