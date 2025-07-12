import { colours } from "./colours.js";
import { animals } from "./animals.js";
import { verbs } from "./verbs.js";
import { adverbs } from "./adverbs.js";
import { adjectives } from "./adjectives.js";


function removeWhiteSpace(word) {
  return word.replace(/ /g, "");
}

function getAWord(dictionary) {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    throw new Error("Empty Dictionary");
  }
  const word = dictionary[Math.floor(Math.random() * dictionary.length)];
  return removeWhiteSpace(word);
}

function getDefaultDictionaries() {
  return [colours, animals, verbs, adverbs, adjectives];
}

export { getAWord, getDefaultDictionaries };