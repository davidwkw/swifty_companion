import React from 'react';
import {StatusBar} from 'react-native';

import * as COLORS from './styles/Colors';
import StackNavigator from './navigators/StackNavigator';

function App(): JSX.Element {
  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.FT_SECONDARY} />
      <StackNavigator />
    </>
  );
}

export default App;
