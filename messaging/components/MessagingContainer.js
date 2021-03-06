import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler, LayoutAnimation, Platform, UIManager, View } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const INPUT_METHOD = {
  NONE: 'NONE',
  KEYBOARD: 'KEYBOARD',
  CUSTOM:'CUSTOM',
};

export default class MessagingContainer extends React.Component {
  static propTypes = {
    // From 'KeyboardState'
    containerHeight: PropTypes.number.isRequired,
    contentHeight: PropTypes.number.isRequired,
    keyboardHeight: PropTypes.number.isRequired,
    keyboardVisible: PropTypes.bool.isRequired,
    keyboardWillShow: PropTypes.bool.isRequired,
    keyboardWillHide: PropTypes.bool.isRequired,
    keyboardAnimationDuration: PropTypes.number.isRequired,

    // Managing the IME type
    inputMethod: PropTypes.oneOf(Object.values(INPUT_METHOD)).isRequired,
    onChangeInputMethod: PropTypes.func,

    // Rendering content
    children: PropTypes.node,
    renderInputMethodEditor: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
    onChangeInputMethod: () => {},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { onChangeInputMethod } = this.props;
    /* Since inputMethod will be stored in the state of the parent, we'll call onChangeInputMethod
    and let the parent pass this prop back down. We could store inputMethod in the state of
    MessagingContainer, but since the parent needs to access this value, it's best that the parent
    stores it. */

    if (!this.props.keyboardVisible && nextProps.keyboardVisible) {
      // Keyboard shown
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      // Keyboard hidden
      this.props.keyboardVisible &&
      !nextProps.keyboardVisible &&
      this.props.inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    const { keyboardAnimationDuration } = nextProps;

    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity,
    );
    LayoutAnimation.configureNext(animation);
  }

  componentDidMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { onChangeInputMethod, inputMethod } = this.props;

      if (inputMethod === INPUT_METHOD.CUSTOM) {
        onChangeInputMethod(INPUT_METHOD.NONE);
        return true;
      }

      return false;
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const {
      children,
      renderInputMethodEditor,
      inputMethod,
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide
    } = this.props;
    /* For our outer 'View', we want to choose between rendering at full
    height ('containerHeight') or only the height above the keyboard ('contentHeight').
    If the keyboard is currently appearing ('keyboardWillShow' is 'true') or if it's
    fully visible ('inputMethod === INPUT_METHOD.KEYBOARD'), we should use 'contentHeight'. */

    const useContentHeight = keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

    const containerStyle = {
      height: useContentHeight ? contentHeight : containerHeight,
    };

    /* We want to render our custom input when the user has pressed the camera
    button ('inputMethod === INPUT_METHOD.CUSTOM'), so long as the keyboard
    isn't currently appearing (which would mean the input field has received
    focus, but we haven't updated the 'inputMethod' yet). */

    const showCustomInput = inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

    /* If 'keyboardHeight' is '0', this means a hardware keyboard is connected
    to the device. We still want to show our custom image picker when a
    hardware keyboard is connected, so let's set 'keyboardHeight' to '250'
    in this case. */

    // The keyboard is hidden and not transitioning up
    const keyboardIsHidden = inputMethod === INPUT_METHOD.NONE && !keyboardWillShow;

    // The keyboard is visible and transition down
    const keyboardIsHiding = inputMethod === INPUT_METHOD.KEYBOARD && keyboardWillHide;

    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0,
    };

    return (
      <View style={containerStyle}>
        {children}
        <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}