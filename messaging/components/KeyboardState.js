import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard, Platform } from 'react-native'

export default class KeyboardState extends React.Component {
  static propType = {
    layout: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
    
  }
}
