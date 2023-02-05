import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post';
import { doesEventValidate } from '../../../lib/nostr/eventValidation';
import { updateNostrProfilePanelSelector } from 'renderer/window1/redux/features/nostr/settings/slice';
import LowerPanelContent from './lowerPanelContent';

const UserPanel = () => {
  const nostrSettings = useSelector( (state) => state.nostrSettings);
  const pubkey = nostrSettings.nostrProfileFocus;
  const nostrProfilePanelSelector = nostrSettings.nostrProfilePanelSelector;
  console.log("nostrProfilePanelSelector "+ nostrProfilePanelSelector)
  const dispatch = useDispatch();

  let className={};
  className.about = "profilePageBarTab";
  className.posts = "profilePageBarTab";
  className.grapevine = "profilePageBarTab";
  className.ratings = "profilePageBarTab";
  className.scores = "profilePageBarTab";
  if (nostrProfilePanelSelector=="about") {className.about += " profilePageBarTabSelected";}
  if (nostrProfilePanelSelector=="posts") {className.posts += " profilePageBarTabSelected";}
  if (nostrProfilePanelSelector=="grapevine") {className.grapevine += " profilePageBarTabSelected";}
  if (nostrProfilePanelSelector=="ratings") {className.ratings += " profilePageBarTabSelected";}
  if (nostrProfilePanelSelector=="scores") {className.scores += " profilePageBarTabSelected";}
  const selectPanel = (newPanelId) => {
    dispatch(updateNostrProfilePanelSelector(newPanelId));
  }
  return (
    <>
      <div style={{ width: '100%', maxHeight: '500px', textAlign: 'left', marginTop: '10px' }}>
        <div style={{ width: '100%', textAlign: 'left' }}>
          <div
            className={className.about}
            onClick={() => selectPanel(("about"))}
          >
            <center>About</center>
          </div>
          <div
            className={className.posts}
            onClick={() => selectPanel(("posts"))}
          >
            <center>Posts</center>
          </div>
          <div
            className={className.grapevine}
            onClick={() => selectPanel(("grapevine"))}
          >
            <center>Grapevine</center>
          </div>
          <div
            className={className.ratings}
            onClick={() => selectPanel(("ratings"))}
          >
            <center>Ratings</center>
          </div>
          <div
            className={className.scores}
            onClick={() => selectPanel(("scores"))}
          >
            <center>Scores</center>
          </div>
        </div>
      </div>
      <LowerPanelContent pubkey={pubkey} lowerPanelId={nostrProfilePanelSelector} />
    </>
  );
};

export default UserPanel;
