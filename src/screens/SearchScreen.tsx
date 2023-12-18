import {StyleSheet, View, SafeAreaView, Keyboard} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {RootStackParamList} from '../navigators/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import {
  Text,
  Searchbar,
  Snackbar,
  Button,
  HelperText,
} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import Config from 'react-native-config';

import * as COLORS from '../styles/Colors';
import ftApi, {requestTimeout} from '../api/ft-api';
import {User} from '../types/user';
import NetworkIssueModal from '../components/NetworkIssueModal';
import {monitorSignals} from '../utils/utils';

export default function SearchScreen(): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
  }>({visible: false, message: ''});
  const [searchBarError, setSearchBarError] = useState<{
    visible: boolean;
    message: string;
  }>({visible: false, message: ''});
  const {isConnected} = useNetInfo();
  let connectionAbortControllerRef = useRef(new AbortController());

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const searchUser = async (): Promise<void> => {
    if (searchInput.length === 0) {
      setSearchBarError({
        ...searchBarError,
        visible: true,
        message: 'Please enter a user to search',
      });
      return;
    }

    const timeoutAbortController = new AbortController();
    const timeoutId = setTimeout((): void => {
      timeoutAbortController.abort();
    }, requestTimeout);

    setIsLoading(true);
    try {
      console.log('sending request..');
      const response = await ftApi.get<User>(
        Config.USER_DETAILS_ROUTE + searchInput,
        {
          signal: monitorSignals([
            timeoutAbortController.signal,
            connectionAbortControllerRef.current.signal,
          ]),
        },
      );

      navigation.navigate('Profile', {user: response.data});
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        let error_message: string;
        if (error.response?.status === 404) {
          error_message = 'User not found.';
        } else if (error?.name === 'CanceledError') {
          error_message = 'Request timed out.';
        } else {
          error_message = 'Unexpected error.';
        }
        setSnackbar({
          ...snackbar,
          visible: true,
          message: error_message + ' Please try again',
        });
      }
    }
    clearTimeout(timeoutId);
    setIsLoading(false);
    setSearchInput('');
    setSearchBarError({
      ...searchBarError,
      visible: false,
      message: '',
    });
  };

  useEffect((): (() => void) => {
    const oldConnectionAbortControllerRef = connectionAbortControllerRef;
    return (): void => {
      oldConnectionAbortControllerRef.current.abort();
      connectionAbortControllerRef.current = new AbortController();
    };
  }, [connectionAbortControllerRef, isConnected]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text variant="titleLarge" style={styles.labelText}>
        Search User
      </Text>
      <View
        style={styles.searchContainer}
        pointerEvents={!isLoading ? 'auto' : 'box-only'}>
        <Searchbar
          value={searchInput}
          onChangeText={setSearchInput}
          style={styles.searchInput}
          placeholder="Ex: kwang or 86759"
          searchAccessibilityLabel="search bar for users"
          loading={isLoading}
          iconColor={COLORS.FT_PRIMARY}
          autoCapitalize="none"
        />
        {searchBarError.visible && (
          <HelperText
            type="error"
            visible={searchBarError.visible}
            style={styles.searchHelperText}>
            {searchBarError.message}
          </HelperText>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonColor={COLORS.FT_SECONDARY}
          mode="contained"
          disabled={isLoading}
          onPress={(): void => {
            searchUser();
            Keyboard.dismiss();
          }}>
          Search
        </Button>
      </View>
      <Snackbar
        style={styles.snackbar}
        visible={snackbar.visible}
        onDismiss={(): void => {
          setSnackbar({...snackbar, visible: false});
        }}
        action={{
          textColor: COLORS.FT_PRIMARY,
          label: 'Dismiss',
          onPress: (): void => {
            setSnackbar({...snackbar, visible: false});
          },
        }}>
        <Text style={styles.snackbarText}>{snackbar.message}</Text>
      </Snackbar>
      <NetworkIssueModal visible={!isConnected} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.FT_PRIMARY,
  },
  labelText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    width: '65%',
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  snackbar: {
    backgroundColor: '#fff',
  },
  snackbarText: {
    color: COLORS.FT_HEADER_TEXT,
  },
  searchHelperText: {
    color: '#fff',
    fontSize: 14,
  },
});
