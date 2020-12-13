import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { userLogin, checkAddress, checkUserMatchStatus } from '../actions';
import { useDispatch } from 'react-redux';
import signInFacebook from '../config/auth';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.login}
        onPress={async () => {
          const result = await signInFacebook();
          if (!result) return alert('로그인을 다시 시도해주세요.');

          if (result === 'NO EMAIL DATA') return alert('페이스북에 이메일 정보를 등록한 후에 이용해주세요.');

          const { address, match } = result;

          dispatch(userLogin(result));
          dispatch(checkAddress(address.description));
          dispatch(checkUserMatchStatus(match));

        }}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
