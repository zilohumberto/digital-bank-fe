import { StyleSheet } from 'react-native';
import colors from './colors';
import fonts from './fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.dark,
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: fonts.regular,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});
