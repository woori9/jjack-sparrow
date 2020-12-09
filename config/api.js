import asyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../config/axiosInstance';

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
