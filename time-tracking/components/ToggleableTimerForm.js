import React from 'react'
import { StyleSheet, View } from 'react-native'

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

// export default function ToggleableTimerForm({ isOpen }) {
//   return (
//     <View style={[styles.container, !isOpen && styles.buttonPadding]}>
//       {isOpen ? <TimerForm /> : <TimerButton title="+" color="black" />}
//     </View>
//   )
// }

export default class ToggleableTimerFrom extends React.Component {
  state = {
    isOpen: false,
  };

  hadleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm />
        ) : (
          <TimerButton title="+" color="black" onPress={this.hadleFormOpen} />
          /* When the TimerButton is pressed, the function handleFormOpen() will be invoked. handleFromOpen() modifies the state,
          setting isOpen to true. This causes the ToggleableTimerForm components to re-render. When render() is called this second
          time arround, this.state.isOpen is true and ToggleableTimerForm renders TimerForm. Neat.*/
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});

/* TimerForm does not receive any props from ToggleableTimerForm. As such, its title
and project fields will be rendered empty.
We're using a ternary operator again here to either return TimerForm or render a "+" button.
You could make a case that this should be its own component (say PlusButton) but at present we'll keep
the code inside ToggleableTimerForm. */
