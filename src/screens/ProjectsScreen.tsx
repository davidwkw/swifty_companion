import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {List} from 'react-native-paper';
// import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ProjectsUser} from '../types/user';
import ProjectItem from '../components/project/ProjectItem';
import TouchableWithModalSelector from '../components/TouchableWithModalSelector';
import {findProjectsWithStatus, hexToRGBA} from '../utils/utils';
import {UserContext} from '../navigators/UserTabNavigator';
import * as COLORS from '../styles/Colors';

export default function ProjectsScreen(): JSX.Element {
  const user = useContext(UserContext);
  const {projects_users} = user;

  const finishedProjects = useMemo(
    (): ProjectsUser[] =>
      findProjectsWithStatus(projects_users, 'finished').sort(
        (currentProject: ProjectsUser, nextProject: ProjectsUser): number => {
          return nextProject.updated_at > currentProject.updated_at
            ? 1
            : nextProject.updated_at < currentProject.updated_at
            ? -1
            : 0;
        },
      ),
    [projects_users],
  );
  const inProgressProjects = useMemo(
    (): ProjectsUser[] =>
      findProjectsWithStatus(projects_users, 'in_progress').sort(
        (currentProject: ProjectsUser, nextProject: ProjectsUser): number => {
          return nextProject.updated_at > currentProject.updated_at
            ? 1
            : currentProject.updated_at < nextProject.updated_at
            ? -1
            : 0;
        },
      ),
    [projects_users],
  );
  const failedProjects = useMemo(
    (): ProjectsUser[] =>
      finishedProjects.filter(
        (project: ProjectsUser): boolean => project['validated?'] === false,
      ),
    [finishedProjects],
  );
  const passedProjects = useMemo(
    (): ProjectsUser[] =>
      finishedProjects.filter(
        (project: ProjectsUser): boolean => project['validated?'] === true,
      ),
    [finishedProjects],
  );

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
        <ScrollView contentContainerStyle={styles.projectsScrollContainer}>
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
            />
          </View>
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
        </ScrollView>
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
});
