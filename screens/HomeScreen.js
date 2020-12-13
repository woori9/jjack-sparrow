import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import { useSelector, useDispatch } from 'react-redux';

// Notifications.setNotificationHandler({
//   handleNotification: async() => {
//     return {
//       shouldShowAlert: true//app 이 forground에 있을 때에도 알람이 울리게 해준다.
//     };
//   }
// })

const HomeScreen = ({ navigation }) => {
  const { waitingMatch } = useSelector(state => state.user);
  //대기 중인 매치 # 개가 있습니다.

  // useEffect(() => {
  //   const askPermission = async () => {
  //     const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     if (status !== 'granted') {
  //       const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  //       //return result;
  //       if (result.status !== 'granted') {
  //         throw new Error('Permission not granted');
  //       }
  //     }

  //     const response = await Notifications.getExpoPushTokenAsync();//get token
  //     console.log(response);
  //   };

  //   askPermission();
  // }, []);

  // useEffect(() => {
  //   const backgroundSubscription = Notifications.addNotificationReceivedListener(response => {
  //     console.log(response);
  //   });

  //   const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification);
  //   });

  //   return () => {
  //     backgroundSubscription.remove();
  //     foregroundSubscription.remove();
  //   }
  // }, []);

  const triggerNotification = () => {//default: if app is in the foreground, not shown.
    //background에 있어야한다. 화면은 나오고, 앱은 실행상태
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'local notification',
        body: 'Hi',
        //data: {}
      },
      trigger: {//when
        seconds: 10,//after 10 seconds
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('후기')}>
        <Text>Go to Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  }
});

export default HomeScreen;
