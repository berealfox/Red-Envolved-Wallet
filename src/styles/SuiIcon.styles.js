import { StyleSheet } from 'react-native';

export const createSuiIconStyles = (theme) => StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  shadow: {
    shadowColor: '#FFD731',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
