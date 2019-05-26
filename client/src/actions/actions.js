import { SelectedWord } from '../data/models';

export const chooseLanguage = lang => {
  console.log(`chooseLanguage: ${lang}`);
  return {
    type: 'chooseLanguage',
    payload: lang,
  };
};
export const selectedWord = (text, wordX, wordY) => {
  console.log(`selectedWord: ${text}`);
  return {
    type: 'selectedWord',
    payload: new SelectedWord(text, wordX, wordY),
  };
};
export const downloadingLanguage = langName => {
  console.log(`downloadLanguage: ${langName}`);
  return {
    type: 'downloadLanguage',
    payload: langName,
  };
};
