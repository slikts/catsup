import { memo } from "react";
import { ValueObject, shallow } from "tuplerone";

export const randomSuffix = Math.round(Math.random() * 1e10).toString(32);

export const cESVG = name =>
  document.createElementNS("http://www.w3.org/2000/svg", name);

export const parseViewbox = viewbox => {
  const [x, y, width, height] = viewbox
    .trim()
    .split(/\s+/)
    .map(Number);
  return { x, y, width, height };
};

export const valueCompare = (prev, next) => {
  const nextValue = ValueObject(next);
  Object.assign(next, nextValue);
  return ValueObject(prev) === nextValue;
};
export const valueMemo = component => memo(component, valueCompare);
