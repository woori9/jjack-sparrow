import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const WaitingScreen = () => {

  // const useInterval = callback => {
  //   const savedCallback = useRef();

  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   });

  //   useEffect(() => {
  //     const tick = () => {
  //       savedCallback.current();
  //     };

  //     const ticking = setInterval(tick, 1000);
  //     return () => clearInterval(ticking);
  //   }, []);
  // };

  // useInterval(setCurrentTime);

  return (
    <View>
      <Text>Waiting Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WaitingScreen;
