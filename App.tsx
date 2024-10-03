import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLottieView from 'lottie-react-native';


export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Icon name="rocket" size={30} color="#990033" />

      <AnimatedLottieView
        loop
        autoPlay
        source={require('./src/images/church.json')}
        style={{height: 250, width: 250}}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
