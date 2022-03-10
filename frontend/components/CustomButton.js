import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const CustomButton = ({ color, title, submitHandler, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
        style
      ]}
      onPress={submitHandler}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 7
  },
  buttonTitle: {
    fontSize: 14,
    color: 'black',
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
});

export default CustomButton;
