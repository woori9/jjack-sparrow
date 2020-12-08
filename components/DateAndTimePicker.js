import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';

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
    const SeoulStandardDate = moment(date).tz("Asia/Seoul");
    const newDate = SeoulStandardDate.format('YYYY-MM-DD');
    //const newDate = SeoulStandardDate.format('MMMM Do YYYY, h:mm a');

    setForm({...form, birthday: newDate});
    setShow(false);
  }

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title='날짜' />
      </View>
      <View>
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
