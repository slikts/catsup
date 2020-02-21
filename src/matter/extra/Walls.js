import React from "react";
import Rectangle from "../bodies/Rectangle";

const Walls = ({ x, y, width, height, wallWidth = 100, options } = {}) => {
  const props = {
    options: {
      ...options,
      isStatic: true
    }
  };

  const top = {
    ...props,
    x: x + width / 2,
    y: y + wallWidth / 2,
    width: width,
    height: wallWidth
  };
  const bottom = {
    ...props,
    ...top,
    y: height - wallWidth / 2
  };
  const left = {
    ...props,
    x: x + wallWidth / 2,
    y: y + height / 2,
    height: height + wallWidth * 2,
    width: wallWidth
  };
  const right = {
    ...props,
    ...left,
    x: width - wallWidth / 2
  };

  return (
    <>
      <Rectangle {...top} />
      <Rectangle {...bottom} />
      <Rectangle {...left} />
      <Rectangle {...right} />
    </>
  );
};

export default React.memo(Walls);
