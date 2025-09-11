import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createSendMethodModalStyles } from '../styles/SendMethodModal.styles';

const SendMethodModal = ({ visible, onClose, onSelectMethod }) => {
  const { theme } = useTheme();
  const styles = createSendMethodModalStyles(theme);

  const handleMethodSelect = (method) => {
    onSelectMethod(method);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Send Method</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.methodOption}
              onPress={() => handleMethodSelect('direct')}
            >
              <Text style={styles.methodText}>Directly to wallet</Text>
              <Text style={[styles.arrowText, { color: theme.contentSecondary }]}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.methodOption}
              onPress={() => handleMethodSelect('slush')}
            >
              <Text style={styles.methodText}>Claimable Slush link</Text>
              <Text style={[styles.arrowText, { color: theme.contentSecondary }]}>›</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default SendMethodModal;
