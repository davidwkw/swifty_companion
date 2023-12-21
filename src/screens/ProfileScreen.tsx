import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useContext, useMemo} from 'react';

import ProfileSection from '../components/profile/ProfileSection';
import {UserContext} from '../navigators/UserTabNavigator';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// import {UserTabParamList} from '../navigators/UserTabNavigator';
import * as COLORS from '../styles/Colors';
import SkillsSection from '../components/profile/SkillsSection';
import {CursusUser} from '../types/user';
import { findCurrentCursusUsers } from '../utils/utils';

// type ProfileScreenProps = BottomTabScreenProps<UserTabParamList, 'UserProfile'>;

const ProfileScreen = (): JSX.Element => {
  const user = useContext(UserContext);
  const currentCursusUserArray = useMemo<CursusUser[]>(():
  CursusUser[] => findCurrentCursusUsers(user.cursus_users)
, [user]);
  const renderSkillSection = useCallback((): JSX.Element | undefined => {
    if (currentCursusUserArray.length === 0 && user.cursus_users.length === 0){
      return undefined;
    } else if (currentCursusUserArray.length !== 0){
      return (
        <SkillsSection
          skills={currentCursusUserArray[0].skills}
          containerStyle={styles.skillSection}
        />
      );
    } else {
      return (
        <SkillsSection
          skills={user.cursus_users[user.cursus_users.length - 1].skills}
          containerStyle={styles.skillSection}
        />
      );
    }
  }, [currentCursusUserArray]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ProfileSection user={user} containerStyle={styles.profileSection} />
      {renderSkillSection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.FT_PRIMARY,
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderEndEndRadius: 20,
    width: '100%',
  },
  skillSection: {
    flex: 1,
    width: '100%',
    marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

export default ProfileScreen;
