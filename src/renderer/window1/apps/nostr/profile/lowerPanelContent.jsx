import React from 'react';
import About from './panels/about';
import Grapevine from './panels/grapevine';
import Posts from './panels/posts';
import Ratings from './panels/ratings';
import Scores from './panels/scores';
import Lists from './panels/lists';

const LowerPanelContent = ({ pubkey, lowerPanelId }) => {
  switch (lowerPanelId) {
    case 'about':
      return (
        <>
          <About pubkey={pubkey} />
        </>
      );
      break;
    case 'posts':
      return (
        <>
          <Posts pubkey={pubkey} />
        </>
      );
      break;
    case 'grapevine':
      return (
        <>
          <Grapevine pubkey={pubkey} />
        </>
      );
      break;
    case 'ratings':
      return (
        <>
          <Ratings pubkey={pubkey} />
        </>
      );
      break;
    case 'scores':
      return (
        <>
          <Scores pubkey={pubkey} />
        </>
      );
      break;
    case 'lists':
      return (
        <>
          <Lists pubkey={pubkey} />
        </>
      );
      break;
    default:
      return <>error</>;
  }
};

export default LowerPanelContent;
