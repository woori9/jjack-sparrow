import React, { useState, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateAndTimePicker from '../components/DateAndTimePicker';
import InputPicker from '../components/InputPicker';
import { addUserPet } from '../actions';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import BottomSheetScreen from '../components/BottomSheet';
import { pickImage, takePicture } from '../utils/camera';
import { fetchToRegisterPet, fetchTosavePhoto } from '../config/api';

const PetProfileScreen = () => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef();

  const [imageInfo, setImageInfo] = useState(null);
  const initialForm = {
    name: '',
    sex: 'Female',
    species: '',
    birthday: '',
    weight: '',
    description: ''
  };

  const [isValidateForm, setIsValidateForm] = useState({
    isNameValid: false,
    isSexValid: true,
    isSpeciesValid: false,
    isBirthdayValid: true,
    isWeightValid: false,
    isDescriptionValid: true
  });

  const [form, setForm] = useState(initialForm);
  const { isNameValid, isSpeciesValid, isBirthdayValid, isWeightValid } = isValidateForm;
  const { name, sex, species, birthday, weight, description } = form;

  const onChangeHandler = (text, target) => {
    if (text.trim().length === 0) {
      setIsValidateForm({ ...isValidateForm, [`is${target}Valid`]: false });
    } else {
      setIsValidateForm({ ...isValidateForm, [`is${target}Valid`]: true });
    }

    setForm({ ...form, [`${target.toLowerCase()}`]: text });
  };

  const submitHandler = async () => {
    if (!isNameValid || !isSpeciesValid || !isBirthdayValid || !isWeightValid) {
      Alert.alert('잘못된 입력', '빈칸을 확인해주세요', [{ text: '확인' }]);
      return;
    }

    if (!description.length) {
      setForm({ ...form, description: '없음' });
    }

    const storedURL = await fetchTosavePhoto(userData._id, imageInfo);

    if (storedURL) {
      form.picture = storedURL;
    }

    const registeredPet = await fetchToRegisterPet(userData._id, form);
    dispatch(addUserPet(registeredPet));
    setForm(initialForm);
  };

  const renderInner = () => {
    return <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <CustomButton
        color='beige'
        title='Take Photo'
        submitHandler={async () => {
          const result = await takePicture();
          setImageInfo(result);
          bottomSheetRef.current.snapTo(1);
        }}
      />
      <CustomButton
        color="beige"
        title='Choose From Library'
        submitHandler={async () => {
          const result = await pickImage();
          setImageInfo(result);
          bottomSheetRef.current.snapTo(1);
        }} />
      <CustomButton color="#FF6347" title="Cancel" submitHandler={() => bottomSheetRef.current.snapTo(1)} />
    </View>
  };

  return (
    <View style={styles.container}>
      <BottomSheetScreen bottomSheetRef={bottomSheetRef} renderInner={renderInner} />

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.imageUploading}>
          <View style={styles.imagePickerContainer}>
            <View style={styles.imagePreview}>
              {imageInfo ?
                <View>
                  <Image source={{ uri: imageInfo.uri }} style={{ width: 150, height: 150 }} />
                  <Button title='사진 변경하기' onPress={() => bottomSheetRef.current.snapTo(0)}></Button>
                </View>
                :
                <View style={styles.imageUpload}>
                  <Ionicons name='ios-camera' size={35} color='white' style={styles.cameraIcon} onPress={() => bottomSheetRef.current.snapTo(0)}></Ionicons>
                </View>}
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.inputForm}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => onChangeHandler(text, 'Name')}
              keyboardType='default'
              returnKeyType='next'
              placeholder='이름을 입력해주세요'
            />
          </View>
          <View style={styles.validationText}>
            {!isNameValid && <Text>빈칸을 채워주세요.</Text>}
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.PickerWrapper}>
            <Text style={styles.label}>성별</Text>
            <Picker itemStyle={{ height: 60 }}
              selectedValue={sex}
              style={styles.Picker}
              onValueChange={itemValue => onChangeHandler(itemValue, 'Sex')}>
              <Picker.Item label='Female' value='Female' />
              <Picker.Item label='Male' value='Male' />
            </Picker>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputForm}>
            <Text style={styles.label}>품종</Text>
            <TextInput
              style={styles.input}
              value={species}
              onChangeText={text => onChangeHandler(text, 'Species')}
              returnKeyType='next'
            />
          </View>
          <View style={styles.validationText}>
            {!isSpeciesValid && <Text>빈칸을 채워주세요.</Text>}
          </View>
        </View>

        <View style={styles.wrapper2}>
          <View style={styles.inputForm}>
            <Text style={styles.label}>생일</Text>
            <TextInput
              style={styles.input}
              value={birthday}
            />
          </View>
          <DateAndTimePicker form={form} setForm={setForm} />
          <View style={styles.validationText}>
            {!isBirthdayValid && <Text>빈칸을 채워주세요.</Text>}
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.inputForm}>
            <Text style={styles.label}>몸무게</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={text => onChangeHandler(text, 'Weight')}
              keyboardType='decimal-pad'
              returnKeyType='next'
            />
          </View>
          <View style={styles.validationText}>
            {!isWeightValid && <Text>빈칸을 채워주세요.</Text>}
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputForm}>
            <Text style={styles.label}>특이사항</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={text => onChangeHandler(text, 'Description')}
              placeholder='예) 겁이 많아서 낯선 사람 손을 무서워해요. ~ 병을 앓고 있어요.'
            />
          </View>
        </View >
        <View style={styles.form}>
          <CustomButton color={'green'} title={'Register'} submitHandler={submitHandler} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  imageUploading: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'pink',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputForm: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'gray',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  label: {
    fontSize: 15
  },
  input: {
    width: '50%',
    borderWidth: 1,
    height: 40,
    alignItems: 'center'
  },
  validationText: {
    flex: 1,
    height: 20,
    backgroundColor: 'beige'
  },
  imagePreview: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'red',
  },
  imageUpload: {
    width: 150,
    height: 150,
    borderRadius: 15,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraIcon: {
    opacity: 0.7,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10
  },
  panel: {
    padding: 20,
    backgroundColor: 'pink',
    paddingTop: 20,
  },
  header: {
    backgroundColor: 'red',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  bottomsheet: {
    backgroundColor: 'gray',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PickerWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'purple',
    alignItems: "center",
    marginLeft: 35
  },
  Picker: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  }
});

export default PetProfileScreen;
