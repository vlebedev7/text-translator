import React, { Component } from "react";
import { css } from "emotion";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const getMyStyle = props => css`
  position: absolute;
  left: ${props.translateWord.x - 20}px;
  top: ${props.translateWord.y + 40}px;
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
    console.log("Translation render", this.props.translateWord);
    if (!this.props.translateWord || !this.props.translateWord.text)
      return null;

    return (
      <div className={getMyStyle(this.props)}>
        {this.props.translateWord.text.split("\n").map(item => (
          <p className={pStyle} key={item}>
            {item}
          </p>
        ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    translateWord: state.translateWord
  };
}
export default connect(mapStateToProps)(Translation);
