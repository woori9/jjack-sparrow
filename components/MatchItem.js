import React, { useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
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

    const ticking = setTimeout(async () => {

      if (isPending) {
        matchSocket.joinPendingRoom(match._id);//pending room join
        matchSocket.notifyPendingMatchExpire(match._id);

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
      socket.off();
    };
  }, []);

  return (
    <View>
      {isPending ? (

        <View style={styles.waitingList}>
          <Text>{moment(match.startAt).format('YYYY-MM-DD HH:mm')}</Text>
          <Text>대기중</Text>
        </View>

      ) : (

          <View style={styles.waitingList}>
            {match.petsitter._id === userId ? (
              <Text style={styles.waitingList}>{match.customer.email}님과 </Text>
            ) : (
                <Text style={styles.waitingList}>{match.petsitter.email}님과 </Text>
              )
            }
            <Text>매칭 완료</Text>
          </View>

        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  waitingList: {
    flexDirection: 'row',
    backgroundColor: 'beige'
  }
});

export default MatchItem;
