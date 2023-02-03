import React from 'react';
import { useNostrEvents } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'renderer/window1/apps/nostr/components/post';
import { doesEventValidate } from '../../../lib/nostr/eventValidation';
import { updateNostrEvents } from '../../../redux/features/nostr/settings/slice';

const UserPanel = () => {
  const pubkey = useSelector(
    (state) => state.nostrGlobalState.nostrProfileFocus
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className="h4">user panel</div>
      <div style={{ width: '1210px', height: '500px', textAlign: 'left' }}>
        <div style={{ width: '1210px', textAlign: 'left' }}>
          <div
            className="profilePageBarTab"
            id="profilePageBarTab_about"
            data-contentdescription="about"
          >
            <center>About</center>
          </div>
          <div
            className="profilePageBarTab"
            id="profilePageBarTab_posts"
            data-contentdescription="posts"
          >
            <center>Posts</center>
          </div>
          <div
            className="profilePageBarTab"
            id="profilePageBarTab_grapevine"
            data-contentdescription="grapevine"
          >
            <center>Grapevine</center>
          </div>
          <div
            className="profilePageBarTab"
            id="profilePageBarTab_ratings"
            data-contentdescription="ratings"
          >
            <center>Ratings</center>
          </div>
          <div
            className="profilePageBarTab"
            id="profilePageBarTab_scores"
            data-contentdescription="scores"
          >
            <center>Scores</center>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPanel;
