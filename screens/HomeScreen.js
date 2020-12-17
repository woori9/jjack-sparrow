import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { back, exp } from 'react-native/Libraries/Animated/src/Easing';
import { useSelector, useDispatch } from 'react-redux';
import { getExpiredPending, getExpiredSuccess } from '../utils/moment';
import Card from '../components/Card';
import { getReviews } from '../config/api';

const HomeScreen = ({ navigation }) => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { waitingMatch, successMatch } = useSelector(state => state.user);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const allReviews = await getReviews();
      setReviews([...allReviews]);
    })();
  }, []);

  useEffect(() => {
    const expired = getExpiredPending(waitingMatch, userData._id, dispatch);

    if (expired.length) {

      Alert.alert(
        '만료된 매치',
        `대기 중이던 ${expired.length}개의 매칭이 만료되어 자동으로 삭제되었습니다`,
        [{ text: 'Okay' }]
      );
    }
  });

  useEffect(() => {
    const expired = getExpiredSuccess(successMatch, dispatch);

    if (expired.length) {

      Alert.alert(
        '만료된 매치',
        `서비스가 종료되었습니다. 후기를 남겨주세요!`,
        [{ text: 'Okay' }]
      );
    }
  }, []);

  const { height, width } = Dimensions.get('window')

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          scrollEventThrottle={16}
        >
          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>

            <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>
                일정
              </Text>
              <Text style={{ fontWeight: '100', marginTop: 10 }}>
                캘린더에서 일정을 등록하세요
              </Text>
              <View style={{ width: width - 40, height: 200, marginTop: 20, marginBottom: 20 }}>
                <Image
                  style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                  source={{ uri: 'https://jjack.s3.ap-northeast-2.amazonaws.com/F5C4EBB8-FA13-4F76-845E-FBDD11AAE75D.jpg'}}
                />
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', paddingHorizontal: 20 }}>
                후기
            </Text>
              <TouchableOpacity style={{ fontSize: 15, fontWeight: '300', paddingHorizontal: 20 }}
                onPress={() => navigation.navigate('전체 후기')}>
                <Text>전체보기</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 190, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {reviews.map((review, index) => <Card review={review} key={index}/>)}

              </ScrollView>
            </View>

          </View>
        </ScrollView>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default HomeScreen;
