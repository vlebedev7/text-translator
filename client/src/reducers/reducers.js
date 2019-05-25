import { combineReducers } from "redux";

const reducers = combineReducers({
  serverUrl,
  languages,
  chooseLanguage,
  downloadingLanguage,
  translateWord
});

// better to create a file for each purpose
function serverUrl() {
  return "";
}
function languages(state = null, action) {
  switch (action.type) {
    case "saveLanguage":
      console.log("saveLanguage", state);
      const newState = {
        list: state.list.filter(item => item.symbol !== action.payload.symbol),
        current: action.payload
      };
      newState.list.push(action.payload);
      console.log("newState", newState);
      return newState;
    default:
      if (state == null) {
        const defaultLangs = [
          {
            name: "German",
            symbol: "de",
            dictinary: null,
            isLoaded: false
          },
          {
            name: "French",
            symbol: "fr",
            dictinary: null,
            isLoaded: false
          }
        ];
        return { list: defaultLangs, current: defaultLangs[0] };
      } else {
        return state;
      }
  }
}
function downloadingLanguage(state = null, action) {
  switch (action.type) {
    case "downloadLanguage":
      return action.payload;
    default:
      return state;
  }
}
function chooseLanguage(state = null, action) {
  switch (action.type) {
    case "chooseLanguage":
      return action.payload;
    default:
      return state;
  }
}
function translateWord(state = null, action) {
  switch (action.type) {
    case "translateWord":
      return action.payload;
    default:
      return {
        Text: "",
        X: 0,
        Y: 0
      };
  }
}

export default reducers;
