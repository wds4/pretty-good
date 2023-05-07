import React from 'react';
import PropTypes from 'prop-types';

// src={`https://www.youtube.com/embed/${embedId}`}
// vs:
// src={`${extractedUrl}`}
const YoutubeEmbed = ({ embedId, extractedVideoUrl }) => {
  const testUrl = 'https://www.youtube.com/watch?v=ljvpz2fEyVE';
  if (embedId) {
    return (
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
  }
  return <></>;
};
/*
YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};
*/
export default YoutubeEmbed;

const regExpVideoID =
  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
const youtubeRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&amp;v=))([\w-]{11})(?:\S+)?/g;

export const extractVideoID = (url) => {
  const match = url.match(regExpVideoID);
  if (match && match[7].length == 11) {
    // console.log("extractVideoID match[7]: "+match[7])
    return match[7];
  }
  // return('Could not extract video ID.');
  return null;
};
export const extractVideoUrl = (rawContent) => {
  const match = rawContent.match(youtubeRegex);
  if (match) {
    // console.log("extractVideoUrl match[0]: "+match[0])
    // var match = extractVideoID(url)
    return match[0];
  }
  // return('Could not extract video ID.');
  return null;
};
