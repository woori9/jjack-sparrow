import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { respondToMatch, acceptRequest } from '../config/api';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = ({ userData, myLocation, selectLocationHandler, pendingsNearby, respond }) => {
  if (!myLocation.lat) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> 현재 위치를 가져오는 중..</Text>
    </View>
  );

  console.log('$$$', pendingsNearby)

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
  }, []);

  const interpolations = pendingsNearby.map((pending, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.7, 1],
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
          title="내 위치"
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
                resizeMode='cover'>
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
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 150 }}>
                <Image
                  source={{ uri: pending.pet[0].picture }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{pending.customer.username} 님의 {pending.pet[0].name}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>종류: {pending.pet[0].species}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>성별: {pending.pet[0].sex}</Text>
                <Text numberOfLines={1} style={[styles.cardDescription, { marginTop: 20 }]}>{pending.pet[0].description} 동물 정보</Text>
              </View>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  respond(userData._id, pending._id);
                }
                }
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
        ))}
      </Animated.ScrollView>
    </View>
  );
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
    padding: 5,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
  },

  card: {
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
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: 100,
    height: "100%",
    marginTop: 5,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    marginBottom: 20
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
    borderRadius: 3,
    marginTop: 10
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default Map;
