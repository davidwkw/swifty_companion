import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Achievement} from '../../types/user';
import * as COLORS from '../../styles/Colors';

export default function AchievementItem(achievement: Achievement): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.header]}>{achievement.name}</Text>
      <Text style={[styles.text]}>{achievement.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.FT_SECONDARY,
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
});
