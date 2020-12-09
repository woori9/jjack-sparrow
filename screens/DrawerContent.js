import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import asyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions';
import { Ionicons } from '@expo/vector-icons';

const DrawerContent = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const temp = user.nickname ? user.nickname : '한우리'

  const LogOut = async () => {
    try {
      await asyncStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
    dispatch(userLogout());
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Text style={styles.title}>{temp}님 환영합니다.</Text>
              </View>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerItem
              // icon={({ color, size }) => (
              //   <Icon
              //     name="home-outline"
              //     color={color}
              //     size={size}
              //   />
              // )}
              label="Home"
              onPress={() => { props.navigation.navigate('Home') }}
            />
            <DrawerItem
              // icon={({ color, size }) => (
              //   <Icon
              //     name="account-outline"
              //     color={color}
              //     size={size}
              //   />
              // )}
              label="UserProfile"
              onPress={() => { props.navigation.navigate('UserProfile') }}
            />
            <DrawerItem
              // icon={({ color, size }) => (
              //   <Icon
              //     name="account-outline"
              //     color={color}
              //     size={size}
              //   />
              // )}
              label="PetProfile"
              onPress={() => { props.navigation.navigate('PetProfile') }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          // icon={({ color, size }) => <Ionicons name="exit-to-app" color={'green'} size={28}/>}
          label="Sign Out"
          onPress={LogOut}
        />
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  }
});
