import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { respondToMatch } from '../config/api';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = ({ userData, myLocation, selectLocationHandler, pendingsNearby }) => {
  console.log("I WANT", pendingsNearby)
  console.log(userData)
  // latitude: 37.412800584173404,
  // longitude: 126.97131380962955,

  if (!myLocation.lat) return <Text> 현재 위치를 가져오는 중..</Text>

  const _map = useRef(null);
  const _scrollView = useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);


  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= pendingsNearby.length) {
        index = pendingsNearby.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = pendingsNearby[index].customer.address;
          const { lat, lng } = location;
          _map.current.animateToRegion(
            {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0112,
              longitudeDelta: 0.0521,
            },
            500
          );
        }
      }, 10);
    });
  });

  const interpolations = pendingsNearby.map((pending, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const handleMarkerPress = (event) => {
    const markerId = event._targetInst.return.key;

    let x = (markerId * CARD_WIDTH) + (markerId * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        style={styles.map}
        initialRegion={{
          latitude: myLocation.lat,
          longitude: myLocation.lng,
          latitudeDelta: 0.0112,
          longitudeDelta: 0.0521
        }}
      >
        <Marker
          title="My Location"
          coordinate={{
            latitude: myLocation.lat,
            longitude: myLocation.lng
          }}
          draggable
          onDragStart={() => console.log('start drag')}
          onDragEnd={selectLocationHandler}
        />

        {pendingsNearby.map((pendingNearby, index) => {

          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          return <Marker
            key={index}
            coordinate={{
              latitude: pendingNearby.customer.address.location.lat,
              longitude: pendingNearby.customer.address.location.lng
            }}
            onPress={e => handleMarkerPress(e)}
          >
            <Animated.View style={styles.markerWrap}>
              <Animated.Image
                source={require('../assets/map-marker.png')}
                style={styles.marker, scaleStyle}
                resizeMethod='cover'>
              </Animated.Image>
            </Animated.View>
          </Marker>
        })}
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 50}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {pendingsNearby.map((pending, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={require('../assets/favicon.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>pending에 따라서 나중에 넣어주기</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>pending에 따라서 나중에 넣어주기</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("응답하기 -> fetch To server")
                    //mockData라 없지만 match의 아이디... 도 보내야함!!!!
                    // const matchId = pending._id

                    //const { _id, pet } = pending.customer;
                    //console.log(_id, pet);

                    respondToMatch(userData._id, 12345); // mock Match Id..
                    //redux에서 isMatched true로 바꾸기
                  }}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>응답하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  requestContainer: {
    flex: 1,
  },
  request: {
    bottom: 20,
    backgroundColor: 'beige',
    width: '100%'
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
  },

  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default Map;
