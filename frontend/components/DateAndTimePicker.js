import React, { useState } from 'react';
import { StyleSheet, View, Button, Platform, TouchableOpacity, Text } from 'react-native';
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
    setForm({ ...form, birthday: date });
    setShow(false);
  }

  return (
    <View>
      <View style={{ backgroundColor: 'white', marginTop: 10, alignItems: 'flex-start' }}>
        <Button onPress={showDatepicker} title='날짜 선택하기' />
      </View>
      <View style={{ display: 'none' }}>
        <Button onPress={showTimepicker} title='시간' />
      </View>
      {show && (
        <TouchableOpacity style={styles.container}>

          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minuteInterval={5}
            style={{ backgroundColor: 'white' }}
          />

          <View
            style={{ padding: 15, alignItems: 'flex-start', backgroundColor: 'white' }}>
            <TouchableOpacity onPress={confirmDateTime}>
              <Text style={{fontSize: 15}}>확인</Text>
            </TouchableOpacity>
          </View>
          {/* <Button onPress={confirmDateTime} title='확인'></Button> */}
        </TouchableOpacity>
      )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.OS === 'ios' ? '#00000066' : 'transparent',
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  },
})

export default DateAndTimePicker;
