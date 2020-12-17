import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: 'crimson',
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 5
  },
  registerButton: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 18,
    padding: 13,
    width: '70%',
    borderRadius: 15,
    borderColor: '#BDC581',
    borderWidth: 1,
    backgroundColor: '#F8EFBA',
  }
});

export default globalStyles;
