import React, { Component } from "react";
import { css } from "emotion";
import { bindActionsCreators, bindActionCreators } from "redux";
import { connect } from "react-redux";

const myStyle = css`
  float: left;
  width: 200px;
  padding: 10px;
  border: 1px solid black;
  color: rebeccapurple;
  background-color: gray;
  font-size: 20px;
`;
const langStyle = css`
  padding: 5px;
  border-top: 1px solid black;
`;

class LangsPanel extends Component {
  constructor(props) {
    super(props);
    console.log("LangsPanel constructor");
  }
  langClick(e) {
    const el = e.target;
  }
  render() {
    const result = this.props.languages.list
      .sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      })
      .map((item, index) => {
        return (
          <div
            className={langStyle}
            key={index}
            onClick={this.langClick.bind(this)}
          >
            {item.name} {item.isLoaded ? "(loaded)" : ""}
          </div>
        );
      });
    return <div className={myStyle}>{result}</div>;
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(LangsPanel);
