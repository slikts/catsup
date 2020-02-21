import React, { createRef } from "react";
import Matter from "matter-js";
import Body from "./Body";
import { randomSuffix } from "../util";
import { ValueObject } from "tuplerone";

const Rectangle = ({
  x,
  y,
  width,
  height,
  clone = false,
  options = ValueObject({}),
  ...props
}) => {
  const create = () => {
    const body = Matter.Bodies.rectangle(x, y, width, height, options);
    if (clone) {
      const ref = createRef();
      const svg = (
        <rect
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          ref={ref}
          key={`${body.id}__${randomSuffix}`}
        />
      );
      body.clone = {
        ref,
        svg
      };
    }

    return body;
  };

  return <Body create={create} {...props} />;
};

export default React.memo(Rectangle);
