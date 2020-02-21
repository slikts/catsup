import React from "react";
import { useLetter } from "./hooks";
import Shape from "../../matter/extra/Shape";

const Letter = ({ letter, ...props }) => {
  const letterData = useLetter(letter);

  if (!letterData) {
    return null;
  }
  const { id, shape } = letterData;

  return <Shape paths={[shape]} cloneID={id} {...props} />;
};

export default React.memo(Letter);
