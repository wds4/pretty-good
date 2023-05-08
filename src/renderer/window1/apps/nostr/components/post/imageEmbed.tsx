import React from 'react';
import PropTypes from 'prop-types';

const ImageEmbed = ({ extractImageUrl }) => {
  if (extractImageUrl) {
    return (
      <div >
        <img src={extractImageUrl} style={{width: '100%'}} />
      </div>
    );
  }
  return <></>;
};
export default ImageEmbed;

const regExImage =
  /(https?:\/\/.*\.(?:png|gif|jpg))/i

export const extractImageUrl = (rawContent) => {
  const match = rawContent.match(regExImage);
  if (match) {
    // console.log("extractVideoUrl match[0]: "+match[0])
    // var match = extractVideoID(url)
    return match[0];
  }
  // return('Could not extract video ID.');
  return null;
}
