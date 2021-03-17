import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Feed from './screens/Feed';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Feed style={styles.feed} />
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
