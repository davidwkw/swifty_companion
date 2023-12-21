import {StyleSheet, SafeAreaView, FlatList, View, Text} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../navigators/UserTabNavigator';
import AchievementItem from '../components/achievement/AchievementItem';
import * as COLORS from '../styles/Colors';

export default function AchievementsScreen() {
  const user = useContext(UserContext);
  const {achievements} = user;

  return (
    <SafeAreaView style={styles.screenContainer}>
      {achievements.length > 0
      ? <FlatList
        data={achievements}
        renderItem={({item}): JSX.Element => <AchievementItem {...item} />}
        keyExtractor={(item): string => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      :
      <View style={styles.noAchievementContainer}>
        <Text style={styles.textStyle}>No achievements to display</Text>
      </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.FT_PRIMARY,
  },
  noAchievementContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
  },
});
