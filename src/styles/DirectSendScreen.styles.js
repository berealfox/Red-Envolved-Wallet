import { StyleSheet } from 'react-native';

export const createDirectSendScreenStyles = (theme) => StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '600' },
  placeholder: { width: 40 },
  content: { flex: 1, padding: 16 },

  tokenRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tokenPill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 18 },
  tokenPillText: { fontSize: 14, fontWeight: '600' },
  balanceRow: { paddingLeft: 8 },

  amountBlock: { marginTop: 24 },
  amountInput: { fontSize: 48, fontWeight: '700' },
  fiatText: { marginTop: 8 },
  percentChips: { flexDirection: 'row', gap: 12, marginTop: 20, width: '100%' },
  percentChip: { flex: 1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 22, alignItems: 'center' },
  percentChipText: { fontSize: 14, fontWeight: '600' },

  separator: { height: 1, opacity: 0.2, backgroundColor: theme.borderWeak || '#233', marginVertical: 20 },
  toHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toLabel: { fontSize: 14, fontWeight: '600' },
  recipientInput: { fontSize: 28, fontWeight: '700', marginTop: 8, minHeight: 120 },

  bottomCard: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  gasRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  gasLabel: { fontSize: 16, fontWeight: '600' },
  sendButton: { borderRadius: 22, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  sendText: { fontSize: 16, fontWeight: '700' },
});


