import { Animated, StyleSheet, View, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Toggle from '../components/Toggle';
import configureTransition from '../utils/configureTransition';
import sleep from '../utils/sleep';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Each possible state is defined in an object called State near the top of the file
const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',
  WillTransitionOut: 'WillTransitionOut',
};
/* This object defines the possible states in our state machine. We'll set the component's transitionState
to each of these values as we animate the different views in our component. We'll then use
transitionState in the render method to determine how to render the component in its current
state. */
/* We define the possible states as constants in State, rather than assigning strings directly
to transitionState, both to avoid small bugs due to typos and to clearly document all the
possible states in one place. */
/* We can see that the Start screen begins in the Lauching state, since transitionState is initialized
to State.Lauching. The Start component will transition from Lauching when the app starts, to
WillTransitionIn when we're ready to fade in the UI, to WillTransitionOut when we're ready to
transition to the Game screen. */
/* We'll use this pattern of State an transitionState throughout the components in this app to keep
our asynchronous logic clear and explicit. */

const BOARD_SIZES = [3, 4, 5, 6];

export default class Start extends React.Component {
  static propTypes = {
    onChangeSize: PropTypes.func.isRequired,
    onStartGame: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
  };
  /* When we write the rest if this component, we'll be building the buttons that allow switching the
  size of the puzzle board. We'll receive the current size as a prop, and call onChangeSize when we
  want to update the size in the state of App. We'll also build a button for starting the game. When
  the user presses this button, we'll call the onStartGame prop so that App knows to instantiate a puzzle
  object and transition to the Game screen. */

  state = {
    transitionState: State.Launching,
  };
  /* This transitionState value indicates the current state of our state machine. */

  toggleOpacity = new Animated.Value(0);
  buttonOpacity = new Animated.Value(0);

  // /* We'll also add a little delay using await and our ultility function sleep so we see the logo in the initial
  // state for a short period of time before starting the animation. */
  // async componentDidMount() {
  //   await sleep(500);

  //   const animation = LayoutAnimation.create(
  //     750,
  //     LayoutAnimation.Types.easeInEaseOut,
  //     LayoutAnimation.Properties.opacity,
  //   );

  //   LayoutAnimation.configureNext(animation);

  //   this.setState({ transitionState: State.WillTransitionIn })
  // }
  // /* The logo should move up toward the top of the screen, and the "Choose Size" text and placeholder
  // buttons will fade in. */

  async componentDidMount() {
    await sleep(500);

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionIn});
    });

    Animated.timing(this.toggleOpacity, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.buttonOpacity, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }

  handlePressStart = async () => {
    const { onStartGame } = this.props;

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionOut });
    });

    onStartGame();
  };

  render() {
    const { size, onChangeSize } = this.props;
    const { transitionState } = this.state;

    const toggleStyle = { opacity: this.toggleOpacity };
    const buttonStyle = { opacity: this.buttonOpacity };

    return (
      transitionState !== State.WillTransitionOut && (
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo />
          </View>
          {transitionState !== State.Lauching && (
            <Animated.View style={toggleStyle}>
              <Toggle
                options={BOARD_SIZES}
                value={size}
                onChange={onChangeSize}
              />
            </Animated.View>
          )}
          {transitionState !== State.Lauching && (
            <Animated.View style={buttonStyle}>
              <Button title={'Start Game'} onPress={this.handlePressStart} />
            </Animated.View>
          )}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    alignSelf: 'stretch',
    paddingHorizontal: 40,
  },
});
