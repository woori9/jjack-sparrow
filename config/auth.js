import * as Facebook from 'expo-facebook';
import getEnvVars from '../environment';
import { fetchToLogin } from './api';
import axios from 'axios';

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

    const userData = await fetchToLogin(email, profilePicUrl);
    return userData;

  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export default signInFacebook;
