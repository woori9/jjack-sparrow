import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { back, exp } from 'react-native/Libraries/Animated/src/Easing';
import { useSelector, useDispatch } from 'react-redux';
import { getExpiredPending, getExpiredSuccess } from '../utils/moment';

const HomeScreen = ({ navigation }) => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { waitingMatch, successMatch } = useSelector(state => state.user);

  useEffect(() => {
    const expired = getExpiredPending(waitingMatch, userData._id, dispatch);

    if (expired.length) {

      Alert.alert(
        '만료된 매치',
        `대기 중이던 ${expired.length}개의 매칭이 만료되어 자동으로 삭제되었습니다`,
        [{ text: 'Okay' }]
      );
    }
  });

  useEffect(() => {
    const expired = getExpiredSuccess(successMatch, dispatch);

    if (expired.length) {

      Alert.alert(
        '만료된 매치',
        `서비스가 종료되었습니다. 후기를 남겨주세요!`,
        [{ text: 'Okay' }]
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('후기')}>
        <Text>Go to Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  }
});

export default HomeScreen;
