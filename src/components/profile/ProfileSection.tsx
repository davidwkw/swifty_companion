import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {PropsWithChildren, useMemo} from 'react';
import {openEmail, openPhone, findCurrentCursusUsers} from '../../utils/utils';
import * as COLORS from '../../styles/Colors';
import {User, CursusUser} from '../../types/user';
import ProgressBar from '../ProgressBar';

type ProfileSectionProps = PropsWithChildren<{
  user: User;
  profileImageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  profileInfoTextStyle?: StyleProp<TextStyle>;
  linkTextStyle?: StyleProp<TextStyle>;
}>;

export default function ProfileSection({
  user,
  profileImageStyle,
  containerStyle,
  profileInfoTextStyle,
  linkTextStyle,
}: ProfileSectionProps): JSX.Element {
  const {
    image,
    displayname,
    login,
    correction_point,
    email,
    phone,
    campus,
    cursus_users,
  } = user;

  const {level, grade} = useMemo<CursusUser | {level: number, grade: string}>(
    (): CursusUser | {level: number, grade: string} => {
      const cursusUsers = findCurrentCursusUsers(cursus_users);
      if (cursusUsers.length !== 0) {
        console.log('found non-null cursus user')
        return cursusUsers[0];
      } else if (cursus_users.length !== 0) {
        console.log('returning latest null cursus user')
        return cursus_users[cursus_users.length - 1]
      } else {
        console.log('returning default level and grade')
        return {level: 0, grade: 'Novice'};
      }
    },
    [cursus_users],
  );

  const levelPercentage = useMemo(
    (): number => parseInt(level.toFixed(2).toString().split('.')[1], 10),
    [level],
  );

  const firstCampus = useMemo((): string => {
    const campusObject = campus[0];
    return `${campusObject.name}`;
  }, [campus]);

  return (
    <View style={[styles.profileContainer, containerStyle]}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{uri: image.versions.medium}}
          style={[styles.imageStyle, profileImageStyle]}
          resizeMode="cover"
          defaultSource={require('../../assets/vector-flat-illustration-grayscale-avatar-600nw-2264922221.webp')}
        />
      </View>
      <View style={styles.profileInfoContentContainer}>
        <Text
          style={[
            styles.profileTextElement,
            styles.textStyle,
            profileInfoTextStyle,
          ]}>
          {displayname} | {login}
        </Text>
        <Text
          style={[
            styles.profileTextElement,
            styles.textStyle,
            profileInfoTextStyle,
          ]}>
          Campus: {firstCampus}
        </Text>
        <Text
          style={[
            styles.profileTextElement,
            styles.textStyle,
            profileInfoTextStyle,
          ]}>
          Grade: {grade}
        </Text>
        <Text
          style={[
            styles.profileTextElement,
            styles.textStyle,
            profileInfoTextStyle,
          ]}>
          Evaluation points: {correction_point}
        </Text>
        <TouchableOpacity
          onPress={(): void => {
            openEmail(email);
          }}
          style={styles.profileTextElement}>
          <Text
            style={[styles.textStyle, styles.linkText, linkTextStyle]}
            selectable>
            {email}
          </Text>
        </TouchableOpacity>
        {phone !== 'hidden' && phone !== null && (
          <TouchableOpacity
            onPress={(): void => {
              openPhone(phone);
            }}
            style={styles.profileTextElement}>
            <Text
              style={[styles.textStyle, styles.linkText, linkTextStyle]}
              selectable>
              {phone}
            </Text>
          </TouchableOpacity>
        )}
        <ProgressBar
          label={`Level ${Math.floor(level)} - ${levelPercentage}%`}
          percentage={levelPercentage}
          barStyle={styles.progressBar}
          innerBarColor={COLORS.FT_SECONDARY}
          outerBarColor="rgba(0,0,0,0.8)"
          labelStyle={styles.progressBarLabel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  profileInfoContainer: {
    flex: 1,
  },
  projectsContainer: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  projectsScrollContainer: {
    paddingHorizontal: '5%',
  },
  textStyle: {
    color: COLORS.FT_TEXT,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  profileInfoContentContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
  },
  linkText: {
    color: COLORS.FT_PRIMARY,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressBar: {
    width: '100%',
    height: 20,
  },
  profileTextElement: {
    marginBottom: 6,
  },
  progressBarLabel: {
    color: '#fff',
  },
});
