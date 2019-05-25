import React, { Component } from "react";
import { css } from "emotion";
import Translation from "./Translation.jsx";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { downloadingLanguage, translateWord } from "../actions/actions";
import axios from "axios";

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
    this.separationSymbol = "▒";
    // german, french, spanish
    const activeText = props.text
      .replace(this.separationSymbol, "")
      .replace(
        /[\wäöüÄÖÜßàâæéèëêïîôœùûüÿáéíóúüñ]+/g,
        this.separationSymbol + "$&" + this.separationSymbol
      );
    this.state = {
      activeText: activeText,
      translationWord: "1212",
      translationX: -1000,
      translationY: -1000
    };
    this.downloadLanguage();
  }

  render() {
    console.log("Reader render");
    let isWord = this.state.activeText[0] === this.separationSymbol;
    const activeTextItems = this.state.activeText.split(this.separationSymbol);

    const result = activeTextItems.map((item, index) => {
      isWord = !isWord;
      if (isWord)
        return (
          <span className={wordStyle} key={index} onClick={this.wordClick.bind(this)}>
            {item}
          </span>
        );
      else return <span key={index}>{item}</span>;
    });
    return (
      <div>
        <div className={myStyle}>{result}</div>
        <Translation />
      </div>
    );
  }

  downloadLanguage() {
    this.props.downloadingLanguage("German");
    axios
      .post("/getlang", { lang: "de" })
      .then(response => {
        console.log("loadLang() response:");
        console.log(response);
        this.props.downloadingLanguage(null);
        this.props.saveLanguage({
          name: "German",
          symbol: "de",
          dictinary: response.data,
          isLoaded: true
        });
      })
      .catch(error => {
        console.log("loadLang() error:");
        console.log(error);
        this.props.downloadingLanguage(null);
      });
  }

  wordClick(e) {
    console.log(e.target);
    const rect = e.target.getBoundingClientRect();
    // this.setState({
    //     translationWord: this.props.languages.join(', '),
    //     translationX: rect.x,
    //     translationY: rect.y
    // });
    const str = this.getTranslation(e.target.innerText);
    this.props.translateWord(str, rect.x, rect.y);
  }

  getTranslation(word) {
    const dict = this.props.languages.current.dictinary;
    word = word.trim().toLowerCase();
    if (word.length > 6) word = word.slice(0, word.length - 2);
    if (word.length > 8) word = word.slice(0, word.length - 3);
    console.log("cutted word:" + word);
    const match = dict.match(
      new RegExp("[^\n]*" + word + "[^\n]*/[^\n]*/[^\n]*\n.+", "gim")
    );
    console.log(match);
    return match.join("\n");
    /* if (match.length > 0)
            return match[0];
        else
            return "";*/
  }
}

function mapStateToProps(state) {
  return {
    serverUrl: state.serverUrl,
    languages: state.languages
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      downloadingLanguage: downloadingLanguage,
      translateWord: translateWord,
      saveLanguage: function(lang) {
        return {
          type: "saveLanguage",
          payload: lang
        };
      }
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Reader);
