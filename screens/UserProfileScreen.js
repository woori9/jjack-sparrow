import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';

const UserProfileScreen = () => {
  const { userData } = useSelector(state => state.user);
  const { username, address, email } = userData;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={{ uri: 'https://jjack.s3.ap-northeast-2.amazonaws.com/31D0C66A-2E75-447C-8FDF-91256726CA7C.jpg' }} style={styles.image} resizeMode="center"></Image>
          </View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 30 }]}>{username}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{email}</Text>
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.userInfo}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.activityIndicator}></View>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "400" }]}>주소</Text>
            </View>
            <View style={{ marginLeft: 30, backgroundColor: 'white' }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "400" }]}>
                {address.description}
              </Text>
            </View>
            <CustomButton color={'white'} title={'주소 변경하기'} submitHandler={() => console.log('주소 변경')}
              style={{
                marginTop: 30,
                width: '85%',
                alignSelf: 'center',
                borderColor: '#AEB5BC',
                borderWidth: 1
              }} />
          </View>

          <View style={styles.userInfo}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.activityIndicator}></View>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "400" }]}>전화번호</Text>
            </View>
            <View style={{ marginLeft: 30, backgroundColor: 'white' }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "400" }]}>
                010-5651-5186
              </Text>
            </View>
            <CustomButton color={'white'} title={'전화번호 변경하기'} submitHandler={() => console.log('전화번호 변경')}
              style={{
                marginTop: 30,
                width: '85%',
                alignSelf: 'center',
                borderColor: '#AEB5BC',
                borderWidth: 1
              }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    overflow: "hidden"
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  userInfo: {
    marginTop: 20,
    height: 150,
    alignItems: "flex-start",
    marginBottom: 8,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#d1ccc0',
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 11,
    marginRight: 10,
    marginLeft: 10
  },
  text: {
    marginTop: 10,
    color: "#52575D",
    fontSize: 15
  }
});
