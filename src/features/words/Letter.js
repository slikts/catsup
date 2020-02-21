import React from "react";
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
      render={{
        visible: false
      }}
      stiffness={1}
    >
      <Circle
        x={x}
        y={y}
        radius={50}
        options={{
          isSensor: true,
          render: {
            visible: false
          }
        }}
      />
      <Shape
        x={x}
        y={y}
        paths={[shape]}
        cloneID={id}
        cloneProps={{
          className: styles.Letter
        }}
        options={{
          render: {
            visible: false
          }
        }}
        {...props}
      />
    </Constraint>
  );
};

export default React.memo(Letter);
