import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import PropTypes from 'prop-types';
export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  // We can use the constructor method to initialize our component-specific data, or state.
  // We do this here because this method fires before our component is mounted and rendered.

  handleChangeText = text => {
  // handleChangeText = (text) => {
    this.setState({ text });
    // this.setState({ text: text });
  };
  // With later versions of JavaScript, we can define objects using shorthand form where possible.
  // Our handleChangeText method can also be written in a more explicit syntax

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: '' });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor='white'
          underlineColorAndroid='transparent' // remove dark underline on Android
          style={styles.textInput}
          clearButtonMode="always" //iOS only
          onChangeText={this.handleChangeText}
          // This method is invoked everytime the text within the input field is changed
          // With this, our TextInput returns the changed text as an argument which we're
          // attempting to pass into a separate method called handleChangeText. Currently
          // method is blank and we'll explore how we can complete it in a bit.
          onSubmitEditing={this.handleSubmitEditing}
          // The idea here is we don't necessarily want to communicate with our parent component
          // everytime the user changes the input field.
        />
      </View>
    )
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
