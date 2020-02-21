import React, { createRef } from "react";
import Matter from "matter-js";
import Body from "./Body";
import { randomSuffix } from "../util";

const Circle = ({
  x,
  y,
  radius,
  clone = false,
  options = {},
  ...props
} = {}) => {
  const create = () => {
    const body = Matter.Bodies.circle(x, y, radius, options);
    if (clone) {
      const ref = createRef();
      const svg = (
        <circle
          cx={-radius / 2}
          cy={-radius / 2}
          r={radius}
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

export default React.memo(Circle);
