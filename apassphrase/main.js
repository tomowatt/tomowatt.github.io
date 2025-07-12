import { getAMap, getEmojiDictionaries } from './emoji/emoji.js';
import { getAWord, getDefaultDictionaries } from './dictionary/dictionary.js';

// Constants
const ELEMENT_IDS = {
  passphrase: 'passphrase',
  emojiphrase: 'emojiphrase',
  emojis: 'emojis',
  passphraseBtn: 'passphraseBtn',
  emojiphraseBtn: 'emojiphraseBtn'
};

// Type definitions (for better code maintainability)
/**
 * @typedef {Object} Dictionary
 * @property {string[]} entries - Array of dictionary entries
 */

/**
 * @typedef {Object} PassphraseData
 * @property {string} passphrase - Generated passphrase
 */

/**
 * @typedef {Object} EmojiphraseData
 * @property {string} emojiphrase - Generated emojiphrase
 * @property {string} emojis - Generated emoji sequence
 */

// DOM Utilities
/**
 * @param {string} id - Element ID
 * @returns {HTMLElement}
 * @throws {Error} If element is not found
 */
function getElementById(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with ID ${id} not found`);
  }
  return element;
}

/**
 * @param {string} text - Text to display
 * @param {string} id - Element ID
 */
function updateElementText(text, id) {
  try {
    getElementById(id).textContent = text;
  } catch (error) {
    console.error(`Failed to update element ${id}:`, error);
  }
}

// Core Functions
/**
 * @returns {string[]} Array of words from dictionaries
 */
function getPassphraseArray() {
  try {
    const dictionaries = getDefaultDictionaries();
    if (!dictionaries || dictionaries.length === 0) {
      throw new Error('No dictionaries available');
    }
    return dictionaries.map(dict => getAWord(dict));
  } catch (error) {
    console.error('Failed to generate passphrase:', error);
    throw error;
  }
}

/**
 * @returns {Record<string, string>} Map of emoji names to icons
 */
function getEmojiphraseMap() {
  try {
    const dictionaries = getEmojiDictionaries();
    if (!dictionaries || dictionaries.length === 0) {
      throw new Error('No emoji dictionaries available');
    }
    const emojiphraseMap = {};
    dictionaries.forEach(dict => {
      const [name, icon] = getAMap(dict);
      emojiphraseMap[name] = icon;
    });
    return emojiphraseMap;
  } catch (error) {
    console.error('Failed to generate emojiphrase:', error);
    throw error;
  }
}

// JSON Creation Functions
/**
 * @param {string[]} passphraseArray - Array of words
 * @returns {string} string
 */
function createPassphraseJSON(passphraseArray) {
  return passphraseArray.join('-');
}

/**
 * @param {Record<string, string>} emojiphraseMap - Map of emoji names to icons
 * @returns {string} JSON string
 */
function createEmojiphraseJSON(emojiphraseMap) {
  const nameArray = Object.keys(emojiphraseMap);
  const iconArray = Object.values(emojiphraseMap);
  
  // Convert Unicode escape sequences to actual emoji characters
  const convertToEmoji = (code) => {
    if (code.startsWith('U')) {
      // Convert U0001F3C0 to \u{1F3C0}
      const hex = code.slice(1).match(/.{1,4}/g).join('');
      return String.fromCodePoint(parseInt(hex, 16));
    }
    return code;
  };

  const emojiArray = iconArray.map(convertToEmoji);
  return JSON.stringify({
    emojiphrase: nameArray.join(' '),
    emojis: emojiArray.join(' ')
  });
}

// Public Functions
/**
 * Generates and displays a new passphrase
 */
function generatePassphrase() {
  try {
    const passphraseArray = getPassphraseArray();
    const passphrase = createPassphraseJSON(passphraseArray);
    updateElementText(passphrase, ELEMENT_IDS.passphrase);
  } catch (error) {
    updateElementText('Error generating passphrase', ELEMENT_IDS.passphrase);
  }
}

/**
 * Generates and displays a new emojiphrase
 */
function generateEmojiphrase() {
  try {
    const emojiphraseMap = getEmojiphraseMap();
    const json = createEmojiphraseJSON(emojiphraseMap);
    const data = JSON.parse(json);
    updateElementText(data.emojiphrase, ELEMENT_IDS.emojiphrase);
    updateElementText(data.emojis, ELEMENT_IDS.emojis);
  } catch (error) {
    updateElementText('Error generating emojiphrase', ELEMENT_IDS.emojiphrase);
    updateElementText('Error generating emojis', ELEMENT_IDS.emojis);
  }
}

// Initialize event listeners
(() => {
  try {
    getElementById(ELEMENT_IDS.passphraseBtn).addEventListener('click', generatePassphrase);
    getElementById(ELEMENT_IDS.emojiphraseBtn).addEventListener('click', generateEmojiphrase);
  } catch (error) {
    console.error('Failed to initialize event listeners:', error);
  }
})();