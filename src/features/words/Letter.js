import React from "react";
import { ValueObject } from "tuplerone";
import { useLetter } from "./hooks";
import { Shape, Constraint, Circle } from "../../matter";
import styles from "./Letter.module.scss";

const Letter = ({ x, y, letter, ...props }) => {
  const letterData = useLetter(letter);

  if (!letterData) {
    return null;
  }
  const { id, shape } = letterData;

  return (
    <Constraint
      render={ValueObject({
        visible: false
      })}
      stiffness={1}
    >
      <Circle
        x={x}
        y={y}
        radius={55}
        options={ValueObject({
          isSensor: true,
          render: {
            visible: false
          }
        })}
      />
      <Shape
        x={x}
        y={y}
        paths={ValueObject([shape])}
        cloneID={id}
        cloneProps={ValueObject({
          className: styles.Letter
        })}
        options={ValueObject({
          render: {
            visible: false
          }
        })}
        {...props}
      />
    </Constraint>
  );
};

export default React.memo(Letter);
