/* Our MessageList component will render an array of the message objects we defined in MessageUtils. We
can determine how to render each message based on its type. */
/* Let's start by determining the propTypes for this component. Here's a good opportunity to use the
MessageShape we just defined. We'll also want to notify the parent component whenever a message
in the list is pressed. We can do this using an onPressMessage function prop. */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
/* We should import MapView form Expo, rather than from React Native. MapView comes from
the 3rd party module react-native-maps, which Expo includes by default. If we had created
our app via react-native-cli rather than create-react-native-app, we would have to remember
to install and link react-native-maps. */
/* If you're running an Android emulator, you'll need the Google Play Services installed to
actually see a MapView (otherwise you'll see a placeholder label). You can create an emulator
from Android Studio with this, but it can be difficult to connect it to Expo. If you don't know
how to do this already, we recommend testing on a real Android device if possible. */
/* React Native used to include a built-in MapView, but this has been removed in favor of
react-native-maps. The react-native-maps module quickly became tge de-facto standard
for using maps in React Native, obsoleting the original built-in version. */

import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = item => item.id.toString();

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
  };

  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;

    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case 'image':
        return <Image style={styles.image} source={{ uri }} />;
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}
          >
            <MapView.Marker coordinate={coordinate} />
          </MapView>
        );
      default:
        return null;
    }
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  render() {
    const { messages } = this.props;

    return (
      <FlatList
        style={styles.container}
        inverted
        /* In a messaging app, we typically want new message to appear at the bottom of the list.
        To accomplish this, we're added the inverted prop to our FlatList. This "new-message-at-the-bottom"
        behavior is difficult to achieve without using inverted. If we didn't use the inverted, every time a
        new message is added, we would have to scroll to the bottom of the list by adding a ref to the list and
        calling the scrollToEnd method. While it may sound relatively simple, it quickly gets complicated when
        we start adding asynchronous animations, e.g. in response to the keyboard appearing. Since ScrollView
        doesn't support inverted, we almost always want to use a FlatList for this. */
        /* Behind-the-scenes, out FlatList is vertically inverted using a transform style, and then each
        row within the list is also vertically inverted. Since rows are doubly inverted, they
        appear right-side-up. Pretty clever! */
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps={'handled'}
        /* We use the keyboardShouldPersistTaps prop to configure what happens when we tap the FlatList.
        This prop has three possible options:
          - never: Tapping the list will dismiss the keyboard and blur any focused elements. This is the
        default behavior.
          - always: Tapping the list will have no effect on the keyboard on forcus.
          - handled: Tapping the list will dismiss the keyboard, unless the tap is handled by a child
        element first (e.g. tapping a message within the list). We want handled, so that we enable
        tapping messages without dismissing the keyboard. */
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible', // Prevent clipping on resize!
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60,
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});
