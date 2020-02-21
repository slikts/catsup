const { promises: fsPromises } = require("fs");

const TextToSVG = require("text-to-svg");
const textToSVG = TextToSVG.loadSync("./tmp/soup.ttf");

const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));

const attributes = {};
const options = {
  fontSize: 72,
  anchor: "top",
  attributes: attributes
};

const result = {};
for (const letter of alphabet) {
  const path = textToSVG.getSVG(letter, options);
  result[letter] = path;
  fsPromises.writeFile(`src/letters/${letter}.svg`, path);
}

fsPromises.writeFile(`src/letterPaths.json`, JSON.stringify(result));
