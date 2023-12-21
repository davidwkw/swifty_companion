import {Linking} from 'react-native';
import {ProjectsUser, CursusUser} from '../types/user';

export function openWebsite(websiteLink: string) {
  Linking.openURL(websiteLink);
}

export function openEmail(emailAddress: string) {
  const emailWithScheme = `mailto:${emailAddress}`;
  Linking.openURL(emailWithScheme);
}

export function openPhone(phoneNumber: string) {
  const phoneNumberWithScheme = `tel:${phoneNumber}`;
  Linking.openURL(phoneNumberWithScheme);
}

export function hexToRGBA(hex: string, alpha: number): string {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

export function findProjectsWithStatus(
  projectsUsers: ProjectsUser[],
  status: 'finished' | 'in_progress',
): ProjectsUser[] {
  return projectsUsers.filter(
    (project: ProjectsUser): boolean => project.status === status,
  );
}

export function monitorSignals(signals: Iterable<AbortSignal>): AbortSignal {
  const controller = new AbortController();

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort();
      return signal;
    }

    const abortHandler = (): void => {
      controller.abort();
      for (const signal of signals) {
        signal.removeEventListener('abort', abortHandler);
      }
    };

    signal.addEventListener('abort', abortHandler);
  }

  return controller.signal;
}

export const findCurrentCursusUsers = (
  cursusUsers: CursusUser[],
): CursusUser[] => {
  const currentCursusUsers = cursusUsers.filter(
    (cursusUser: CursusUser): boolean => cursusUser.grade !== null,
  );
  return currentCursusUsers;
};
