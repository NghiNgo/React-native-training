import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import TimerButton from './TimerButton';

// export default function TimerForm({ id, title, project }) {
//   const submitText = id ? 'Update' : 'Create';
//   /* This variable uses the presence of props.id to determine what text the submit button at the bottom of the form should
//   display. If id is present, we know we're editing an existing timer, so it displays "Update". Otherwise, it displays "Create" */
//   /* We used an expression with the ternary operator to set the value of submitText. The syntax is:
//   condition ? expression1 : expression2 */

export default class TimerForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    project: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: null,
    title: '',
    project: '',
  };

  constructor(props) {
    super(props);

    const { id, title, project } = props;

    this.state = {
      title: id ? title : '',
      project: id ? project : '',
    };
  }

  handleTitleChange = title => {
    this.setState({ title });
  };

  handleProjectChange = project => {
    this.setState({ project });
  }

  handleSubmit = () => {
    const { onFormSubmit, id } = this.props;
    const { title, project } = this.state;

    onFormSubmit({
      id,
      title,
      project,
    });
  };

  render() {
    const { id } = this.props;
    const { title, project } = this.state;
    const submitText = id ? 'Update' : 'Create';
    const { id, onFormClose } = this.props;

    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Title</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleTitleChange}
              value={title}
              /* When the form is used for editing as it here, we want the fields to be populated with the current
              title and project values for this timer. Using defaultValue initializes these fields with current values,
              as desired. */
            />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Project</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleProjectChange}
              value={project}
              /* Laterm we'll use TimerForm again within ToggleableTimerForm for creating timers. ToggleableTimerForm 
              will not pass TimerForm the title or project props. We'll use defaultProps to default these values to empty strings. */
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TimerButton
            small
            color='#21BA45'
            title={submitText}
            onPress={this.handleSubmit}
          />
          <TimerButton
            small
            color='#DB2828'
            title="Cancel"
            onPress={onFormClose}
          />
        </View>
      </View>
    )
  }
  /* outside of TimerForm, we've identified our statefull data:
    - the list of timers and properties of each timer
    - whether or not the edit form of a timer is open
    - whether or not the create form is open.
  */
}
/* An example of lifecycle of TimerForm:
  1. On the page is a timer with the title "Mow the lawn".
  2. The user toggles open the edit form for this timer, mounting TimerForm to the screen.
  3. TimerForm initializes the state property title to the string "Mow the lawn".
  4. The user modifies the title input field, changing it to the value "Cut the grass".
  5. With every keystroke, React invokes handleTitleChange. The internal state of title is kept in-sync with
  what the user sees on the page. */

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    marginBottom: 5,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
