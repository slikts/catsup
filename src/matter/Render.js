import React, { useRef, useEffect } from "react";
import Matter from "matter-js";
import { useEngine } from "./Engine";
import styles from "./Render.module.scss";

const Render = ({
  options = {},
  enableMouse = false,
  mouseConstraintOptions = {},
  children,
  ...props
}) => {
  const elementRef = useRef();
  const engine = useEngine();

  useEffect(() => {
    if (!engine) {
      return;
    }

    const render = Matter.Render.create({
      element: elementRef.current,
      engine,
      options
    });
    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    if (enableMouse || mouseConstraintOptions) {
      const mouse = Matter.Mouse.create(render.canvas);
      render.mouse = mouse;

      if (mouseConstraintOptions) {
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse,
          constraint: mouseConstraintOptions
        });
        Matter.World.add(engine.world, mouseConstraint);
      }
    }

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    };
  }, [engine, options, mouseConstraintOptions, enableMouse]);

  return (
    <div {...props} ref={elementRef} className={styles.Render}>
      {children}
    </div>
  );
};

export default React.memo(Render);
