export const chooseLanguage = lang => {
  console.log("chooseLanguage: " + lang);
  return {
    type: "chooseLanguage",
    payload: lang
  };
};
export const translateWord = (text, wordX, wordY) => {
  console.log("translateWord: " + text);
  return {
    type: "translateWord",
    payload: {
      Text: text,
      X: wordX,
      Y: wordY
    }
  };
};
export const downloadingLanguage = langName => {
  console.log("downloadLanguage: " + langName);
  return {
    type: "downloadLanguage",
    payload: langName
  };
};
