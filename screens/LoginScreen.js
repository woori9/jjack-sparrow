import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import getEnvVars from '../environment';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  userLogin
} from '../actions';
import axiosInstance from '../config/axiosInstance';
import asyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  console.log("^^", currentUser);

  const signInFacebook = async () => {
    const { FACEBOOK_APP_ID } = getEnvVars();

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

      return fetchToLogin(email, profilePicUrl);

    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const fetchToLogin = async (email, photoUrl) => {

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
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.loginButtonContainer}
        onPress={signInFacebook}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({});

export default LoginScreen;
