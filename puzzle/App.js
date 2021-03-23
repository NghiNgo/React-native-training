import Constants from 'expo-constants';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  UIManager,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { createPuzzle } from './utils/puzzle';
import { getRandomImage } from './utils/api';
import Game from './screens/Game';
import Start from './screens/Start';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BACKGROUND_COLORS = ['#1B1D34', '#2A2A38'];

export default class App extends React.Component {
  state = {
    size: 3,
    /* The size of the slider puzzle, as an integer. We'll allow puzzles that are 3x3, 4x4, 5x5,
    or 6x6. We'll allow the user to choose a different size before starting a new game, and we'll
    initialize the new puzzle with the chosen size. */
    puzzle: null,
    /* Before a game begins or after a game ends, this value is null. If there's a current game,
    this object stores the state of the game's puzzle. The state of the puzzle should be considered
    immutable. The file utils/puzzle.js includes utility functions for interacting with the puzzle
    state object, e.g. moving squares on the board (which returns a new object). */
    image: null,
    /* The image to use in the slider puzzle. We'll fetch this image prior to starting the game
    so that (hopefully) we can fully download it before the game starts. That way we can avoid
    showing an ActivityIndicator and delaying the game. */
  };

  componentDidMount() {
    this.preloadNextImage();
  }

  async preloadNextImage() {
    const image = await getRandomImage();

    Image.prefetch(image.uri);

    this.setState({ image });
  }

  handleChangeSize = size => {
    this.setState({ size });
  };

  handleStartGame = () => {
    const { size } = this.state;

    this.setState({ puzzle: createPuzzle(size) });
  };

  handleGameChange = puzzle => {
    this.setState({ puzzle });
  };

  handleQuit = () => {
    this.setState({ puzzle: null, image: null });

    this.preloadNextImage();
  };

  render() {
    const { size, puzzle, image } = this.state;

    return (
      <LinearGradient style={styles.background} colors={BACKGROUND_COLORS}>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={styles.container}>
          {!puzzle && (
            <Start
              size={size}
              onStartGame={this.handleStartGame}
              onChangeSize={this.handleChangeSize}
            />
          )}
          {puzzle && (
            <Game
              puzzle={puzzle}
              image={image}
              onChange={this.handleGameChange}
              onQuit={this.handleQuit}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || parseInt(Platform.Version, 10) < 11
        ? Constants.statusBarHeight
        : 0,
  },
});
