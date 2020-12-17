import React, { useEffect } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
import { calculateRemaingMiliSeconds } from '../utils/moment';
import { socket, matchSocket } from '../socket';
import { deletePending, updateExpiredSuccess } from '../config/api';
import { deleteMyPending, moveFromSuccessToPast } from '../actions'
import moment from 'moment-timezone';

const MatchItem = ({ userId, match, dispatch }) => {
  //pending match 일때만 한 매칭당 join match socket 을 on 해야지 pending accepted 되면 상대방이 거기에 join함으로서 바로 match success message를 받을 수 있다import React from 'react';
  //이미 이루어진 매칭은 join 이벤트를 걸 필요 없다.

  const isPending = !match.petsitter;
  const remaining = isPending ? calculateRemaingMiliSeconds(match.startAt) : calculateRemaingMiliSeconds(match.expireAt);
  //3600000 startAt 나중에..
  useEffect(() => {

    if (isPending) {
      matchSocket.joinPendingRoom(match._id);
      matchSocket.notifyPendingMatchExpire(match._id);
    }

    const ticking = setTimeout(async () => {

      if (isPending) {
        Alert.alert(
          '만료된 매치',
          `대기 중이던 매치가 만료되어 삭제합니다`,
          [{ text: 'Okay' }]
        );

        deletePending(userId, match._id);
        dispatch(deleteMyPending(match._id));
      } else {

        Alert.alert(
          '만료된 매치',
          `서비스를 종료합니다`,
          [{ text: 'Okay' }]
        );

        const updatedMatch = await updateExpiredSuccess(match._id);
        dispatch(moveFromSuccessToPast(updatedMatch));
      }
    }, remaining);

    return () => {
      clearInterval(ticking);
      socket.off('join pending room');
      socket.off('pending expired');
      socket.off('success expired');
    };
  }, []);

  return (
    <View>
      {isPending ? (

        <View style={styles.waitingList}>
          <Text style={styles.text}>{moment(match.startAt).format('YYYY-MM-DD HH:mm')}</Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.text}>대기중</Text>
          </View>
          <TouchableOpacity style={{ marginLeft: 35, backgroundColor: 'pink', width: 85, borderRadius: 15 }}>
            <Text style={styles.text}>취소하기</Text>
          </TouchableOpacity>
        </View>

      ) : (

          <View style={styles.waitingList}>
            <Text style={styles.text}>{moment(match.startAt).format('YYYY-MM-DD HH:mm')}</Text>
            {match.petsitter._id === userId ? (
              <Text style={styles.text}>{match.customer.username}님과 약속</Text>
            ) : (
                <Text style={styles.text}>{match.petsitter.username}님과 약속</Text>
              )
            }
            <TouchableOpacity style={{ backgroundColor: 'pink', width: 85, marginLeft: 15, borderRadius: 15 }}>
              <Text style={styles.text}>취소하기</Text>
            </TouchableOpacity>
          </View>

        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  waitingList: {
    flex: 1,
    flexDirection: 'row',
    width: 340,
    alignSelf: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#AEB5BC'
  },
  text: {
    lineHeight: 30,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    marginLeft: 20
  }
});

export default MatchItem;
