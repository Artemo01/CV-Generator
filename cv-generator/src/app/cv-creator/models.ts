import { FormGroup, FormControl } from '@angular/forms';

export type ControlsOf<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};

export interface CvDocumentModel {
  aboutMe: AboutMe;
  contact: Contact;
  languageSection: LanguageSection;
  educationSection: EducationSection;
  workExperienceSection: WorkExperienceSection;
  skillSections: SkillSection[];
}

export interface AboutMe extends ColumnPositionModel {
  firstName: string;
  lastName: string;
  job: string;
  aboutMeText: string;
}

export interface Contact extends ColumnPositionModel {
  email: string;
  phone: string;
  born: Date;
  address: string;
}

export interface Education {
  startDate: Date;
  endDate: Date;
  faculty: string;
  degreeTitle: string;
  institutionType: string;
  additionalInfo: string;
}

export interface EducationSection extends ColumnPositionModel {
  educations: Education[];
}

export interface Language {
  languageName: string;
  proficiencyLevel: LanguageProficiencyLevel;
}

export interface LanguageSection extends ColumnPositionModel {
  languages: Language[];
}

export interface Skill {
  skillName: string;
  skillLevel: number;
}

export interface SkillSection extends ColumnPositionModel {
  skills: Skill[];
  sectionName: string;
  showLevel: boolean;
}

export interface WorkExperience {
  startDate: Date;
  endDate: Date;
  companyName: string;
  position: string;
  experienceDescriptions: string[];
}

export interface WorkExperienceSection extends ColumnPositionModel {
  workExperiences: WorkExperience[];
}

export interface ColumnPositionModel {
  columnPosition: ColumnPosition;
}

export enum ColumnPosition {
  left,
  right,
}

export enum LanguageProficiencyLevel {
  beginner,
  intermediate,
  advanced,
  fluent,
  native,
}
