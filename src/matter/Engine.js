import React, { useState, createContext, useContext } from "react";
import Matter from "matter-js";
import useDeepCompareEffect from "use-deep-compare-effect";
import { valueMemo } from "./util";

export const EngineContext = createContext();
const { Provider } = EngineContext;
export const useEngine = () => useContext(EngineContext);

const Engine = ({ options, children }) => {
  const [engine, setEngine] = useState();

  useDeepCompareEffect(() => {
    const engine = Matter.Engine.create(options);
    setEngine(engine);

    return () => {
      Matter.Engine.clear(engine);
      engine.enabled = false;
      setEngine(null);
    };
  }, [options]);

  return engine ? <Provider value={engine}>{children}</Provider> : null;
};

export default valueMemo(Engine);
