import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import getEnvVars from './environment';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import { useSelector, useDispatch } from 'react-redux';
import {
  userLogin
} from './actions';
import axiosInstance from './config/api';
import asyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';

export default function App() {

  const { FACEBOOK_APP_ID } = getEnvVars();
  const dispatch = useDispatch();

  const signInFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      });

      if (type !== 'success') return alert('로그인 실패');

      const { data } = await axios.post(`https://graph.facebook.com/me?access_token=${token}&fields=email`);
      const { id, email } = data;
      const profilePicUrl = `https://graph.facebook.com/${id}/picture?type=large`;

      return getLogIn(email, profilePicUrl);

    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const getLogIn = async (email, photoUrl) => {

    try {
      const response = await axiosInstance.post('/user/login', {
        email: email,
        profileUrl: photoUrl
      });

      const status = response.status;
      const { token, userData } = response.data;

      if (status === 201) {
        await asyncStorage.setItem('token', token);
        dispatch(userLogin(userData));
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={signInFacebook}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
