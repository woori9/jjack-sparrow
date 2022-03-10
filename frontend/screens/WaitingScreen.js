import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { socket } from '../socket';
import { useSelector, useDispatch } from 'react-redux';

const WaitingScreen = ({ navigation: { goBack } }) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{ fontWeight: "200", fontSize: 25, fontFamily: "HelveticaNeue", color: "#52575D", }}>매칭을 기다리는 중...</Text>
      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => goBack()}>
        <Text
          style={{ fontSize: 14, fontFamily: "HelveticaNeue", color: "#52575D" }}>매칭 화면으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

{/* <View style={styles.infoContainer}>
<Text style={[styles.text, { fontWeight: "200", fontSize: 30 }]}>{username}</Text>
<Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{email}</Text>
</View> */}

export default WaitingScreen;
