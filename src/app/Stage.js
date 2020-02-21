import React, { useRef } from "react";

const Stage = () => {
  const element = useRef();

  return <div ref={element} />;
};

export default Stage;
