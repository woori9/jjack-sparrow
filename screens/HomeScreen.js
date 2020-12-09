import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('후기')}>
        <Text>Go to Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  }
});

export default HomeScreen;
