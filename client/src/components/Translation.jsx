import React, { Component } from "react";
import { css } from "emotion";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const myStyle = css`
  position: absolute;
  left: ${this.props.translateWord.X - 20}px;
  top: ${this.props.translateWord.Y + 40}px;
  padding: 10px;
  background-color: black;
  color: white;
  font-size: 20px;
`;
const pStyle = css`
  padding: 1px;
  margin: 0;
`;

class Translation extends Component {
  constructor(props) {
    super(props);
    console.log("Translation constructor");
    // console.log(this.result);
  }

  render() {
    console.log("Translation render");
    console.log(this.props.translateWord);
    if (!this.props.translateWord) return <div />;

    const result = this.props.translateWord.Text.split("\n").map(
      (item, index) => {
        return <p className={pStyle}>{item}</p>;
      }
    );
    return <div className={myStyle}>{result}</div>;
  }
}
function mapStateToProps(state) {
  return {
    translateWord: state.translateWord
  };
}
export default connect(mapStateToProps)(Translation);
