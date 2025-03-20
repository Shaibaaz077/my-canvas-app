import React from 'react';
import './BoundingBox.css';

const BoundingBox = ({ box }) => {
  const { x, y, width, height, label } = box;

  return (
    <div
      className="bounding-box"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <span className="label">{label}</span>
    </div>
  );
};

export default BoundingBox;
