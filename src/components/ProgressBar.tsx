import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

type ProgressBarProps = PropsWithChildren<{
  percentage: number;
  barStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  innerBarColor?: string;
  outerBarColor?: string;
}>;

export default function ProgressBar({
  percentage,
  barStyle,
  label,
  labelStyle,
  innerBarColor,
  outerBarColor,
}: ProgressBarProps): JSX.Element {
  return (
    <View style={[styles.containerStyle, barStyle]}>
      <View style={[styles.outerBar, {backgroundColor: outerBarColor}]}>
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.innerBar,
            {width: `${percentage}%`},
            {backgroundColor: innerBarColor},
          ]}
        />
        <View style={[styles.labelContainer]}>
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {},
  outerBar: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  innerBar: {
    alignItems: 'center',
    height: '100%',
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: '#000',
    fontSize: 14,
  },
});
