import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { css } from "emotion";

const myStyle = css`
  position: fixed;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  color: rebeccapurple;
  font-size: 20px;
`;

function LangDownload(props) {
  console.log("LangDownload constructor");
  const { downloadingLanguage } = props;
  if (!downloadingLanguage) return <div />;
  return <div className={myStyle}>Downloading {downloadingLanguage}...</div>;
}
LangDownload.propTypes = {
  downloadingLanguage: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    downloadingLanguage: state.downloadingLanguage
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(LangDownload);
