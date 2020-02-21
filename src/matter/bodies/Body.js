import React, { useEffect } from "react";
import Matter from "matter-js";
import { useEngine } from "../Engine";

const Body = ({ create, clone, bodyRef } = {}) => {
  const engine = useEngine();

  useEffect(() => {
    if (!engine) {
      return;
    }
    const body = create();
    if (bodyRef) {
      bodyRef.current = body;
    }

    if (clone) {
      body.clone = clone;
    }

    Matter.World.add(engine.world, body);

    return () => {
      Matter.World.remove(engine.world, body);
      if (bodyRef) {
        bodyRef.current = null;
      }
    };
  }, [bodyRef, engine, create, clone]);

  return null;
};

export default React.memo(Body);
