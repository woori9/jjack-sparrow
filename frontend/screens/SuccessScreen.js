import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Image source={require('../assets/lovebird.png')} />
        <Text style={styles.title}>매칭이 성사되었습니다!</Text>
        <Text style={styles.subtitle}>채팅창에서 집사님과 대화할 수 있습니다.</Text>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          style={{
            width: 200,
            alignSelf: 'center',
            borderColor: '#AEB5BC',
            borderWidth: 1
          }}
          title={'대화하러 가기'}
          submitHandler={() => navigation.navigate('Chat')} />
        <CustomButton style={{
          width: 200,
          alignSelf: 'center',
          borderColor: '#AEB5BC',
          borderWidth: 1
        }}
          title={'매칭내역 보기'}
          submitHandler={() => navigation.navigate('매칭 내역')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    alignItems: 'center',
    margin: 20,
  },
  title: {
    fontSize: 25,
    margin: 10,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  subtitle: {
    fontSize: 15,
    margin: 10,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  buttons: {
    top: 50
  }
});

export default SuccessScreen;
