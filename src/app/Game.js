import React from "react";
import Letter from "../features/words/Letter";
import { useLetterData } from "../features/words/hooks";
import SpriteMap from "../SpriteMap";

const Game = () => {
  const letters = useLetterData();
  return (
    <SpriteMap docs={letters}>
      <Letter letter="a" x={200} y={200} width={100} height={100} />
      <Letter letter="b" x={200} y={200} width={100} height={100} />
      <Letter letter="c" x={200} y={200} width={100} height={100} />
      <Letter letter="d" x={400} y={200} width={100} height={100} />
      <Letter letter="e" x={400} y={200} width={100} height={100} />
    </SpriteMap>
  );
};

export default React.memo(Game);
