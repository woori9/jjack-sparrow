import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';
import BottomSheetScreen from '../components/BottomSheet';
import { pickImage, takePicture } from '../utils/camera';
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchToAddUserProfile, fetchTosavePhoto } from '../config/api';

const UserProfileScreen = () => {
  const { userData } = useSelector(state => state.user);
  const { username, address, email, picture } = userData;
  const [imageInfo, setImageInfo] = useState(null);
  const bottomSheetRef = useRef();

  const renderInner = () => {
    return <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <CustomButton
        color='#f4cbc5'
        title='Take Photo'
        style={{ borderWidth: 1, borderColor: '#efb4b0' }}
        submitHandler={async () => {
          const result = await takePicture();
          setImageInfo(result);
          bottomSheetRef.current.snapTo(1);
        }}
      />
      <CustomButton
        color="#f4cbc5"
        title='Choose From Library'
        style={{ borderWidth: 1, borderColor: '#efb4b0' }}
        submitHandler={async () => {
          const result = await pickImage();
          setImageInfo(result);
          //const storedURL = await fetchTosavePhoto(userData._id, result);// 향후 user profile 이미지 저장 기능 추가하기
          //console.log(storedURL)
          //await fetchToAddUserProfile(userData._id, storedURL);
          bottomSheetRef.current.snapTo(1);
        }} />
      <CustomButton color="#fad3a8" style={{ borderWidth: 1, borderColor: '#ffb284' }} title="Cancel" submitHandler={() => bottomSheetRef.current.snapTo(1)} />
    </View>
  };

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheetScreen bottomSheetRef={bottomSheetRef} renderInner={renderInner} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            {imageInfo ?
              <Image source={{ uri: imageInfo.uri }} style={styles.image} ></Image> :
              (
                picture ? (<View style={styles.profileImage}>
                  <Image source={{ uri: picture }} style={styles.image} resizeMode="center"></Image>
                </View>) : (<View style={styles.profileImage}>
                  <Image source={require('../assets/lovebird.png')} style={styles.image} resizeMode="center"></Image>
                </View>)
              )
            }
          </View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }} onPress={() => bottomSheetRef.current.snapTo(0)}></Ionicons>
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
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "#52575D"
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
  },
  panel: {
    padding: 20,
    backgroundColor: '#fae5e2',
    paddingTop: 20,
    paddingBottom: 45
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
});
