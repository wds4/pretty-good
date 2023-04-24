import React from 'react';
import { useSelector } from 'react-redux';
import ReactDom from 'react-dom';
import EBookHeader from '../components/eBookHeader';
import { marked } from 'marked';
import Markdown from 'marked-react';
import ReactMarkdown from 'react-markdown'
// import { mainExport } from "renderer/window1/apps/eBooks/books/threadedTapestry/threadedTapestry/singleSentence";
import { asyncFetchMarkdown } from 'renderer/window1/lib/pg/asyncSql';

export class Markdown2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdFile: ``,
      mdUrl: null,
    };
  }

  async componentDidMount() {
    this.setState({ mdUrl: this.props.mdUrl });
    const mdFile = await asyncFetchMarkdown(this.props.mdUrl);
    console.log("mdFile: "+mdFile)
    this.setState({ mdFile });
  }

  render() {
    const fooBar = this.state.mdFile;
    return (
      <>
        <ReactMarkdown children={fooBar} />
      </>
    );
  }
}

const Description = () => {

  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  const changeVersion = () => {
    console.log('changeVersion');
  };

  const mdUrl = "src/renderer/window1/apps/eBooks/books/threadedTapestry/threadedTapestry/"+versionSlug+".md";

  return (
    <>
      <div style={{ border: '1px solid purple', padding: '5px' }}>
        <Markdown2 mdUrl={mdUrl} />
      </div>
    </>
  );
};
export default Description;
