import React from 'react';
import PropTypes from 'prop-types'
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import CameraRoll from '@react-native-community/cameraroll'

import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component {
  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  loading = false;
  cursor = null;

  state = {
    images: [],
  };

  componentDidMount() {
    this.getImages();
  }

  render() {
    const { images } = this.state;

    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        onEndReached={this.getNextImages}
        /* to notify is that we need to load more images. This is trickier than it sounds: the onEndReached
        function we pass may be called multiple times before we have finished loading a new set of images.
        We need to be careful not to load the same set of images twice. Let's start by calling getNextImages
        when we reach the end of the list. */
      />
    );
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const { onPressImage } = this.props;

    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };
  /* We abort getNextImages if this.cursor doesn't have a value. This stops us from loading the initial
  set if images again oncce we reach the end of the camera roll. If we preferred, we could instead record
  a boolean this.hasNextPage to help us track when we've reached the end. */

  getImages = async(after) => {
    if (this.loading) return;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    this.loading = true;
    /* We set this.loading = true before making the asynchronous call to getPhotos, and we wait till
    the asynchronous call to this.setState() has completed before setting this.loading = false. */

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const { edges, page_info: { has_next_page, end_cursor } } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState(
      {
        images: this.state.images.concat(loadedImages),
      },
      () => {
        this.loading = false;
        this.cursor = has_next_page ? end_cursor : null;
      },
    );
    /* The second parameter of this.setState is a completion callback. We can use this to avoid race
    conditions between the time we call this. setState and the time this.state is actually updated.
    If we didn't use the completion callback and instead set this.loading = false after calling
    this.setState, we would potentially access this.state.images before it had been updated, thus
    one set of the images we loaded would fail to be added to the list. */
  };
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
})
