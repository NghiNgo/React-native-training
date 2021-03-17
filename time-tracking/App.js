import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// The library's function uuidv4() will randomly generate a Universally Unique IDentifier for each
// of our timers. A UUID is a string that looks like this: 2030efbd-a32f-4fcc-8637-7c410896b3e3

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/TimerUtils';

export default class App extends Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      },
    ],
  };

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;

    this.setState({
      timer: [newTimer(timer), ...timer],
    });
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const {timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleFormSubmit = attrs => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const {title, project} = attrs;

          return {
            ...timer,
            title,
            project,
          };
        }

        return timer;
      }),
    });
  };

  handleRemovePress = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });
  };

  toggleTimer = timerId => {
    this.setState(prevState => {
      const { timers } = prevState;

      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer;

          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning,
            };
          }
          return timer;
        }),
      };
    });
  };

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
          {/* is reponsible for wrapping components within a scrolling container */}
          {/* ScrollView renders all of its components at once, even those not currently shown in the screen */}
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {/* isOpen boolean for ToggleableTimerForm and timer properties for EditableTimer.
            Stateful. The data is defined here. It changes over time. And it cannot be computed from other state or props. */}
            {/* <ToggleableTimerForm isOpen /> will give the same result as <ToggleableTimerForm isOpen={true}/> */}
            {/* This is used by the child component to determine whether to render a "+" or TimerForm.
            When ToggleableTimerForm is open, the form is being displayed*/}
            {timers.map(({ title, project, id, elapsed, isRunning }) => (
              /* Array's map(). If you're unfamiliar with the map method, it takes a function as an argument and calls it with each
              itme inside of the arry and builds a new array by using the return value form each function call */
              /* Since the timers array has two items, map will call this function twice, once for each timer. When map calls
              this function, it passes in as the first argument an item. The return value from this function call is inserted into
              the new array that map is constructing. After handling the last item, map returns this new array. Here, we're rendering
              this new array within our render() method */
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                // isRunning specifies whether the timer is running
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
            {/* timer attributes: Stateful. We define the data on each EditableTimer here. This data is mutable. And it
            cannot be computed from other state or props. */}
            {/* EditableTimer renders either Timer or TimerForm based on the prop editFormOpen. Timer and TimerForm are
            our app's bottom-level components. They hold the majority of the screen's UI. The components above them are
            primarily concerned with orchestration. */}
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingBottom: 15,
  },
  timerListContainer: {
    flex: 1,
  },
});
