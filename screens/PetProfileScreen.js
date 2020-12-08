import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateAndTimePicker from '../components/DateAndTimePicker';
import AlbumImagePicker from '../components/ImagePicker';
import InputPicker from '../components/InputPicker';
import axiosInstance from '../config/axiosInstance';
import { addUserPet } from '../actions';
// /ADD_USER_PET

const PetProfileScreen = () => {
  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();

  console.log("^^", user);
  const [image, setImage] = useState(null);
  const initialForm = {
    name: '',
    sex: 'Female',
    species: '',
    birthday: '',
    weight: '0',//textInput: String
    description: ''
  };

  const [isValidateForm, setIsValidateForm] = useState({
    isNameValid: true,
    isSexValid: true,
    isSpeciesValid: true,
    isBirthdayValid: true,
    isWeightValid: true,
    isDescriptionValid: true
  });

  const [form, setForm] = useState(initialForm);
  const { isNameValid, isSpeciesValid, isBirthdayValid, isWeightValid, isDescriptionValid } = isValidateForm;
  const { name, sex, species, birthday, weight, description } = form;
  console.log(isValidateForm)
  console.log(form);

  const onChangeHandler = (text, target) => {
    if (text.trim().length === 0) {
      setIsValidateForm({ ...isValidateForm, [`is${target}Valid`]: false });
    } else {
      setIsValidateForm({ ...isValidateForm, [`is${target}Valid`]: true });
    }

    setForm({ ...form, [`${target.toLowerCase()}`]: text });
  };

  const submitHandler = async () => {
    console.log('submit');

    if (!isNameValid || !isSpeciesValid || !isBirthdayValid || !isWeightValid) {
      Alert.alert('잘못된 입력', '빈칸을 확인해주세요', [{ text: '확인' }]);
      return;
    }

    if (!description.length) {
      setForm({ ...form, description: '없음' });
    }

    if (image) {
      form.picture = image;
      console.log("Image added fomm", form);
    }

    try {
      const response = await axiosInstance.post(`user/${user._id}/pet`, {
        petData: form
      });

      const status = response.status;
      //const { petData } = response.data;

      if (status === 201) {
        //dispatch(addUserPet(petData));
      }
    } catch (err) {
      console.log(err);
    }

    setForm(initialForm);
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View>
          <AlbumImagePicker image={image} setImage={setImage} />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => onChangeHandler(text, 'Name')}
            keyboardType='default'
            returnKeyType='next'
            placeholder='이름을 입력해주세요'
          />
          {!isNameValid && <Text>빈칸을 채워주세요.</Text>}
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>성별</Text>
          <Picker
            selectedValue={sex}
            style={{ height: 50, width: 100 }}
            onValueChange={itemValue => onChangeHandler(itemValue, 'Sex')}>
            <Picker.Item label='Female' value='Female' />
            <Picker.Item label='Male' value='Male' />
          </Picker>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>품종</Text>
          <TextInput
            style={styles.input}
            value={species}
            onChangeText={text => onChangeHandler(text, 'Species')}
          />
          {!isSpeciesValid && <Text>빈칸을 채워주세요.</Text>}
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>생일</Text>
          <Text>{birthday}</Text>
          <DateAndTimePicker form={form} setForm={setForm} />
          {!isBirthdayValid && <Text>빈칸을 채워주세요.</Text>}
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>몸무게</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={text => onChangeHandler(text, 'Weight')}
            keyboardType='decimal-pad'
          />
          {!isWeightValid && <Text>빈칸을 채워주세요.</Text>}
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>특이사항</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => onChangeHandler(text, 'Description')}
            placeholder='예) 겁이 많아서 낯선 사람 손을 무서워해요. ~ 병을 앓고 있어요.'
          />
        </View>
        {/* <View>
          <Picker
            selectedValue={sex}
            style={{ height: 50, width: 100 }}
            onValueChange={itemValue => onChangeHandler(itemValue, 'Sex')}>
            <Picker.Item label='Female' value='Female' />
            <Picker.Item label='Male' value='Male' />
          </Picker>
        </View> */}
        <TouchableOpacity
          style={styles.RegisterButton}
          onPress={submitHandler}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PetProfileScreen;
