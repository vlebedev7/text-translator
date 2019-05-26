import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';
import cssValues from '../data/cssValues';
import { SelectedWord } from '../data/models';

const getMyStyle = props => css`
  position: absolute;
  left: ${props.selectedWord.x - 20}px;
  top: ${props.selectedWord.y + 40}px;
  padding: 10px;
  background-color: ${cssValues.colors.black};
  color: white;
  font-size: 20px;
`;
const pStyle = css`
  padding: 1px;
  margin: 0;
`;

const Translation = props => {
  const { selectedWord } = props;
  console.log('Translation render', selectedWord);
  if (!selectedWord || !selectedWord.text) return null;

  return (
    <div className={getMyStyle(props)}>
      {selectedWord.text.split('\n').map(item => (
        <p className={pStyle} key={item}>
          {item}
        </p>
      ))}
    </div>
  );
};
Translation.propTypes = {
  selectedWord: PropTypes.instanceOf(SelectedWord).isRequired,
};
function mapStateToProps(state) {
  return {
    selectedWord: state.selectedWord,
  };
}
export default connect(mapStateToProps)(Translation);
