import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicatorm, Image } from 'react-native';import verifyPermissions from '../utils/gps';
import * as Location from 'expo-location';
import Map from '../components/Map';
import arePointsNear from '../utils/checkIsNear';
import { useSelector, useDispatch } from 'react-redux';
import { updatePendingMatch } from '../actions';

const MapScreen = props => {
  const dispatch = useDispatch();
  const pendingMatches = useSelector(state => state.pendingMatches);//ALL pending mathces from mongo DB will be dispatched
  const { userData } = useSelector(state => state.user);
  const [myLocation, setMyLocation] = useState({});
  const [pendingsNearby, setPendingsNearby] = useState([]);

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

  useEffect(() => {
    const getPendingMatchData = async () => {
      //fetch to real server to get pending match data, Here I used mock Data (match -> populate coustomer and get address data)
      const pendingMatch = [{
        "petsitter": null,
        "customer": {
          _id: 1,
          pet: [{
            name: '올리브',
            species: '모란'
          }],
          address: {
            description: '안양시 어딘가',
            location: {
              lat: 37.4055699682797,
              lng: 126.971472162356
            }
          }
        },
        "status": 1,
        "dateAndTime": "April 18th 2020 15:00"
      },
      {
        "petsitter": null,
        "customer": {
          _id: 2,
          pet: [{
            name: '머브',
            species: '모란'
          }],
          address: {
            description: '과천시 어딘가',
            location: {
              lat: 37.4103294796877,
              lng: 126.972843321778
            }
          }
        },
        "status": 1,
        "dateAndTime": "April 18th 2020 15:00"
      },
      {
        "petsitter": null,
        "customer": {
          _id: 2,
          pet: [{
            name: '머브11',
            species: '모란'
          }],
          address: {
            description: '동편마을4단지아파트',
            location: {
              lat: 37.408458,
              lng: 126.969206
            }
          }
        },
        "status": 1,
        "dateAndTime": "April 18th 2020 15:00"
      },
      {
        "petsitter": null,
        "customer": {
          _id: 2,
          pet: [{
            name: '머브22',
            species: '모란'
          }],
          address: {
            description: '숲길',
            location: {
              lat: 37.410917,
              lng: 126.966600
            }
          }
        },
        "status": 1,
        "dateAndTime": "April 18th 2020 15:00"
      },
      {
        "petsitter": null,
        "customer": {
          _id: 2,
          pet: [{
            name: '머브33',
            species: '모란'
          }],
          address: {
            description: '일동로204번길',
            location: {
              lat: 37.405616,
              lng: 126.967735
            }
          }
        },
        "status": 1,
        "dateAndTime": "April 18th 2020 15:00"
      }];

      dispatch(updatePendingMatch(pendingMatch));
    };

    getPendingMatchData();

  }, []);

  const selectLocationHandler = event => {
    console.log("ERR", event.nativeEvent.coordinate.latitude)
    setMyLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  useEffect(() => {
    const pendingsNear = pendingMatches.filter(match => {
      return arePointsNear(match.customer.address.location, myLocation, 5);
    });
    console.log("I want", pendingsNear);

    setPendingsNearby(pendingsNear);

  }, [pendingMatches, myLocation]);

  return (
    <>
      {/* <BottomSheetScreen bottomSheetRef={bottomSheetRef} renderInner={renderInner} /> */}
      <Map
        userData={userData}
        myLocation={myLocation}
        selectLocationHandler={selectLocationHandler}
        pendingsNearby={pendingsNearby}
      />
    </>
  );
};

export default MapScreen;
