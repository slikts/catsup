import React, { useEffect, createRef, cloneElement } from "react";
import Matter from "matter-js";
import { useEngine } from "../matter";

const Constraint = ({ children, ...options }) => {
  const engine = useEngine();

  const bodyRefs = [createRef(), createRef()];

  useEffect(() => {
    if (!engine) {
      return;
    }

    const [{ current: bodyA }, { current: bodyB }] = bodyRefs;
    if (!bodyA || !bodyB) {
      return;
    }

    const constraint = Matter.Constraint.create({
      bodyA,
      bodyB,
      options
    });
    Matter.World.add(engine.world, constraint);

    return () => {
      Matter.World.remove(engine.world, constraint);
    };
  }, [options, bodyRefs, engine]);

  return bodyRefs.map((bodyRef, key) =>
    cloneElement(children[key], {
      bodyRef,
      key
    })
  );
};

export default React.memo(Constraint);
