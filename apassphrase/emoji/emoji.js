import { sports } from "./sports.js";
import { animals } from "./animals.js";
import { foods } from "./foods.js";
import { weathers } from "./weathers.js";

// Get a random icon-name pair from a dictionary
function getAMap(dictionary) {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    throw new Error("Empty Dictionary");
  }
  const entry = dictionary[Math.floor(Math.random() * dictionary.length)];
  const icon = Object.keys(entry)[0];
  const name = entry[icon];
  return [icon, name];
}

// Get all emoji dictionaries
function getEmojiDictionaries() {
  return [sports, animals, foods, weathers];
}

export { getAMap, getEmojiDictionaries };