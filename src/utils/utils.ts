import {Linking} from 'react-native';
import {ProjectsUser} from '../types/user';

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

    signal.addEventListener('abort', (): void => controller.abort());
  }

  return controller.signal;
}