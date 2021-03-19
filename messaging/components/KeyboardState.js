import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard, Platform } from 'react-native'

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends React.Component {
  static propType = {
    layout: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { layout: { height } } = props;

    this.state = {
      contentHeight: height,
      // The height available for our messaging content.
      keyboardHeight: 0,
      /* The height of the keyboard. We keep track of this so we set our image picker
      to the same size as the keyboard. */
      keyboardVisible: false,
      // Is the keyboard fully visible or fully hidden?
      keyboardWillShow: false,
      // Is the keyboard animating into view currently? IOS only.
      keyboardWillHide: false,
      // Is the keyboard animating out of view currently? IOS only.
      keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
      /* When we animate our UI to avoid the keyboard, we'll want to
      use the same animation duration as the keyboard. Let's initialize
      this with the value 250 (in milliseconds) as an approximation. */
    };
  }

  keyboardWillShow = (event) => {
    this.setState({ keyboardWillShow: true });
    this.measure(event);
  };

  keyboardDidShow = (event) => {
    this.setState({
      keyboardWillShow: false,
      keyboardVisible: true,
    });
    this.measure(event);
  };

  keyboardWillHide = (event) => {
    this.setState({ keyboardWillHide: true });
    this.measure(event);
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardWillHide: false,
      keyboardVisible: false,
    });
  };

  render() {
    const { children, layout } = this.props;
    const {
      contentHeight,
      keyboardHeight,
      keyboardVisible,
      keyboardWillShow,
      keyboardWillHide,
      keyboardAnimationDuration,
    } = this.state;

    return children({
      containerHeight: layout.height,
      contentHeight,
      keyboardHeight,
      keyboardVisible,
      keyboardWillShow,
      keyboardWillHide,
      keyboardAnimationDuration,
    });
  }
}
