//@ts-check

import React, { useState } from "react";
import { Engine, Rectangle, Constraint, Walls, RenderClones } from "../matter";
import styles from "./App.module.scss";
import Game from "./Game";

const App = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  const [[sceneWidth, sceneHeight], setSceneSize] = useState([
    clientWidth,
    clientHeight
  ]);
  const wallWidth = 100;

  return (
    <Engine options={{}}>
      <div className={styles.App}>
        <RenderClones
          className={styles.Render}
          options={{
            width: sceneWidth,
            height: sceneHeight,
            background: "transparent",
            wireframeBackground: "transparent"
          }}
          mouseConstraintOptions={{
            stiffness: 0.25,
            render: {
              visible: true
            }
          }}
        >
          {/* <Rectangle clone x={100} y={100} width={100} height={100} />
          <Rectangle x={100} y={100} width={100} height={100} />
          <Rectangle x={0} y={0} width={100} height={100} />
          <Constraint>
            <Rectangle x={200} y={100} width={100} height={100} />
            <Rectangle x={300} y={100} width={100} height={100} />
          </Constraint> */}
          <Walls
            x={-wallWidth}
            y={-wallWidth}
            width={sceneWidth + wallWidth}
            height={sceneHeight + wallWidth}
            wallWidth={100}
            options={{
              render: {
                visible: false
              }
            }}
          />
          <Game />
        </RenderClones>
      </div>
    </Engine>
  );
};

export default App;
