import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const verifyPermissions = async (target) => {
  if (target === 'cameraRoll') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        '사용하려면 설정 -> 해당 어플에 들어가서 카메라 앨범 접근 권한을 허용해주세요',
        [{ text: 'Okay' }]);
      return false;
    }
  }
  else if (target === 'camera') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions',
        '사용하려면 설정 -> 해당 어플에 들어가서 카메라 접근 권한을 허용해주세요.',
        [{ text: 'Okay' }]);
      return false;
    }
  }
  return true;
};

const pickImage = async () => {
  const hasPermission = await verifyPermissions('cameraRoll');
  if (!hasPermission) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    return result.uri;
  }
};

const takePicture = async () => {
  const hasPermission = await verifyPermissions('camera');
  if (!hasPermission) return;

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5
  });

  if (!result.cancelled) {
    return result.uri;
  }
};

export { pickImage, takePicture };
