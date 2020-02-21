import React, { useLayoutEffect, useState } from "react";
import Matter from "matter-js";
// import { produce } from "immer";
import Render from "./Render";
import { useEngine } from "./Engine";
import styles from "./RenderClones.module.scss";
import { useRerender } from "./hooks";

const RenderDOM = ({ children, options, margin = 40, ...props }) => {
  const engine = useEngine();
  const { width, height } = options;
  const [bodies] = useState(new Set());
  const _bodies = [...bodies];
  const domClones = _bodies.map(({ clone: { el } }) => el).filter(Boolean);
  const svgClones = _bodies.map(({ clone: { svg } }) => svg).filter(Boolean);
  const rerender = useRerender();

  useLayoutEffect(() => {
    if (!engine) {
      return;
    }

    Matter.Events.on(engine.world, "afterAdd", ({ object }) => {
      if (!object.clone) {
        return;
      }
      bodies.add(object);
      rerender();
    });
    Matter.Events.on(engine.world, "afterRemove", ({ object }) => {
      if (!object.clone) {
        return;
      }
      bodies.remove(object);
      rerender();
    });
    Matter.Events.on(engine, "afterUpdate", ({ timestamp }) => {
      for (const body of _bodies) {
        if (body.isSleeping) {
          return;
        }

        // console.log(body);

        const { x, y } = body.position;
        const clone = body.clone.ref.current;
        // const { min, max } = body.bounds;
        // clone.style.width = `${max.x - min.x + margin}px`;
        // clone.style.height = `${max.y - min.y + margin}px`;

        clone.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      }
    });
  }, [_bodies, bodies, engine, margin, rerender]);

  return (
    <Render {...props} options={options}>
      <div className={styles.domClones}>{domClones}</div>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svgClones}>
        {svgClones}
      </svg>
      {children}
    </Render>
  );
};

export default React.memo(RenderDOM);
