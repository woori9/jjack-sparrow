import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { userLogin, checkUserStatus, userLogout } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import signInFacebook from '../config/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  console.log("^^", currentUser);

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.login}
        onPress={async () => {
          const userData = await signInFacebook();
          dispatch(userLogin(userData));
          dispatch(checkUserStatus());
        }}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
