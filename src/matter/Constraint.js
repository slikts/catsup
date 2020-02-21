import React, { useEffect, cloneElement, useState } from "react";
import Matter from "matter-js";
import { useEngine } from "../matter";

const Constraint = ({ children, length, ...options }) => {
  const engine = useEngine();

  const [bodyA, setBodyA] = useState();
  const [bodyB, setBodyB] = useState();

  useEffect(() => {
    if (!engine) {
      return;
    }

    if (!bodyA || !bodyB) {
      return;
    }

    console.log(options);

    const constraint = Matter.Constraint.create({
      bodyA,
      bodyB,
      length,
      ...options
    });
    Matter.World.add(engine.world, constraint);

    return () => {
      Matter.World.remove(engine.world, constraint);
    };
  }, [options, engine, bodyA, bodyB, length]);

  return [setBodyA, setBodyB].map((setBody, key) =>
    cloneElement(children[key], {
      setBody,
      key
    })
  );
};

export default React.memo(Constraint);
