import React from 'react'

import TimerForm from './TimerForm';
import Timer from './Timer';

export default function EditableTimer({
  // Think of functional components as components that only need to implement the render() method.
  // They don't manage state and don't need any of React's special lifecycle hooks.
  // The props are passed in as the first argument to the function. We don't use this when working
  // with functional components. Here, we use destructuring to extract all the props from the props object.
  id,
  title,
  project,
  elapsed,
  isRunning,
  editFormOpen,
}) {
  if (editFormOpen) {
    return <TimerForm id={id} title={title} project={project} />;
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
    />
  );
}

/* Two main reasons to use function components
- First, using functional components where possible encourages developers to manage state in fewer locations.
This makes our programs easier to reason about.
- Second, using functional components are a great way to create reuseable components. Because functional components
need to have all their configuration passed from the outside, they are easy to reuse across apps or objects.
A good rule of thumb is to use functional components as much as possible. If we don't need any lifecycle methods and
can get away with only a render() function, using a functional component is a great choice. */
// React still allows us to set propTypes and defaultProps on functional components
