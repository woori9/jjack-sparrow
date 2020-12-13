import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyPermissions = async (target) => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        '사용하려면 설정 -> 해당 어플에 들어가서 위치 접근 권한을 허용해주세요',
        [{ text: 'Okay' }]);
      return false;
    }

    return true;
  };

  const getUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

      setPickedLocation({
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
    setIsLoading(false);
  };

  const pickOnMap = () => {
    // props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMap}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={'yellow'} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={'green'}
          onPress={getUserLocation}
        />
        <Button
          title="Pick on Map"
          color={'pink'}
          onPress={pickOnMap}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;
