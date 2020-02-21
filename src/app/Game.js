import React from "react";
import Letter from "../features/words/Letter";
import { useLetterData } from "../features/words/hooks";
import SpriteMap from "../SpriteMap";
import { Rectangle } from "../matter";

const Game = () => {
  const letters = useLetterData();
  return (
    <>
      <SpriteMap docs={letters}>
        <Letter letter="a" x={100} y={250} width={100} height={100} />
        <Letter letter="b" x={200} y={250} width={100} height={100} />
        <Letter letter="c" x={300} y={250} width={100} height={100} />
        <Letter letter="d" x={400} y={250} width={100} height={100} />
        <Letter letter="e" x={500} y={250} width={100} height={100} />
      </SpriteMap>
      <Rectangle
        x={500}
        y={350}
        width={1000}
        height={100}
        options={{ isStatic: true }}
      />
      <Rectangle x={600} y={250} width={100} height={100} />
    </>
  );
};

export default React.memo(Game);
