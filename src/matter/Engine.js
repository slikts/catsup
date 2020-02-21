import React, { useEffect, useState, createContext, useContext } from "react";
import Matter from "matter-js";

export const EngineContext = createContext();
const { Provider } = EngineContext;

export const useEngine = () => useContext(EngineContext);

const Engine = ({ options, children }) => {
  const [engine, setEngine] = useState();

  useEffect(() => {
    const engine = Matter.Engine.create(options);
    setEngine(engine);

    return () => {
      Matter.Engine.clear(engine);
      engine.enabled = false;
    };
  }, [options]);

  return <Provider value={engine}>{children}</Provider>;
};

export default React.memo(Engine);
