import { StyleSheet } from 'react-native';

export const createConfirmationScreenStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  doneText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusIconWrapper: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  durationText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    opacity: 0.2,
    backgroundColor: theme.borderWeak || '#444',
    marginVertical: 4,
  },
  bottomContainer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  explorerButton: {
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerText: {
    fontSize: 14,
    fontWeight: '600',
  },
});


