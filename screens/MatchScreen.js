import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BottomSheetScreen from '../components/BottomSheet';
import CustomButton from '../components/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import { requestMatch } from '../config/api';
import { addUserPendingMatch } from '../actions';
import { socket, matchSocket } from '../socket';
import { addSuccessfulMatch, deleteMyPendingMatch } from '../actions';

const MatchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showCurrentMatch, setshowCurrentMatch] = useState(true);
  const { userData } = useSelector(state => state.user);
  const { waitingMatch } = useSelector(state => state.user);
  const { successMatch } = useSelector(state => state.user);
  const haveNoCurrentMatchAtAll = !waitingMatch.length && !successMatch.length;

  const bottomSheetRef = useRef();

  const [date, setDate] = useState(new Date());//Zulu time
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [reservation, setReservation] = useState('');

  useEffect(() => {
    const SeoulStandardDate = moment(date).tz("Asia/Seoul");
    const newDate = SeoulStandardDate.format('MMMM Do YYYY, h:mm a');

    setReservation(newDate);
  }, [date]);

  useEffect(() => {
    socket.on('matching succeed', match => {//pet sitter가 응답해서 매칭에 성공했을 때. 그 상대방에게 옴

      dispatch(deleteMyPendingMatch(match._id));
      dispatch(addSuccessfulMatch(match));

      Alert.alert(
        "매칭이 성사되었습니다!",
        "Pet sitter와 대화를 나누어보세요",
        [
          {
            text: "나중에",
            onPress: () => console.log("Ask me later"),
            style: "cancel"
          },
          {
            text: "대화하기",
            onPress: () => navigation.navigate('Chat')
          },
        ],
        { cancelable: false }
      );
      return () => socket.off();
    });
  }, []);

  const readyToMatch = (
    <View style={styles.matchContent}>
      <View style={styles.matchDescription}>
        {haveNoCurrentMatchAtAll ? (
          <View>
            <Text>아직 매칭이 이루어지지 않았습니다.</Text>
            <Text>지금 매칭을 시도해보세요.</Text>
          </View>
        ) : (
            <View>
              <Text>매칭 된 것(파트너)과 대기중인 리스트 </Text>
              <FlatList
                keyExtractor={match => match._id}
                data={[...successMatch, ...waitingMatch]}
                renderItem={({ item }) => {
                  //element === {item: 배열 안의 요소, index: #}
                  if (item.petsitter) return <Text>매치가 이루짐.. 나중에 PEtsetter 넣기 </Text>;
                  return (
                    <View style={styles.waitingList}>
                      <Text>{item.dateAndTime}</Text>
                      <Text>대기중</Text>
                    </View>
                  )
                }}
              />
            </View>
          )}
      </View>
      <View style={styles.matchButtons}>
        <TouchableOpacity
          style={styles.matchButton}
          onPress={() => bottomSheetRef.current.snapTo(0)}
        >
          <Text>도움이 필요해요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.matchButton}
          onPress={() => navigation.navigate('지도')}>
          <Text>도움을 주고 싶어요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const pastMatch = (
    <Text>과거 매칭</Text>
  );

  const matchContent = showCurrentMatch ? readyToMatch : pastMatch;

  const renderInner = () => {
    return <View style={styles.panel}>

      {show ? (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minuteInterval={5}
          />
          <Button
            onPress={() => setShow(false)}
            title='확인'>
          </Button>
        </View>
      ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.panelTitle}>예약 날짜를 선택해주세요</Text>
            <Text style={styles.panelSubtitle}>반려동물을 맡기고 싶은 날과 시간을 선택해 주세요</Text>
            <Text style={styles.dateAndTime}>{reservation}</Text>
          </View>
        )
      }

      <Button onPress={showDatepicker} title='날짜 선택' />
      <Button onPress={showTimepicker} title='시작 시간' />
      <Button onPress={() => console.log('몇 시간??')} title='얼마나?' />
      <CustomButton
        color="#FF6347"
        title="확인"
        submitHandler={async () => {
          const newMatchRequest = await requestMatch(userData._id, reservation, userData.pet);
          dispatch(addUserPendingMatch(newMatchRequest));//요청한 유저의 리덕스.. user redux pending match 업데이트
          matchSocket.informNewPendingMatch(newMatchRequest);
          bottomSheetRef.current.snapTo(1);

          navigation.navigate('대기');
        }}
        navigation={navigation}
      />

    </View>
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const showTimepicker = () => {
    setShow(true);
    setMode('time');
  };

  return (
    <View style={styles.container}>

      <BottomSheetScreen bottomSheetRef={bottomSheetRef} renderInner={renderInner} />

      <View style={styles.match}>
        <View style={styles.matchToggle}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setshowCurrentMatch(true)}>
            <Text>현재 매칭</Text>
          </TouchableOpacity>

          <View style={styles.line}></View>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => setshowCurrentMatch(false)}>
            <Text>지난 매칭</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.matchContent}>
          {matchContent}
        </View>

      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  matchHeader: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  match: {
    flex: 6
  },
  matchToggle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white'
  },
  button1: {
    flex: 1,
    backgroundColor: 'green',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'blue'
  },
  line: {
    borderRightWidth: 3,
    borderColor: 'red',
    marginTop: '2%',
    height: '80%',
  },
  button2: {
    flex: 1,
    backgroundColor: 'pink',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'blue'
  },
  matchContent: {
    flex: 6,
    backgroundColor: 'skyblue'
  },
  matchDescription: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  matchButtons: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchButton: {
    flex: 1,
    borderRadius: 30,
    width: '50%',
    margin: 20,
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    backgroundColor: 'yellow',
    padding: 10
  },
  panel: {
    padding: 20,
    backgroundColor: 'pink',
    paddingTop: 20,
  },
  header: {
    backgroundColor: 'red',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 5,
  },
  dateAndTime: {
    fontSize: 15,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  bottomsheet: {
    backgroundColor: 'gray',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingList: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default MatchScreen;
