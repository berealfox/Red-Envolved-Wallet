import { StyleSheet } from 'react-native';

export const createReceiveScreenStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  tokenSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  tokenOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
  },
  tokenText: {
    fontSize: 14,
    fontWeight: '600',
  },
  qrSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrBackground: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  addressContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  addressShort: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});
