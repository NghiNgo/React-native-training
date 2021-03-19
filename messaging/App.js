import React from 'react'
import { View, StyleSheet, Alert, TouchableHighlight, Image, BackHandler } from 'react-native'

import Status from './components/Status'
import MessageList from './components/MessageList'
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils'
import Toolbar from './components/Toolbar'
export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };

  handlePressToolbarCamera = () => {

  };

  handlePressToolbarLocation = () => {
    const { messages } = this.state;

    navigator.geolocation.getCurrentPosition((position) => {
      const { coords: { latitide, longitude } } = position;

      this.setState({
        messages: [
          createLocationMessage({
            latitide,
            longitude,
          }),
          ...messages,
        ],
      });
    });
  }

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  }

  handleSubmit = (text) => {
    const { messages } = this.state;

    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null});
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const { messages } = this.state;
                this.setState({ messages: messages.filter(messages => messages.id !== id) });
              },
            },
          ],
        );
        /* It's fairly easy to call Alert incorrectly. If you're coming from the web, you might attempt
        to call Alert() rather than Alert.alert. You alse might try to call Alert.alert with parameters
        that are numbers instead of strings, e.g. our message id. Both of these will crash the app with
        confusing error messages. It's also possible to get into a corrupted state, where you'll have to
        restart the app before Alert.alert will function properly again. */
        break;
      case 'image':
        this.setState({ fullscreenImageId: id, isInputFocused: false });
        break;
      default:
        break;
    }
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  }

  renderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}></View>
    );
  }

  renderToolbar() {
    const { isInputFocused } = this.state;

    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(message => message.id === fullscreenImageId);

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  }

  // componentWillMount() {
  //   this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
  //     const { fullscreenImageId } = this.state;

  //     if (fullscreenImageId) {
  //       this.dismissFullscreenImage();
  //       return true;
  //     }

  //     return false;
  //   });
  // }

  // componentWillUnmount() {
  //   this.subscription.remove();
  // }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  /* We'll use the built-in StyleSheet.absoluteFillObject so that our overlay background is fullscreen,
  and then we'll add zIndex: 2 so that it renders on top of rest of our UI. Our image should fill the
  overlay, so we use flex: 1. */
});

