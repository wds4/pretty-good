import React from 'react';
import {
  updateMainColWidth,
  updateMastheadCenter,
} from 'renderer/window1/lib/pg/ui';
import Masthead from 'renderer/window1/mastheads/pgMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/pgNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/prettyGood/helloWorld';
import TooltipDemo from './tooltipDemo';

export default class PrettyGoodSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Pretty Good: Hello World';
    updateMastheadCenter(mastheadDescriptor);

    const notes = {
      id_b: {
        event: {
          pubkey: "pk1",
          created_at: 1
        },
        viewed: false
      },
      id_c: {
        event: {
          pubkey: "pk1",
          created_at: 0
        },
        viewed: false
      },
      id_a: {
        event: {
          pubkey: "pk1",
          created_at: 2
        },
        viewed: false
      },
    }
    const aNoteIds = Object.keys(notes).sort();
    // const aNoteIds = Object.keys(notes).sort((a,b) => (a.event.created_at,b.event.created_at) )
    const e2 = document.getElementById("sortDemo2")
    e2.innerHTML = JSON.stringify(aNoteIds,null,4)

    const sortObject = obj => Object.keys(obj).sort().reduce((res, key) => (res[key] = obj[key], res), {});
    let list = {
      "name": "John",
      "age": 20,
      "zed": 100,
      "aaa": 0
    };
    let arr = sortObject(list);
    const e1 = document.getElementById("sortDemo1")
    e1.innerHTML = JSON.stringify(arr,null,4)
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
            <div className="h4">Pretty Good: Hello World</div>
            <TooltipDemo />
            <div id="sortDemo1"></div>
            <div id="sortDemo2"></div>
          </div>
        </div>
      </>
    );
  }
}
