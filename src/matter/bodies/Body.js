import React, { useEffect } from "react";
import Matter from "matter-js";
import { useEngine } from "../Engine";

const Body = ({ create, clone, setBody = null } = {}) => {
  const engine = useEngine();

  useEffect(() => {
    if (!engine) {
      return;
    }
    const body = create();
    if (setBody) {
      setBody(body);
    }

    if (clone) {
      body.clone = clone;
    }

    Matter.World.add(engine.world, body);

    return () => {
      Matter.World.remove(engine.world, body);
      if (setBody) {
        setBody(null);
      }
    };
  }, [setBody, engine, create, clone]);

  return null;
};

export default React.memo(Body);
