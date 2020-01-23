// Animations/EnlargeShrink.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class EnlargeShrink extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        viewSize: new Animated.Value(this._getSize())
    }
  }

  _getSize() {
    if (this.props.shouldEnlarge) {
      return 70
    }
    return 30
  }

   // La méthode componentDidUpdate est exécuté chaque fois que le component est mise à jour, 
   //c'est l'endroit parfait pour lancer / relancer notre animation.
  componentDidMount() {
    Animated.spring(
      this.state.positionLeft,
      {
        toValue: this._getSize
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ viewSize: this.state.viewSize }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default EnlargeShrink