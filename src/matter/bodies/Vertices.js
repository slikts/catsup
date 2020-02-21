import React, { createRef } from "react";
import Matter from "matter-js";
import Body from "./Body";

const px = n => `${n}px`;

const parseViewbox = viewbox => {
  const [x, y, width, height] = viewbox
    .trim()
    .split(/\s+/)
    .map(Number);
  return { x, y, width, height };
};

const Vertices = ({
  x,
  y,
  width,
  height,
  vertexSets,
  options = {},
  flagInternal = false,
  cloneID = null,
  ...props
} = {}) => {
  const create = () => {
    const body = Matter.Bodies.fromVertices(
      x,
      y,
      vertexSets,
      options,
      flagInternal
    );
    // console.log(body, cloneID);
    const ref = createRef();
    const { min, max } = body.bounds;
    // console.log(body.bounds, body.position, x, y);

    const _width = max.x - min.x;
    const _height = max.y - min.y;
    // console.log(223, width, _width, width / _width);
    const scale = Math.min(width / _width, height / _height);
    // const scaledWidth = width * scale;
    // const scaledHeight = height * scale;
    Matter.Body.scale(body, scale, scale);
    const viewBox = parseViewbox(
      document.querySelector(`#${cloneID}`).getAttribute("viewBox")
    );
    const scaledWidth = Math.abs((viewBox.width - viewBox.x) * scale);
    const scaledHeight = Math.abs((viewBox.height - viewBox.y) * scale);

    // console.log(2, vbw, vbh);

    const svg = (
      <use
        xlinkHref={`#${cloneID}`}
        ref={ref}
        key={cloneID}
        width={px(scaledWidth)}
        height={px(scaledHeight)}
        x={px(-scaledWidth / 2)}
        y={px(-scaledHeight / 2)}
      />
    );
    body.clone = {
      svg,
      ref
    };

    return body;
  };

  return <Body create={create} {...props} />;
};

export default React.memo(Vertices);
