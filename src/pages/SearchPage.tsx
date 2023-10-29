import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import * as Colors from '../constants/Colors';

export default function SearchPage(): JSX.Element {
  return (
    <View style={styles.pageContainer}>
      <Text>Search Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
  },
});
