import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Alert } from 'react-native';
import { addUserPendingMatch, addSuccessfulMatch, deleteMyPending } from '../actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheetScreen from '../components/BottomSheet';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';
import MatchItem from '../components/MatchItem';
import { socket, matchSocket } from '../socket';
import moment from 'moment-timezone';
import { requestMatch } from '../config/api';

const MatchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef();
  const [showCurrentMatch, setshowCurrentMatch] = useState(true);
  const { userData, waitingMatch, successMatch } = useSelector(state => state.user);
  const [startAt, setStartAt] = useState(new Date());//Zulu time
  const [expireAt, setExpireAt] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [startOrExpire, setStartOrExpire] = useState('START');
  const haveNoCurrentMatchAtAll = !waitingMatch.length && !successMatch.length;

  useEffect(() => {
    socket.on('matching succeed', match => {//pet sitter가 응답해서 매칭에 성공했을 때. 그 상대방에게 옴

      dispatch(deleteMyPending(match._id));
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
                renderItem={({ item }) => {//element === {item: 배열 안의 요소, index: #}
                  return (
                    <MatchItem
                      userId={userData._id}
                      match={item}
                      dispatch={dispatch}
                    />
                  );
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
            value={startOrExpire === 'START' ? startAt : expireAt}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={(e, selectedDate) => onChange(e, selectedDate, startOrExpire)}
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
          </View>
        )
      }

      <View>
        <View style={styles.dateAndTimeChunk}>
          <Text style={styles.dateAndTime}>{moment(startAt).tz("Asia/Seoul").format('MMMM Do YYYY, h:mm a')}</Text>
          <View style={styles.dateAndTimebuttons}>
            <Button onPress={() => showDatepicker('START')} title='시작 날짜' />
            <Button onPress={() => showTimepicker('START')} title='시작 시간' />
          </View>
        </View>
        <View style={styles.dateAndTimeChunk}>
          <Text style={styles.dateAndTime}>{moment(expireAt).tz("Asia/Seoul").format('MMMM Do YYYY, h:mm a')}</Text>
          <View style={styles.dateAndTimebuttons}>
            <Button onPress={() => showDatepicker('EXPIRE')} title='종료 날짜' />
            <Button onPress={() => showTimepicker('EXPIRE')} title='종료 시간' />
          </View>
        </View>
        <CustomButton
          color="#FF6347"
          title="확인"
          submitHandler={async () => {
            const newMatchRequest = await requestMatch(userData._id, startAt, expireAt, userData.pet);
            dispatch(addUserPendingMatch(newMatchRequest));
            matchSocket.informNewPendingMatch(newMatchRequest);
            bottomSheetRef.current.snapTo(1);

            navigation.navigate('대기');
          }}
          navigation={navigation}
        />
      </View>

    </View >
  };

  const onChange = (event, selectedDate, value) => {
    const currentDate = selectedDate || startAt;
    setShow(Platform.OS === 'ios');

    if (value === 'START') {
      setStartAt(currentDate);
      return;
    }
    if (value === 'EXPIRE') {
      setExpireAt(currentDate);
      return;
    }
  };

  const showDatepicker = (value) => {
    setStartOrExpire(value);
    setShow(true);
    setMode('date');
  };

  const showTimepicker = (value) => {
    setStartOrExpire(value);
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
  },
  dateAndTimeChunk: {
    alignItems: 'center',
    margin: 5,
  },
  dateAndTimebuttons: {
    top: -5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MatchScreen;
