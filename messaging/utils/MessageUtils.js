import PropTypes from 'prop-types';

export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['text', 'image', 'location']),
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
});

/* By using this shape in the propTypes of a component, React will automatically warn us if we
accidentally pass invalid message data. Declaring our data models this way is also great for
documentation purposes: if another developer reads our component, they'ss know exactly what the
input data should look like, without having to spinkle console.log throughout the app and actually
run it. */
// Flow or TypeScript, we'll likely declare our types elsewhere and won't need to alse declare PropTypes.

let messageId = 0;

function getNextId() {
  messageId += 1;
  return messageId;
}
/* We created a utility getNextId() for getting a unique message id. It's important that we ensure
uniqueness for each id, since we'll be using the id as the key when rendering these messages in a list. */
/* We would likely want to use a more sophisticated id, such as a UUID, if we were actually
connecting with a backend. Incrementing a number works for our purposes, but once
messages are persisted or coming from multiple devices, there would be id collisions. */

export function createTextMessage(text) {
  return {
    type: 'text',
    id: getNextId(),
    text,
  };
}

export function createImageMessage(uri) {
  return {
    type: 'image',
    id: getNextId(),
    uri,
  };
}

export function createLocationMessage(coordinate) {
  return {
    type: 'location',
    id: getNextId(),
    coordinate,
  };
}

/* By exporting createTextMessage, createImageMessage and createLocationMessage, we can now
easily create new messages of each type from elsewhere in our app. We'll use these messages to
populate the FlatList. */
