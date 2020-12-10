import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

const verifyPermissions = async (target) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    Alert.alert(
      'Insufficient permissions',
      '사용하려면 설정 -> 해당 어플에 들어가서 위치 접근 권한을 허용해주세요',
      [{ text: 'Okay' }]);
    return false;
  }
  return true;
};

export default verifyPermissions;
