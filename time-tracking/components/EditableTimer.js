import React from 'react'
import PropTypes from 'prop-types'

import TimerForm from './TimerForm';
import Timer from './Timer';

// export default function EditableTimer({
//   // Think of functional components as components that only need to implement the render() method.
//   // They don't manage state and don't need any of React's special lifecycle hooks.
//   // The props are passed in as the first argument to the function. We don't use this when working
//   // with functional components. Here, we use destructuring to extract all the props from the props object.
//   id,
//   title,
//   project,
//   elapsed,
//   isRunning,
//   editFormOpen,
// }) {
//   if (editFormOpen) {
//     // editFormOpen for a given timer. Stateful. The data is defined here. It changes over time. And it cannot be computed
//     // from other state or props.
//     return <TimerForm id={id} title={title} project={project} />;
//   }
//   return (
//     <Timer
//       id={id}
//       title={title}
//       project={project}
//       elapsed={elapsed}
//       isRunning={isRunning}
//     />
//   );
// }

export default class EditableTimer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
  };

  state = {
    editFormOpen: false,
  };

  handleEditPress = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = timer => {
    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    const {
      id,
      title,
      project,
      elapsed,
      isRunning,
      onRemovePress,
      onStartPress,
      onStopPress,
    } = this.props;
    const { editFormOpen } = this.state;

    if (editFormOpen) {
      return(
        <TimerForm
          id={id}
          title={title}
          project={project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    }

    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onEditPress={this.handleEditPress}
        onRemovePress={onRemovePress}
        onStartPress={onStartPress}
        onStopPress={onStopPress}
      />
    );
  }
}
/* Two main reasons to use function components
- First, using functional components where possible encourages developers to manage state in fewer locations.
This makes our programs easier to reason about.
- Second, using functional components are a great way to create reuseable components. Because functional components
need to have all their configuration passed from the outside, they are easy to reuse across apps or objects.
A good rule of thumb is to use functional components as much as possible. If we don't need any lifecycle methods and
can get away with only a render() function, using a functional component is a great choice. */
// React still allows us to set propTypes and defaultProps on functional components
