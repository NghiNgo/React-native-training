import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Comments from './screens/Comments';
import Feed from './screens/Feed';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export default class App extends React.Component {
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null,
  };

  openCommentSreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id,
    });
  };

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null,
    });
  };

  onSubmitComment = (text) => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, text],
    };

    this.setState({ commentsForItem: updated });

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to save comment', text, 'for', selectedItemId);
    }
  };

  async componentDidMount() {
    try {
      const commentsForItem = await AsyncStorage.getItem(
        ASYNC_STORAGE_COMMENTS_KEY,
      );

      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem): {},
      });
    } catch (e) {
      console.log('Failed to load comments');
    }
  }

  render() {
    const { commentsForItem, showModal, selectedItemId } = this.state;

    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComments={this.openCommentSreen}
        />
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            style={styles.container}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  feed: {
    flex: 1,
  },
  comments: {
    flex: 1,
  },
});

/*
WHAT TO DO IF A COMPONENT DOESN'T SHOW UP
Beginners and experts alike frequently run into the problem where a component doesn't render
anything on the screen. The most common reason for this is that the component has dimensions
equal to 0.
When using flex: 0 or no flex attribute, a component will only have a dimension greater than
0 along the primary axis if given explicitly (using a width or height attribute) or if its children
have dimensions greater than 0. Similarly, when using alignTimes: 'stretch', a child will only
have dimensions greater than 0 along the secondary axis if given explicitly or if the parent has
dimensions greater than 0.
Thus, when a component doesn't show up on the sreen, the first thing we should do is pass an
explicit width and height style attribute (and also a backgroundColor, just to make sure something
is visible). Once a component appears on the screen, we can start understanding the component
hierarchy and evaluating how to tweak our styles.
*/
