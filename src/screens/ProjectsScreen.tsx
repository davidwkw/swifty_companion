import {ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {List} from 'react-native-paper';
// import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ProjectsUser, User} from '../types/user';
import ProjectItem from '../components/project/ProjectItem';
import TouchableWithModalSelector from '../components/TouchableWithModalSelector';
import {findProjectsWithStatus, hexToRGBA} from '../utils/utils';
import {UserContext} from '../navigators/UserTabNavigator';
import * as COLORS from '../styles/Colors';

const sortProjectsByDateCallback = (currentProject: ProjectsUser, nextProject: ProjectsUser): number => {
  if (nextProject.updated_at > currentProject.updated_at){
    return 1;
  } else if (nextProject.updated_at < currentProject.updated_at){
    return -1;
  } else{
    return 0;
  }
}

const sortProjectsByScoreCallback = (currentProject: ProjectsUser, nextProject: ProjectsUser): number => {
  if (currentProject.final_mark == null || nextProject.final_mark == null)
    return 0;
  if (nextProject.final_mark > currentProject.final_mark){
    return 1;
  } else if (nextProject.final_mark < currentProject.final_mark){
    return -1;
  } else{
    return 0;
  }
}

export default function ProjectsScreen(): JSX.Element {
  const user = useContext(UserContext);
  const [projectsUsers, setProjectsUsers] = useState<ProjectsUser[]>([...user.projects_users].sort(sortProjectsByDateCallback));

  const sortProjectsUser = useCallback((cb: (currentProject: ProjectsUser, nextProject: ProjectsUser) => number): void => {
    const newProjectsUser: ProjectsUser[] = [...projectsUsers];
    newProjectsUser.sort(cb);
    setProjectsUsers(newProjectsUser);
  }, [])

  const finishedProjects = useMemo(
    (): ProjectsUser[] =>
      findProjectsWithStatus(projectsUsers, 'finished'),
    [projectsUsers],
  );
  const inProgressProjects = useMemo(
    (): ProjectsUser[] =>
      findProjectsWithStatus(projectsUsers, 'in_progress'),
    [projectsUsers],
  );
  const failedProjects = useMemo(
    (): ProjectsUser[] =>
      finishedProjects.filter(
        (project: ProjectsUser): boolean => project['validated?'] === false
      ),
    [finishedProjects],
  );
  const passedProjects = useMemo(
    (): ProjectsUser[] =>
      finishedProjects.filter(
        (project: ProjectsUser): boolean => project['validated?'] === true
      ),
    [finishedProjects],
  );

  const sortModalByDateCallback = useCallback((): void => {
    sortProjectsUser(sortProjectsByDateCallback);
    setIsDropdownPressed(false);
  }, [])

  const sortModalByScoreCallback = useCallback((): void => {
    sortProjectsUser(sortProjectsByScoreCallback);
    setIsDropdownPressed(false);
  }, [])

  const [expandedAccordionID, setExpandedAccordionID] = useState<number>(
    (): number => {
      let expandId = 0;
      if (inProgressProjects.length !== 0) {
        expandId = 1;
      } else if (passedProjects.length !== 0) {
        expandId = 2;
      } else if (failedProjects.length !== 0) {
        expandId = 3;
      }
      return expandId;
    },
  );

  const [isDropdownPressed, setIsDropdownPressed] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.projectsContainer}>
        <View style={styles.accordionSectionContainer}>
          <Text style={styles.accordionSection}>Projects:</Text>
          <TouchableWithModalSelector
            label="Sort by"
            labelStyle={styles.dropdownLabel}
            containerStyle={styles.dropdownContainer}
            left={<Icon name="sort" style={styles.dropdownLabel} />}
            right={
              <Icon
                name={!isDropdownPressed ? 'expand-less' : 'expand-more'}
                style={styles.dropdownLabel}
              />
            }
            dropdownVisible={isDropdownPressed}
            onButtonPress={(): void => setIsDropdownPressed(!isDropdownPressed)}
            externalPress={(): void => setIsDropdownPressed(false)}
            modalOptions={[
              {title: 'Date', callback: sortModalByDateCallback, icon: 'calendar-month'},
              {title: 'Score', callback: sortModalByScoreCallback, icon: '123'},
            ]}
          />
        </View>
        {projectsUsers.length > 0
        ? (<ScrollView contentContainerStyle={styles.projectsScrollContainer}>
          <List.AccordionGroup
            expandedId={expandedAccordionID}
            onAccordionPress={(currentExpandedId: number | string): void => {
              if (typeof currentExpandedId === 'string') {
                currentExpandedId = parseInt(currentExpandedId, 10);
              }
              if (currentExpandedId === expandedAccordionID) {
                currentExpandedId = 0;
              }
              setExpandedAccordionID(currentExpandedId);
            }}>
            {inProgressProjects.length > 0 && (
              <List.Accordion
                title="In Progress"
                id={1}
                theme={{colors: {background: 'transparent'}}}
                style={styles.accordion}
                titleStyle={styles.accordionText}>
                <View style={styles.accordionContentContainer}>
                  {inProgressProjects.map(
                    (project: ProjectsUser): JSX.Element => {
                      return (
                        <ProjectItem
                          key={project.id}
                          name={project.project.name}
                          validated={project['validated?']}
                          score={project.final_mark}
                        />
                      );
                    },
                  )}
                </View>
              </List.Accordion>
            )}
            {passedProjects.length > 0 && (
              <List.Accordion
                title="Passed"
                id={2}
                theme={{colors: {background: 'transparent'}}}
                style={styles.accordion}
                titleStyle={styles.accordionText}>
                <View style={styles.accordionContentContainer}>
                  {passedProjects.map((project: ProjectsUser): JSX.Element => {
                    return (
                      <ProjectItem
                        key={project.id}
                        name={project.project.name}
                        validated={project['validated?']}
                        score={project.final_mark}
                      />
                    );
                  })}
                </View>
              </List.Accordion>
            )}
            {failedProjects.length > 0 && (
              <List.Accordion
                title="Failed"
                id={3}
                theme={{colors: {background: 'transparent'}}}
                style={styles.accordion}
                titleStyle={styles.accordionText}>
                <View style={styles.accordionContentContainer}>
                  {failedProjects.map((project: ProjectsUser): JSX.Element => {
                    return (
                      <ProjectItem
                        key={project.id}
                        name={project.project.name}
                        validated={project['validated?']}
                        score={project.final_mark}
                      />
                    );
                  })}
                </View>
              </List.Accordion>
            )}
          </List.AccordionGroup>
        </ScrollView>)
        :
        <View style={styles.noProjectsContainer}>
          <Text style={{fontSize: 18, color: COLORS.FT_SECONDARY}}>No projects available</Text>
        </View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  accordionSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
    paddingLeft: '4%',
    alignItems: 'center',
  },
  accordionSection: {
    color: COLORS.FT_SECONDARY,
    fontSize: 18,
    fontWeight: '500',
  },
  accordion: {
    backgroundColor: COLORS.FT_PRIMARY,
    borderRadius: 20,
  },
  accordionContentContainer: {
    paddingHorizontal: '5%',
    marginBottom: '2%',
  },
  accordionText: {
    color: '#fff',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: hexToRGBA(COLORS.FT_PRIMARY, 0.8),
    paddingHorizontal: '2%',
  },
  dropdownLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: '0.2%',
    color: COLORS.FT_SECONDARY,
  },
  noProjectsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
