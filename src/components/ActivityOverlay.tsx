import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {Props} from 'react-native-paper/src/components/ActivityIndicator';

type ActivityOverlayProp = PropsWithChildren<{
  overlayStyle?: StyleProp<ViewStyle>;
  indicatorProps?: Props;
}>;

export default function ActivityOverlay(
  props: ActivityOverlayProp,
): JSX.Element {
  return (
    <View style={[styles.activityIndicator, props?.overlayStyle]}>
      <ActivityIndicator {...props?.indicatorProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});
