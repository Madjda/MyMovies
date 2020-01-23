// Components/Test.js

import React from 'react'
import { StyleSheet, View,Platform, Animated,Dimensions,PanResponder,Easing } from 'react-native'
import HelloWorld from './HelloWorld'

/*const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid')
})()*/

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition:0, //new Animated.Value(0) ,
      leftPosition:0 //new Animated.Value(0),
    }

  var {height, width} = Dimensions.get('window');
  this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
          let touches = evt.nativeEvent.touches;
          if (touches.length == 1) {
              this.setState({
                topPosition: touches[0].pageY - height/2,
                leftPosition: touches[0].pageX - width/2
              })
          }
      }
  })
}

  componentDidMount() {

   /* Animated.timing(
      this.state.topPosition,
      {
        toValue: 100,
        duration: 3000, // Le temps est en milliseconds ici (3000ms = 3sec)
        easing: Easing.linear,  // Animation curves from the website https://easings.net/fr 
      }
    ).start() */// N'oubliez pas de lancer votre animation avec la fonction start()

    /* Animated Types*/
    /*Animated.spring(
      this.state.topPosition,
      {
        toValue: 100,
        speed: 4,
        bounciness: 30
      }
    ).start();
    --------------------------------
      Animated.decay(
      this.state.topPosition,
      {
        velocity: 0.8,
        deceleration: 0.997,
      }
    ).start();
    */

 /* Animations combined in sequence & parallel*/
  /* Animated.sequence([
    Animated.spring(
      this.state.topPosition,
      {
        toValue: 100,
        tension: 8,
        friction: 3
      }
    ),
    Animated.timing(
      this.state.topPosition,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(2)
      }
    )
  ]).start()
  -----------------In paralle needs 2 values --------------------
    Animated.parallel([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3
        }
      ),
      Animated.timing(
        this.state.leftPosition,
        {
          toValue: 100,
          duration: 1000,
          easing: Easing.elastic(2)
        }
      )
    ]).start()
  
  
  */
}

  render() {
    return (
      <View style={styles.main_container}>
        { /* <Animated.View style={[styles.animation_view, { top: this.state.topPosition , left: this.state.leftPosition }]}>
        </Animated.View> */ }
      
          <View
          {...this.panResponder.panHandlers}
          style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
          </View>
      </View>
    )

     /* return (
      <View style={styles.main_container}>
        <HelloWorld/>
      </View>
    )
  return (
      { Platform.OS === 'ios' ? <Text>iOS</Text> : <Text>Android</Text> }
    )
    return (
    
      <View style={styles.main_container}>
        <View style={styles.subview_container}>
       
        </View>
      </View>
    )*/
  }
}

const styles = StyleSheet.create({

  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  } /* main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }*,

// Soit on utilise la fonction Platform.select

subview_container: {
  ...Platform.select({
    ios: {
      backgroundColor: 'red',
      height: 100,
      width: 50
    },
    android: {
      backgroundColor: 'blue',
      height: 50,
      width: 100
    }
  })
}

/* Soit on teste la valeur de l'OS

subview_container: {
  backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
  height: Platform.OS === 'ios' ? 100 : 50,
  width: Platform.OS === 'ios' ? 50 : 100
}*/
})

export default Test