import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { userLogin, checkAddress, checkUserMatchStatus } from '../actions';
import { useDispatch } from 'react-redux';
import signInFacebook from '../config/auth';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.middle}>
        <Text style={styles.textContainer}>Welcome</Text>

        <View style={styles.formArea}>
          <Text style={[styles.textContainer, styles.signin]}>Sign in</Text>

          <TouchableOpacity
            style={styles.Button}
            onPress={async () => {
              const result = await signInFacebook();
              if (!result) return alert('로그인을 다시 시도해주세요.');

              if (result === 'NO EMAIL DATA') return alert('페이스북에 이메일 정보를 등록한 후에 이용해주세요.');

              const { address, match } = result;

              dispatch(userLogin(result));
              dispatch(checkAddress(address.description));
              dispatch(checkUserMatchStatus(match));

            }}>
            <Image source={require('../assets/facebook.png')}
              style={{ width: '80%', height: 30, borderRadius: 7 }}
            />
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.bottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    position: 'relative',
    backgroundColor: '#688777',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250,
  },
  middle: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingLeft: 26.3,
    paddingRight: 26.3,
  },
  bottom: {
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: '#f4cbc5',
  },
  textContainer: {
    color: '#FCFDFF',
    fontSize: 24,
    marginBottom: 30,
    position: 'relative',
    top: '20%',
    alignSelf: 'center',
  },
  formArea: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#e3e0ce',
    borderRadius: 5,
    top: '20%',
    height: '40%',
    borderRadius: 10,
  },
  signin: {
    top: 0,
    color: '#2D3057',
    marginTop: 15,
  },
  Button: {
    alignItems: 'center',
    marginTop: 30,
    padding: 25
  }
});

export default LoginScreen;
