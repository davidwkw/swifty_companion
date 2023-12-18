import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  TextProps,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as COLORS from '../../styles/Colors';

type projectItemProps = PropsWithChildren<{
  name: string;
  validated?: boolean | null;
  score?: number | null;
  nameStyle?: StyleProp<TextProps>;
  containerStyle?: StyleProp<ViewProps>;
  validatedIcon?: string;
  unvalidatedIcon?: string;
  scoreStyle?: StyleProp<TextProps>;
  validatedColor?: string;
  unvalidatedColor?: string;
}>;

export default function ProjectItem({
  name,
  validated,
  score,
  containerStyle,
  validatedIcon,
  unvalidatedIcon,
  scoreStyle,
  validatedColor,
  unvalidatedColor,
  nameStyle,
}: projectItemProps): JSX.Element {
  if (score === null || score === undefined) {
    return (
      <View style={[styles.projectItemContainer, containerStyle]}>
        <Text style={[styles.projectName]}>{name}</Text>
      </View>
    );
  }

  const passedValidationColor = validatedColor ?? '#5cb85c';
  const failedValidationColor = unvalidatedColor ?? '#D8636F';
  const scoreTextStyle = [
    styles.score,
    scoreStyle,
    {color: validated ? passedValidationColor : failedValidationColor},
  ];

  return (
    <View style={[styles.projectItemContainer, containerStyle]}>
      <Text style={[styles.projectName, nameStyle]}>{name}</Text>
      {score !== null && score !== undefined && (
        <View style={styles.scoreContainer}>
          {validated !== null && validated !== undefined && validated ? (
            <Icon
              name={validatedIcon || 'check'}
              style={[styles.score, scoreStyle, {color: passedValidationColor}]}
            />
          ) : (
            <Icon
              name={unvalidatedIcon || 'close'}
              style={[styles.score, scoreStyle, {color: failedValidationColor}]}
            />
          )}
          {score !== null && score !== undefined && (
            <Text style={scoreTextStyle}>{score}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  projectItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '1%',
    marginBottom: '1%',
  },
  projectName: {
    fontSize: 16,
    color: COLORS.FT_SECONDARY,
    flex: 7,
    justifyContent: 'center',
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: 16,
  },
});
