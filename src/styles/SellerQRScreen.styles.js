import { StyleSheet } from 'react-native';

export const createSellerQRScreenStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  placeholder: { width: 48 },
  content: { flex: 1 },
  hero: {
    height: 80,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  card: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  sliderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sliderValue: { fontSize: 24, fontWeight: '800' },
  slider: { marginTop: 8 },
  schemeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  schemeChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  schemeChipText: { fontSize: 12, fontWeight: '600' },
  qrBox: { marginVertical: 12, padding: 12, borderRadius: 12, alignItems: 'center' },
  primaryButton: { marginTop: 8, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999 },
  primaryButtonText: { fontWeight: '700' },
});


