import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const CustomButton = ({ color, title, submitHandler }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color }
      ]}
      onPress={submitHandler}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 7,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomButton;
