import { combineReducers } from 'redux';

// better to create a file for each purpose
function serverUrl() {
  return '';
}
function languages(state = null, action) {
  switch (action.type) {
    case 'saveLanguage':
      console.log('saveLanguage', state);
      return {
        list: state.list
          .filter(item => item.symbol !== action.payload.symbol)
          .push(action.payload),
        current: action.payload,
      };
    default:
      if (state == null) {
        const defaultLangs = [
          {
            name: 'German',
            symbol: 'de',
            dictinary: null,
            isLoaded: false,
          },
          {
            name: 'French',
            symbol: 'fr',
            dictinary: null,
            isLoaded: false,
          },
        ];
        return { list: defaultLangs, current: defaultLangs[0] };
      }
      return state;
  }
}
function downloadingLanguage(state = null, action) {
  switch (action.type) {
    case 'downloadLanguage':
      return action.payload;
    default:
      return state;
  }
}
function chooseLanguage(state = null, action) {
  switch (action.type) {
    case 'chooseLanguage':
      return action.payload;
    default:
      return state;
  }
}
function translateWord(state = null, action) {
  switch (action.type) {
    case 'translateWord':
      return action.payload;
    default:
      return {
        text: null,
        x: 0,
        y: 0,
      };
  }
}

const reducers = combineReducers({
  serverUrl,
  languages,
  chooseLanguage,
  downloadingLanguage,
  translateWord,
});

export default reducers;
