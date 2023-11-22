import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useContext, useMemo} from 'react';
// import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
// import {RootStackParamList} from '../navigators/StackNavigator';
import ProfileSection from '../components/profile/ProfileSection';
import {UserContext} from '../navigators/UserTabNavigator';
// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// import {UserTabParamList} from '../navigators/UserTabNavigator';
import * as COLORS from '../styles/Colors';
import SkillsSection from '../components/profile/SkillsSection';
import {CursusUser} from '../types/user';

// type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
// type ProfileScreenProps = BottomTabScreenProps<UserTabParamList, 'UserProfile'>;

const ProfileScreen = (): JSX.Element => {
  const user = useContext(UserContext);
  const currentCursusUser = useMemo<CursusUser | undefined>(():
    | CursusUser
    | undefined => {
    return user.cursus_users.find(
      (cursus_user: CursusUser): boolean => cursus_user.grade !== null,
    );
  }, [user]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ProfileSection user={user} containerStyle={styles.profileSection} />
      {currentCursusUser !== undefined && (
        <SkillsSection
          skills={currentCursusUser?.skills}
          containerStyle={styles.skillSection}
        />
      )}
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
    marginHorizontal: 20,
  },
});

export default ProfileScreen;
