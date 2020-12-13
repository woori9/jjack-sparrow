import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Postcode from 'react-native-daum-postcode';
import { Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress } from '../actions';
import axiosInstance from '../config/axiosInstance';
import { getLatAndLng } from '../config/api';

const RegAddressScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');
  const deviceWidth = Dimensions.get('window').width;

  const registerAddress = async (address, detail) => {
    if (!address) return alert('주소를 올바르게 입력해주세요');

    const fullAddress = `${address} ${detail}`;
    const location = await getLatAndLng(fullAddress);
    const { documents } = location;
    const lng = Number(documents[0].x);
    const lat = Number(documents[0].y);

    try {
      const response = await axiosInstance.post(`user/${user.userData._id}/address`, {
        fullAddress,
        location: { lat, lng }
      });

      const status = response.status;

      if (status === 201) {
        dispatch(updateAddress(fullAddress, { lat, lng }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text style={styles.label}>Title: Register Address Screen</Text>
          <Postcode
            style={styles.postcode}
            jsOptions={{ animated: true }}
            onSelected={data => setAddress(data.address)}
          />
        </View>
        <View style={styles.box2}>
          <Text style={styles.addressDetail}>상세주소</Text>
          <TextInput
            style={styles.input}
            value={detail}
            onChangeText={text => setDetail(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.RegisterButton}
          onPress={() => registerAddress(address, detail)}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex: 1
  },
  box2: {
    flex: 1
  },
  postcode: {
    flex: 1,
    width: 360,
    height: 300
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default RegAddressScreen;
