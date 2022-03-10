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

    if (type !== 'success') {
      return undefined;
    }

    const { data } = await axios.post(`https://graph.facebook.com/me?access_token=${token}&fields=email`);
    const { id, email } = data;

    if(!email) return 'NO EMAIL DATA';

    const profilePicUrl = `https://graph.facebook.com/${id}/picture?type=large`;
    const userData = await fetchToLogin(email, profilePicUrl);
    return userData;

  } catch (err) {
    console.log(err);
  }
};

export default signInFacebook;
