import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Modal} from 'react-native-paper';

import * as COLORS from '../styles/Colors';

type NetworkIssueModalProps = PropsWithChildren<{
  visible: boolean;
}>;

export default function NetworkIssueModal({
  visible,
}: NetworkIssueModalProps): JSX.Element {
  return (
    <Modal visible={visible} style={styles.modal} dismissable={false}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: '2%',
    paddingTop: '2%',
    paddingBottom: '5%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.FT_HEADER_TEXT,
  },
  modalText: {
    fontSize: 18,
    color: COLORS.FT_HEADER_TEXT,
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
