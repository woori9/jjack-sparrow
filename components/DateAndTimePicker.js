import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateAndTimePicker = ({ form, setForm }) => {
  const [date, setDate] = useState(new Date());//Zulu time
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const showTimepicker = () => {
    setShow(true);
    setMode('time');
  };

  const confirmDateTime = () => {
    setForm({...form, birthday: date});
    setShow(false);
  }

  return (
    <View>
      <View>
        <Button style={{top: 20}} onPress={showDatepicker} title='날짜를 선택해주세요' />
      </View>
      <View style={{display: 'none'}}>
        <Button onPress={showTimepicker} title='시간' />
      </View>
      {show && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minuteInterval={5}
          />
          <Button onPress={confirmDateTime} title='확인'></Button>
        </>
      )}
    </View>
  );
};

export default DateAndTimePicker;
