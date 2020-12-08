import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InputPicker = ({ target, options, onChange }) => {
  return (
    <View>
      <Picker
        selectedValue={target}
        onValueChange={value => onChange(value)}
      >
        {options.map((option, index) => {
          return <Picker.Item key={index} label={option} value={option} />;
        })}
      </Picker>
    </View>
  );
};

export default InputPicker;
