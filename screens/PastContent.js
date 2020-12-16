import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { updateReview } from '../actions';
import { registerReview } from '../config/api';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import globalStyles from '../styles/global';

const ReviewSchema = yup.object({
  rating: yup.string().required().test('isNum1-5', 'rating must be a number 1 ~ 5', val => {
    return parseInt(val) < 6 && parseInt(val) > 0
  }),
  description: yup.string().required().min(8)
});

const PastContent = ({ pastMatch, userId }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetMatch, setTargetMatch] = useState(null);

  const ReviewForm = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Formik
          initialValues={{ rating: '', description: '' }}
          validationSchema={ReviewSchema}
          onSubmit={async values => {
            const result = await registerReview(userId, targetMatch, values);
            dispatch(updateReview(targetMatch, result));
          }}
        >
          {formikProps => (
            <View style={{ width: '90%', backgroundColor: "beige" }}>

              <TextInput
                style={{ backgroundColor: 'pink', borderWidth: 1, borderColor: '#ddd', padding: 10, fontSize: 18, borderRadius: 6, marginTop: 20 }}
                placeholder='Rating (1-5)'
                onChangeText={formikProps.handleChange('rating')}
                value={formikProps.values.rating}
                keyboardType='numeric'
                onBlur={formikProps.handleBlur('rating')}
              />

              <Text style={globalStyles.errorText}>{formikProps.touched.rating && formikProps.errors.rating}</Text>

              <TextInput
                style={{ backgroundColor: 'pink', borderWidth: 1, borderColor: '#ddd', padding: 10, fontSize: 18, borderRadius: 6, marginTop: 20, height: '60%' }}
                placeholder='Riview body'
                onChangeText={formikProps.handleChange('description')}
                value={formikProps.values.description}
                onBlur={formikProps.handleBlur('description')}
                multiline
              />

              <Text style={globalStyles.errorText}>{formikProps.touched.description && formikProps.errors.description}</Text>

              <Button title='submit' color='maroon' onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    )
  };
  //#ffcccc
  return (
    <View style={{ flex: 1, backgroundColor: 'beige' }}>

      <Modal
        visible={modalOpen}
        animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <MaterialIcons
              style={{ marginBottom: 10, borderRadius: 10, marginTop: 20, alignSelf: 'flex-end' }}
              name='close'
              size={24}
              onPress={() => {
                setModalOpen(false)
                setTargetMatch(null);
              }}
            />
            <Text style={{ marginLeft: 20 }}>후기 등록하기</Text>
            <ReviewForm />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        style={{ marginTop: 10 }}
        keyExtractor={match => match._id}
        data={pastMatch}
        renderItem={({ item }) => {
          const otherUser = item.customer._id === userId ? item.petsitter.username : item.customer.username;

          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, backgroundColor: 'white', alignItems: 'center' }}>
              <Text style={{ fontSize: 17 }}>{otherUser}님 과의 매치</Text>
              {item.review ? (
                <TouchableOpacity style={{ backgroundColor: 'pink', width: 100, height: 30, alignItems: 'center', padding: 6, borderRadius: 7 }}>
                  <Text style={{ fontSize: 15, color: 'blue' }}>완료</Text>
                </TouchableOpacity>) : (
                  <TouchableOpacity
                    style={{ backgroundColor: 'pink' }}
                    onPress={() => {
                      setModalOpen(true);
                      setTargetMatch(item._id);
                    }}>
                    <Text>후기 남기기</Text>
                  </TouchableOpacity>
                )}
            </View>
          );
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
});

export default PastContent;
