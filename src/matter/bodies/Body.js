import React, { useEffect } from "react";
import Matter from "matter-js";
import { useEngine } from "../Engine";

const Body = ({ children: createBody, bodyRef = null } = {}) => {
  const engine = useEngine();

  useEffect(() => {
    const body = createBody();
    if (bodyRef) {
      bodyRef.current = body;
    }
    Matter.World.add(engine.world, body);

    return () => {
      Matter.World.remove(engine.world, body);
      if (bodyRef) {
        bodyRef.current = body;
      }
    };
  }, [engine, createBody, bodyRef]);

  return null;
};

export default Body;
