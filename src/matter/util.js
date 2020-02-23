import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

export const randomSuffix = Math.round(Math.random() * 1e10).toString(32);

// export const valueMemo = component => memo(component, isEqual);
export const valueMemo = component => {
  const q = (a, b) => {
    console.log(a, b);

    console.log(isEqual(a, b));

    return isEqual(a, b);
  };

  return memo(component, q);
};

const useEffectOnce = callback => {
  const [done, setState] = useState();
  useEffect(() => {
    if (done) {
      return;
    }
    const result = callback();
  });
};
