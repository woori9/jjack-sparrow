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

export const fetchToRegisterPet = async (userId, form) => {
  try {
    const response = await axiosInstance.post(`user/${userId}/pet`, {
      petData: form
    });

    const status = response.status;
    const { registeredPet } = response.data;

    if (status === 201) {
      return registeredPet;
      //dispatch(addUserPet(registeredPet));
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchTosavePhoto = async (userId, imageInfo) => {
  try {
    if (!imageInfo) return null;

    const { uri, filename, type } = imageInfo;

    const formdata = new FormData();
    formdata.append('image', { uri, name: filename, type });

    try {
      const response = await axiosInstance.post(`/user/${userId}/photo`,
        formdata,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const { photoURL } = response.data;
      const status = response.status;

      if (status === 201) {
        return photoURL;
      }
    } catch (err) {
      console.log(err);
    }

  } catch (err) {
    console.log(err);
  }
};

export const getAllUsersPendingMatches = async () => {
  try {
    const response = await axiosInstance.get(`/match`);

    const status = response.status;
    const { allPendingMatches } = response.data;

    if (status === 200) {
      return allPendingMatches;
    }
  } catch (err) {
    console.log(err);
  }
};

export const requestMatch = async (userId, startAt, expireAt, pet) => {
  try {
    const response = await axiosInstance.post(`user/${userId}/match`, {
      startAt,
      expireAt,
      pet
    });

    const status = response.status;
    const { newMatchRequest } = response.data;

    if (status === 201) {
      return newMatchRequest;
    }
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequest = async (userId, matchId) => {
  try {
    const response = await axiosInstance.patch(`user/${userId}/match/${matchId}`);

    const { status, data } = response;
    if (status === 200) return data.updatedMatch;
  } catch (err) {
    console.log(err);
  }
};

export const deleteExpiredPendings = async (userId, pendings) => {
  try {
    const pendingsToDelete = pendings.join('&');
    await axiosInstance.delete(`user/${userId}/matches/${pendingsToDelete}`);
  } catch (err) {
    console.log(err);
  }
};

export const deletePending = async (userId, pendingId) => {
  try {
    await axiosInstance.delete(`user/${userId}/match/${pendingId}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateExpiredSuccess = async successId => {
  try {
    const response = await axiosInstance.patch(`match/${successId}`);

    const { status, data } = response;
    if (status === 200) return data.updatedMatch;
  } catch (err) {
    console.log(err);
  }
};

export const getChatting = async matchId => {
  try {
    const response = await axiosInstance.get(`match/${matchId}/chat`);

    const status = response.status;
    const { chat } = response.data;

    if (status === 200) {
      return chat;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLatAndLng = async (address) => {
  try {
    const { data } = await axios.get('https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURIComponent(address),
      {
        headers: { 'Authorization': `KakaoAK ${KAKAO_API_KEY}` }
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
