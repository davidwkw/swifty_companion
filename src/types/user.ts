// Generated by https://quicktype.io

export interface User {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: null;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: Image;
  'staff?': boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: null;
  'alumni?': boolean;
  'active?': boolean;
  groups: any[];
  cursus_users: CursusUser[];
  projects_users: ProjectsUser[];
  languages_users: LanguagesUser[];
  achievements: Achievement[];
  titles: Title[];
  titles_users: TitlesUser[];
  partnerships: any[];
  patroned: any[];
  patroning: any[];
  expertises_users: any[];
  roles: any[];
  campus: Campus[];
  campus_users: CampusUser[];
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  // tier: Tier;
  tier: string | 'challenge' | 'easy' | 'hard' | 'medium' | 'none';
  // kind: Kind;
  kind: string | 'pedagogy' | 'project' | 'scolarity' | 'social';
  visible: boolean;
  image: string;
  nbr_of_success: number | null;
  users_url: string;
}

// export enum Kind {
//   Pedagogy = 'pedagogy',
//   Project = 'project',
//   Scolarity = 'scolarity',
//   Social = 'social',
// }

// export enum Tier {
//   Challenge = 'challenge',
//   Easy = 'easy',
//   Hard = 'hard',
//   Medium = 'medium',
//   None = 'none',
// }

export interface Campus {
  id: number;
  name: string;
  time_zone: string;
  language: Language;
  users_count: number;
  vogsphere_id: number;
  country: string;
  address: string;
  zip: string;
  city: string;
  website: string;
  facebook: string;
  twitter: string;
  active: boolean;
  public: boolean;
  email_extension: string;
  default_hidden_phone: boolean;
}

export interface Language {
  id: number;
  name: string;
  identifier: string;
  created_at: string;
  updated_at: string;
}

export interface CampusUser {
  id: number;
  user_id: number;
  campus_id: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface CursusUser {
  grade: null | string;
  level: number;
  skills: Skill[];
  blackholed_at: null;
  id: number;
  begin_at: string;
  end_at: null | string;
  cursus_id: number;
  has_coalition: boolean;
  created_at: string;
  updated_at: string;
  user: UserClass;
  cursus: Cursus;
}

export interface Cursus {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  kind: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
}

export interface UserClass {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: null;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: Image;
  'staff?': boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: null;
  'alumni?': boolean;
  'active?': boolean;
}

export interface Image {
  link: string;
  versions: Versions;
}

export interface Versions {
  large: string;
  medium: string;
  small: string;
  micro: string;
}

export interface LanguagesUser {
  id: number;
  language_id: number;
  user_id: number;
  position: number;
  created_at: string;
}

export interface ProjectsUser {
  id: number;
  occurrence: number;
  final_mark: number | null;
  // status: Status;
  status:
    | string
    | 'in_progress'
    | 'finished'
    | 'searching_a_group'
    | 'waiting_for_correction';
  'validated?': boolean | null;
  current_team_id: number;
  project: Project;
  cursus_ids: number[];
  marked_at: null | string;
  marked: boolean;
  retriable_at: null | string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  parent_id: null;
}

// export enum Status {
//   Finished = 'finished',
//   InProgress = 'in_progress',
// }

export interface Title {
  id: number;
  name: string;
}

export interface TitlesUser {
  id: number;
  user_id: number;
  title_id: number;
  selected: boolean;
  created_at: string;
  updated_at: string;
}