import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import * as Colors from '../constants/Colors';

export default function SearchPage(): JSX.Element {
  const [searchInput, setSearchInput] = useState('');

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.headerText}>Search Page</Text>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchInput}
          onChangeText={setSearchInput}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.FTSecondary}
          title="Clear"
          onPress={(): void => console.log('Hello world')}
        />
        <Button
          color={Colors.FTPrimary}
          title="Search"
          onPress={(): void => console.log('Hello world')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  pageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.FTPrimary,
  },
  searchContainer: {
    width: '60%',
  },
  searchInput: {
    backgroundColor: 'white',
    marginVertical: 12,
  },
  buttonContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {},
});
