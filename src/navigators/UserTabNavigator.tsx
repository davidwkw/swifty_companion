import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {createContext} from 'react';
import {User} from '../types/user';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from './StackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as COLORS from '../styles/Colors';

export const UserContext = createContext<User>({
  id: 0,
  email: '',
  login: '',
  first_name: '',
  last_name: '',
  usual_full_name: '',
  usual_first_name: null,
  url: '',
  phone: '',
  displayname: '',
  kind: '',
  image: {
    link: '',
    versions: {
      large: '',
      medium: '',
      small: '',
      micro: '',
    },
  },
  'staff?': false,
  correction_point: 0,
  pool_month: '',
  pool_year: '',
  location: null,
  wallet: 0,
  anonymize_date: '',
  data_erasure_date: '',
  created_at: '',
  updated_at: '',
  alumnized_at: null,
  'alumni?': false,
  'active?': false,
  groups: [],
  cursus_users: [],
  projects_users: [],
  languages_users: [],
  achievements: [],
  titles: [],
  titles_users: [],
  partnerships: [],
  patroned: [],
  patroning: [],
  expertises_users: [],
  roles: [],
  campus: [],
  campus_users: [],
});

export type UserTabParamList = {
  UserProfile: undefined;
  Projects: undefined;
  Achievements: undefined;
};

const Tab = createBottomTabNavigator<UserTabParamList>();

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function UserTabNavigator({
  route,
}: ProfileScreenProps): JSX.Element {
  return (
    <UserContext.Provider value={route.params.user}>
      <Tab.Navigator
        initialRouteName="UserProfile"
        screenOptions={{headerShown: false, tabBarActiveTintColor: COLORS.FT_PRIMARY, tabBarInactiveTintColor: 'black'}}>
        <Tab.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ProfileIcon,
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{
            tabBarLabel: 'Projects',
            tabBarIcon: ProjectIcon,
          }}
        />
        <Tab.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            tabBarLabel: 'Achievements',
            tabBarIcon: AchievementIcon,
          }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const ProfileIcon = ({size}: TabBarIconProps) => {
  return <Icon name="person" size={size} color={COLORS.FT_PRIMARY} />;
};

const ProjectIcon = ({size}: TabBarIconProps) => {
  return <Icon name="library-books" size={size} color={COLORS.FT_PRIMARY} />;
};

const AchievementIcon = ({size}: TabBarIconProps) => {
  return <Icon name="emoji-events" size={size} color={COLORS.FT_PRIMARY} />;
};
