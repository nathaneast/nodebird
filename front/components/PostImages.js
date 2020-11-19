import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImageZoom from './imagesZooms';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={{ width: "50%", display: 'inline-block' }} src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" style={{ width: "50%", display: 'inline-block' }} src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          width="50%"
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
