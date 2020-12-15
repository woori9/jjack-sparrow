import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicatorm, Image } from 'react-native'; import verifyPermissions from '../utils/gps';
import * as Location from 'expo-location';
import Map from '../components/Map';
import arePointsNear from '../utils/checkIsNear';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllPendingMatch } from '../actions';
import { socket, matchSocket } from '../socket';
import { getAllUsersPendingMatches, acceptRequest } from '../config/api';
import { deleteThePendingMatch, addSuccessfulMatch} from '../actions'
import { filterExpiredMatch } from '../utils/moment';
import mockPending from '../data/mock_pendingMatch.json';

const MapScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const allPendingMatches = useSelector(state => state.allPendingMatch);
  const { waitingMatch, successMatch } = useSelector(state => state.user);
  const { userData } = useSelector(state => state.user);
  const [myLocation, setMyLocation] = useState({});
  const [pendingsNearby, setPendingsNearby] = useState([]);

  useEffect(() => {
    (async () => {
      const allPendings = await getAllUsersPendingMatches();//아예 서버에서 내려줄 때 유효하지 않은 것은 거르도록 리펙토링하기
      const excluded = allPendings.filter(pending => pending.customer._id !== userData._id);
      const filtered = filterExpiredMatch(excluded);
      dispatch(updateAllPendingMatch(filtered));
      //dispatch(updateAllPendingMatch(mockPending));////mock data inclue to redux pendingMatches
    })();

    socket.on('there is new pending match', ({ newMatchInfo }) => {
      dispatch(updateAllPendingMatch([newMatchInfo]));
    });

    socket.on('one pending matched so delete from list of pending', matchId => {
      dispatch(deleteThePendingMatch(matchId));
    });

    socket.on('delete expired pending match', matchId => {
      dispatch(deleteThePendingMatch(matchId));
    })

    return () => socket.off();
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) return;

      try {
        const location = await Location.getCurrentPositionAsync({ timeout: 3000 });

        setMyLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });

      } catch (err) {
        Alert.alert(
          '위치 정보를 가져올 수 없습니다.',
          '나중에 다시 시도하거나 지도에서 위치를 골라주세요',
          [{ text: '확인' }]
        );
      }
    };

    getUserLocation();
  }, []);

  const selectLocationHandler = event => {
    setMyLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  useEffect(() => {
    const pendingsNear = allPendingMatches.filter(match => {
      const { location } = match.customer.address;
      return arePointsNear(location, myLocation, 5);
    });
    setPendingsNearby(pendingsNear);

  }, [allPendingMatches, myLocation]);

  const respond = async (userId, matchId) => {
    const updatedMatch = await acceptRequest(userId, matchId);
    matchSocket.respondToPendingMatch(updatedMatch);
    dispatch(deleteThePendingMatch(matchId));
    dispatch(addSuccessfulMatch(updatedMatch));
    navigation.navigate('성공');
  };

  return (
    <Map
      userData={userData}
      myLocation={myLocation}
      selectLocationHandler={selectLocationHandler}
      pendingsNearby={pendingsNearby}
      respond={respond}
    />
  );
};

export default MapScreen;
