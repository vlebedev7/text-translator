import { combineReducers } from 'redux';
import { Language, SelectedWord } from '../data/models';

// better to create a file for each purpose
function serverUrl() {
  return '';
}
function languages(state = null, action) {
  switch (action.type) {
    case 'saveLanguage':
      console.log('saveLanguage', state);
      return {
        list: [
          action.payload,
          ...state.list.filter(item => item.symbol !== action.payload.symbol),
        ],
        current: action.payload,
      };
    default:
      if (state == null) {
        const defaultLangs = [
          new Language('de', 'German'),
          new Language('fr', 'French'),
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
function selectedWord(state = null, action) {
  switch (action.type) {
    case 'selectedWord':
      return action.payload;
    default:
      return null;
  }
}

const reducers = combineReducers({
  serverUrl,
  languages,
  chooseLanguage,
  downloadingLanguage,
  selectedWord,
});

export default reducers;
