import { StyleSheet } from 'react-native';

export const createLoadingScreenStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 40,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
