import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { move, movableSquares, isSolved } from '../utils/puzzle';
import Board from '../components/Board';
import Button from '../components/Button';
import PuzzlePropType from '../validators/PuzzlePropType';
import Preview from '../components/Preview';
import Stats from '../components/Stats';
import configureTransition from '../utils/configureTransition';

const State = {
  LoadingImage: 'LoadingImage',
  WillTransitionIn: 'WillTransitionIn',
  RequestTransitionOut: 'RequestTransitionOut',
  WillTransitionOut: 'WillTransitionOut',
};

export default class Game extends React.Component {
  static propTypes = {
    puzzle: PuzzlePropType.isRequired,
    image: Image.propTypes.source,
    /* The puzzle and image props are used to display the puzzle board. When we want to change the
    puzzle, we'll pass an updated puzzle object to App using the onChange prop. */
    onChange: PropTypes.func.isRequired,
    onQuit: PropTypes.func.isRequired,
    /* We'll also present a button to allow quitting the game. When the user presses this button, we'll
    call onQuit, initiating a transition back to the Start sreen. */
  };

  static defaultProps = {
    image: null,
  };

  handlePressSquare = square => {
    const { puzzle, onChange } = this.props;
    const { moves } = this.state;

    if (!movableSquares(puzzle).includes(square)) return;

    const updated = move(puzzle, square);

    this.setState({ moves: moves + 1, previousMove: square });

    onChange(updated);

    if (isSolved(updated)) {
      this.requestTransitionOut();
    }
  };

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 16,
    alignSelf: 'stretch',
  },
});
