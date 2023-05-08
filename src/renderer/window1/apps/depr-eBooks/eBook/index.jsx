import React from 'react';
import { NavLink } from 'react-router-dom';
import Masthead from 'renderer/window1/mastheads/eBooksMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/eBooks/book';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import EBook from './eBook';

import ReactDOM from 'react-dom';
import Markdown from 'marked-react';

import { asyncFetchMarkdown } from 'renderer/window1/lib/pg/asyncSql';

const fooBar = `# heyyy therrreee world!!!`
import { mainExport } from 'renderer/window1/apps/eBooks/content/threadedTapestry/threadedTapestry/singleSentence';

export default class EBooksHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'eBook';
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
            <EBook />
          </div>
        </div>
      </>
    );
  }
}
