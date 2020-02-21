import React from "react";
import Matter from "matter-js";
import Vertices from "../bodies/Vertices";

const Shape = ({ paths, sampleLength = 30, ...props }) => {
  if (!paths) {
    return null;
  }

  const vertexSets = paths.map(path =>
    Matter.Svg.pathToVertices(path, sampleLength)
  );

  return <Vertices vertexSets={vertexSets} {...props} />;
};

export default React.memo(Shape);
