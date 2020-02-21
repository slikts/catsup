import { useEffect, useState } from "react";
import letterPaths from "./letters.svg";
// import styles from "./Letter.module.scss";
import { randomSuffix } from "../../util";
import { useSprites } from "../../SpriteMap";

export const suffixID = id => `${id}__${randomSuffix}`;

export const useLetterData = () => {
  const [letters, setLetters] = useState();

  useEffect(
    () =>
      void fetch(letterPaths).then(async response => {
        const parser = new DOMParser();
        setLetters([
          parser.parseFromString(await response.text(), "image/svg+xml")
        ]);
      }),
    []
  );

  return letters;
};

export const useLetter = key => {
  const map = useSprites();

  return !map ? null : map.get(key);
};
