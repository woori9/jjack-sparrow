import asyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config/axiosInstance';
import getEnvVars from '../environment';
import axios from 'axios';
const { KAKAO_API_KEY } = getEnvVars();

export const fetchToLogin = async (email, photoUrl) => {
  try {
    const response = await axiosInstance.post('/user/login', {
      email: email,
      profileUrl: photoUrl
    });

    const status = response.status;
    const { token, userData } = response.data;

    if (status === 201) {
      await asyncStorage.setItem('token', token);
      return userData;
    }
  } catch (err) {
    console.log(err);
  }
};

export const requestMatch = async (userId, reservation) => {
  try {
    const response = await axiosInstance.post(`user/${userId}/match`, {
      reservation
    });

    const status = response.status;
    const { newMatchRequest } = response.data;

    console.log(status)
    console.log(newMatchRequest)

    if (status === 201) {
      return newMatchRequest;
    }
  } catch (err) {
    console.log(err);
  }
};

export const respondToMatch = async (userId, matchId) => {
  try {
    const response = await axiosInstance.put(`user/${userId}/match/${matchId}`);

    const status = response.status;
    // const { newMatchRequest } = response.data;

    // console.log(status)
    // console.log(newMatchRequest)

    // if (status === 201) {
    //   return newMatchRequest;
    // }
  } catch (err) {
    console.log(err);
  }
};

export const getLatAndLng = async (address) => {
  try {
    const { data } = await axios.get('https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURIComponent(address),//string address
      { headers: { 'Authorization': `KakaoAK ${KAKAO_API_KEY}` } });
    // const a = JSON.stringify(data);
    // console.log(a)

    return data;
  } catch (err) {
    console.log(err);
  }
};

