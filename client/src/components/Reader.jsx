import React, { Component } from 'react';
import { css } from 'emotion';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Translation from './Translation';
import { downloadingLanguage, translateWord } from '../actions/actions';

const myStyle = css`
  padding: 10px;
  color: rebeccapurple;
  font-size: 20px;
`;
const wordStyle = css`
  color: green;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

class Reader extends Component {
  constructor(props) {
    super(props);
    console.log('Reader constructor');
    this.separationSymbol = '▒';
    // german, french, spanish
    const activeText = props.text
      .replace(this.separationSymbol, '')
      .replace(
        /[\wäöüÄÖÜßàâæéèëêïîôœùûüÿáéíóúüñ]+/g,
        `${this.separationSymbol}$&${this.separationSymbol}`
      );
    this.state = {
      activeText,
      translationWord: '1212',
      translationX: -1000,
      translationY: -1000,
    };
    this.downloadLanguage();
  }

  downloadLanguage() {
    this.props.downloadingLanguage('German');
    axios
      .post('/getlang', { lang: 'de' })
      .then(response => {
        console.log('loadLang() response:');
        console.log(response);
        this.props.downloadingLanguage(null);
        this.props.saveLanguage({
          name: 'German',
          symbol: 'de',
          dictinary: response.data,
          isLoaded: true,
        });
      })
      .catch(error => {
        console.log('loadLang() error:');
        console.log(error);
        this.props.downloadingLanguage(null);
      });
  }

  wordClick(e) {
    const rect = e.target.getBoundingClientRect();
    // this.setState({
    //     translationWord: this.props.languages.join(', '),
    //     translationX: rect.x,
    //     translationY: rect.y
    // });
    const str = this.getTranslations(e.target.innerText);
    this.props.translateWord(str, rect.x, rect.y);
  }

  getTranslations(word) {
    const dict = this.props.languages.current.dictinary;
    let parsedWord = word.trim().toLowerCase();
    if (parsedWord.length > 6) parsedWord = parsedWord.slice(0, parsedWord.length - 2);
    if (parsedWord.length > 8) parsedWord = parsedWord.slice(0, parsedWord.length - 3);
    if (parsedWord.length > 10) parsedWord = parsedWord.slice(0, 8);
    console.log(`parsed word:${parsedWord}`);
    const matches = dict.match(
      new RegExp(`[^\n]*${parsedWord}[^\n]*/[^\n]*/[^\n]*\n.+`, 'gim')
    );
    console.log(matches);
    if (!matches) return null;
    const numOfTranslations = 5;
    return matches
      .sort((trans1, trans2) =>
        trans1.split('\n')[0].length > trans2.split('\n')[0].length ? 1 : -1
      )
      .slice(0, numOfTranslations)
      .map(trans => trans.split('\n').join(' — '))
      .join('\n');
  }

  render() {
    console.log('Reader render');
    const { activeText } = this.props;
    let isWord = activeText[0] === this.separationSymbol;
    const activeTextItems = activeText.split(this.separationSymbol);

    const result = activeTextItems.map((item, index) => {
      isWord = !isWord;
      if (isWord)
        return (
          <button
            type="button"
            className={wordStyle}
            key={item}
            onClick={this.wordClick.bind(this)}
          >
            {item}
          </button>
        );
      return <span key={item}>{item}</span>;
    });
    return (
      <div>
        <div className={myStyle}>{result}</div>
        <Translation />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    serverUrl: state.serverUrl,
    languages: state.languages,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      downloadingLanguage,
      translateWord,
      saveLanguage(lang) {
        return {
          type: 'saveLanguage',
          payload: lang,
        };
      },
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Reader);
