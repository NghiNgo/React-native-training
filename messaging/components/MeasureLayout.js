import React from 'react'
import PropTypes from 'prop-types'
import { Platform, StyleSheet, View } from 'react-native'
import Constants from 'expo-constants';

export default class MeasureLayout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    layout: null,
  };

  handleLayout = event => {
    const { nativeEvent: { layout } } = event;

    this.setState({
      layout: {
        ...layout,
        y:
          layout.y +
          (Platform.OS === 'android' ? Constants.statusBarHeight: 0),
      },
    });
  };

  render() {
    const { children } = this.props;
    const { layout } = this.state;

    // Measure the available space with a placeholder view set to flex 1
    if (!layout) {
      return <View onLayout={this.handleLayout} style={styles.container} />
      /* Most React Native components accept an onLayout function prop. This is conceptually
      similar to a React lifecycle method: the function we pass is called every time the component
      updates its dimensions. We need to be careful when calling setState within this function,
      since setState may cause the component to re-render, in which case onLayout will get called
      again... and now we're stuck in an infinite loop! */
    }

    return children(layout);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
