import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, PixelRatio, StyleSheet } from 'react-native';

export default class Grid extends React.Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    /* A function called with each item. Should return a React element. We want to
    intercept this function before passing it to FlatList. We're going to call it with the same
    arguments that FlatList would call it with, but we're going to add some extra information
    about the style of the item to render. */
    numColumns: PropTypes.number,
    /* The number of columns per row. We'll use this to calculate item dimensioins.
    We'll pass this to FlatList directly. */
    itemMargin: PropTypes.number,
    /* The vertical and horizontal spacing between each item in the grid. This prop
    doesn't need to be passed into FlatList. */
  };

  static defaultProps = {
    numColumns: 4,
    itemMargin: StyleSheet.hairlineWidth,
  };

  renderGridItem = (info) => {
    const { renderItem, numColumns, itemMargin } = this.props;

    const { width } = Dimensions.get('window');
    /* In React Native, we specify dimensions in terms of logical pixels rather than physical
    pixels. There may be multiple physical pixels per logical pixels in a device with a high
    pixel density, e.g. retina display. When we make calculations that can result in non-integer
    dimensions, we should use PixelRatio to help us align to the nearest physical pixel -
    otherwise, there may be visual inconsistencies (e.g. some elements or margins appear
    larger than others). */

    const { numColumns, itemMargin } = this.props;

    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin / (numColumns - 1)) / numColumns,
    );
    /* We now have a pixel-aligned size for each item in th grid. Let's also calculate the margins between
    elements. We can use the index of the item, which is passed to us automatically by the FlatList. */

    // We don't want to include a 'marginLeft' on the first item of a row
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    // We don't want to incluce a 'marginTop' on the first row of the grid
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
    /* We augment the info passed by FlatList with size, marginLeft and marginTop, so that we can
    render items at the correct size from within the renderItem function. */
  };

  render() {
    return <FlatList {...this.props} renderItem={this.renderGridItem} />;
  }
}
