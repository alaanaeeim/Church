import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimatedLottieView from "lottie-react-native";
import SignUpScreen from "./src/screens/SignUpScreen";
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC-TJqRchnTCAmr9kI6e_27MBh9Iiaq6oc",
  authDomain: "church-378c8.firebaseapp.com",
  projectId: "church-378c8",
  storageBucket: "church-378c8.appspot.com",
  messagingSenderId: "758062370479",
  appId: "1:758062370479:web:d40e40d750dc59e1644e5a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Icon name="rocket" size={30} color="#990033" />

      <SignUpScreen />
      {/* <AnimatedLottieView
        loop
        autoPlay
        source={require('./src/images/church.json')}
        style={{height: 250, width: 250}}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
