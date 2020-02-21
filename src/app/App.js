//@ts-check

import React, { useState } from "react";
import { Engine, Walls, RenderClones } from "../matter";
import styles from "./App.module.scss";
import Game from "./Game";
import { ValueObject } from "tuplerone";

const App = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  const [[sceneWidth, sceneHeight], setSceneSize] = useState([
    clientWidth,
    clientHeight
  ]);
  const wallWidth = 100;

  return (
    <Engine options={ValueObject({})}>
      <div className={styles.App}>
        <RenderClones
          className={styles.Render}
          options={ValueObject({
            width: sceneWidth,
            height: sceneHeight,
            background: "transparent",
            wireframeBackground: "transparent"
          })}
          mouseConstraintOptions={ValueObject({
            stiffness: 0.25,
            render: {
              visible: true
            }
          })}
        >
          <Walls
            x={-wallWidth}
            y={-wallWidth}
            width={sceneWidth + wallWidth}
            height={sceneHeight + wallWidth}
            wallWidth={100}
            options={ValueObject({
              render: {
                visible: false
              }
            })}
          />
          <Game />
        </RenderClones>
      </div>
    </Engine>
  );
};

export default App;
