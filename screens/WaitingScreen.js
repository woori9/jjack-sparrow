import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { socket } from '../socket';
import { useSelector, useDispatch } from 'react-redux';

const WaitingScreen = ({ navigation: { goBack } }) => {
  const dispatch = useDispatch();

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
      <TouchableOpacity onPress={() => goBack()}>
        <Text>매칭 화면으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WaitingScreen;
