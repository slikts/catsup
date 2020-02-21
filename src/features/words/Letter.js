import React from "react";
import { useLetter } from "./hooks";
import Shape from "../../matter/extra/Shape";
import styles from "./Letter.module.scss";

const Letter = ({ letter, ...props }) => {
  const letterData = useLetter(letter);

  if (!letterData) {
    return null;
  }
  const { id, shape } = letterData;

  return (
    <Shape
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
  );
};

export default React.memo(Letter);
