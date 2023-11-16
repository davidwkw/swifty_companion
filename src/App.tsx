import React from 'react';
import {StatusBar} from 'react-native';

import * as Colors from './constants/Colors';
import StackNavigator from './navigators/StackNavigator';

function App(): JSX.Element {
  return (
    <>
      <StatusBar animated={true} backgroundColor={Colors.FT_SECONDARY} />
      <StackNavigator />
    </>
  );
}

export default App;
