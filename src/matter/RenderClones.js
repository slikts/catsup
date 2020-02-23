import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import Render from "./Render";
import { useEngine } from "./Engine";
import styles from "./RenderClones.module.scss";
import { valueMemo } from "./util";

const RenderDOM = ({ children, options, margin = 40, ...props }) => {
  const engine = useEngine();
  const { width, height } = options;
  const [bodies] = useState(new Set());
  const [clones, setClones] = useState(null);

  useEffect(() => {
    const updateClones = (...bodies) => {
      // TODO: make it more efficient
      const _bodies = [...bodies];
      const svg = _bodies.map(({ clone: { el } }) => el).filter(Boolean);
      const dom = _bodies.map(({ clone: { svg } }) => svg).filter(Boolean);
      setClones({
        svg,
        dom
      });
    };
    updateClones();

    Matter.Events.on(engine.world, "afterAdd", ({ object }) => {
      if (!object.clone) {
        return;
      }
      bodies.add(object);
      updateClones();
    });
    Matter.Events.on(engine.world, "afterRemove", ({ object }) => {
      if (!object.clone) {
        return;
      }
      bodies.delete(object);
      updateClones();
    });
    Matter.Events.on(engine, "afterUpdate", ({ timestamp }) => {
      for (const body of bodies) {
        if (body.isSleeping) {
          return;
        }

        const { x, y } = body.position;
        const clone = body.clone.ref.current;

        clone.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      }
    });

    return () => {
      // TODO: proper cleanup
      bodies.clear();
      updateClones();
    };
  }, [bodies, engine]);

  return (
    <Render {...props} options={options}>
      <div className={styles.domClones}>{clones?.dom}</div>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svgClones}>
        {clones?.svg}
      </svg>
      {children}
    </Render>
  );
};

export default valueMemo(RenderDOM);
