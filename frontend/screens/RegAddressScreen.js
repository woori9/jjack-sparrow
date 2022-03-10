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
        <Text style={styles.title}>주소를 등록해주세요</Text>
        <View style={styles.registerBox}>
          <Postcode
            style={styles.postcode}
            jsOptions={{ animated: true }}
            onSelected={data => setAddress(data.address)}
          />
        </View>
        <View style={styles.addressInput}>
          <Text style={styles.title}>입력된 주소</Text>
          <Text style={[styles.text, { marginTop: 20, marginBottom: 5 }]}>{address}</Text>
        </View>
        <View style={styles.addressInput}>
          <Text style={styles.title}>상세 주소</Text>
          <View style={styles.text}>
            <TextInput
              style={styles.input}
              value={detail}
              onChangeText={text => setDetail(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => registerAddress(address, detail)}>
          <Text style={{ fontSize: 17, color: '#43582f' }}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10, backgroundColor: '#fff' }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 17
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14
  },
  registerBox: {
    alignItems: 'center',
    marginTop: 10,
  },
  postcode: {
    flex: 1,
    width: 360,
    height: 300
  },
  addressInput: {
    marginTop: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  registerButton: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 18,
    padding: 13,
    width: '70%',
    borderRadius: 15,
    borderColor: '#BDC581',
    borderWidth: 1,
    backgroundColor: '#F8EFBA',
  }
});

export default RegAddressScreen;
