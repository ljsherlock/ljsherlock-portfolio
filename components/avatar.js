import React from "react";
import imageUrlFor from "../utils/imageUrlFor";

const Avatar = ({ image }) => {
  return (
    <React.Fragment>
      {
        image && <img 
        src={imageUrlFor(image).ignoreImageParams().width(64)}
        className='avatar' />
      }
      <style jsx>{`
        img.avatar {
          border-radius: 100%;
          display: block;
          height: auto;
          width: 32px;
          height: 32px;
          margin:0 1rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Avatar;
