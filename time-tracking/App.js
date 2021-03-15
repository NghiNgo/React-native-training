import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
        {/* is reponsible for wrapping components within a scrolling container */}
        {/* ScrollView renders all of its components at once, even those not currently shown in the screen */}
          <ToggleableTimerForm isOpen={false} />
          {/* <ToggleableTimerForm isOpen /> will give the same result as <ToggleableTimerForm isOpen={true}/> */}
          {/* This is used by the child component to determine whether to render a "+" or TimerForm.
          When ToggleableTimerForm is open, the form is being displayed*/}
          <EditableTimer
            id="1"
            title="Mow the lawn"
            project="House Chores"
            elapsed="8986300"
            isRunning
            // isRunning specifies whether the timer is running
          />
          <EditableTimer
            id="2"
            title="Bake squash"
            title="Kitchen Chores"
            elapsed="3890985"
            editFormOpen
            // editFormOpen specifies whether EditableTimer should display the timer's face or its edit form
          />
        </ScrollView>
        <Text> textInComponent </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15
  },
});
