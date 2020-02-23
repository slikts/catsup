import React, { createContext, useContext, useState, useEffect } from "react";
import { cESVG, randomSuffix } from "./util";

export const SpriteContext = createContext();
const { Provider } = SpriteContext;

export const useSprites = () => useContext(SpriteContext);

const spriteMap = cESVG("svg");
spriteMap.style.visibility = "hidden";
spriteMap.style.position = "absolute";
document.body.appendChild(spriteMap);

const SpriteMap = ({ docs, margin = 40, children }) => {
  const [map, setMap] = useState();

  useEffect(() => {
    if (!docs || map) {
      return;
    }

    const entries = docs
      .map(doc =>
        [...doc.querySelectorAll("[id]")].map(shape => {
          const id = shape.getAttribute("id");
          shape.removeAttribute("id");
          spriteMap.appendChild(shape);
          const randomID = `sprite__${id}__${randomSuffix}`;

          spriteMap.appendChild(shape);

          var BBox = shape.getBBox();

          const symbol = cESVG("symbol");
          symbol.setAttribute("id", randomID);
          symbol.appendChild(shape);
          const viewBox = `
            ${BBox.x - margin}
            ${BBox.y - margin}
            ${BBox.width + margin * 2}
            ${BBox.height + margin * 2}
          `;
          symbol.setAttribute("viewBox", viewBox);
          spriteMap.appendChild(symbol);

          return [id, { id: randomID, shape, symbol }];
        })
      )
      .flat();
    setMap(new Map(entries));

    return () => {
      if (map) {
        for (const [id, { symbol }] of map.entries()) {
          spriteMap.removeChild(symbol);
          map.remove(id);
        }
      }
    };
  }, [docs, map, margin]);

  return <Provider value={map}>{children}</Provider>;
};

export default SpriteMap;
