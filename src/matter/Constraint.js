import { useEffect, cloneElement, useState, useRef } from "react";
import Matter from "matter-js";
import { useEngine } from "../matter";
import { valueMemo } from "../util";

const Constraint = ({ children, length, ...options }) => {
  const engine = useEngine();

  const bodyARef = useRef();
  const bodyBRef = useRef();

  useEffect(() => {
    const { current: bodyA } = bodyARef;
    const { current: bodyB } = bodyBRef;
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
  }, [options, engine, length]);

  return [bodyARef, bodyBRef].map((bodyRef, key) =>
    cloneElement(children[key], {
      bodyRef,
      key
    })
  );
};

export default valueMemo(Constraint);
