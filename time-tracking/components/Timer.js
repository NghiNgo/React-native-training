import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from './TimerButton';

export default function Timer({ title, project, elapsed}) {
  /* The elapsed prop in this app is in milliseconds. This is the representation of the data that
  React will keep. This is a good representation for machines, but we want to show our users a more
  human-readable format. */
  const elapsedString = millisecondsToHuman(elapsed);
  /* The string it renders is in the format 'HH:MM:SS' */
  /* We could store elapsed in seconds as opposed to milliseconds, but JavaScripts's time functionality
  is all in milliseconds. We keep elapsed consistent with this for simplicity.*/

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{project}</Text>
      <Text style={styles.elapsedTime}>{elapsedString}</Text>
      <View style={styles.buttonGroup}>
        <TimerButton color="blue" small title="Edit" />
        <TimerButton color="blue" small title="Remove" />
      </View>
      <TimerButton color="#21BA45" title="Start" />
    </View>
  )
  // Timer properties. In this context, not stateful. Properties are passed down from the parent.
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
