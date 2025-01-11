import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AboutMe,
  ColumnPosition,
  Contact,
  Education,
  EducationSection,
  Language,
  LanguageProficiencyLevel,
  LanguageSection,
  Skill,
  SkillSection,
  WorkExperience,
  WorkExperienceSection,
} from './models';
import { ControlsOf } from '../models';
import { cvCreatorValidators } from './cv-creator.constatnts';

@Injectable({
  providedIn: 'root',
})
export class CvFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  public buildAboutMeForm(): FormGroup<ControlsOf<AboutMe>> {
    return this.formBuilder.group({
      firstName: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      lastName: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      job: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      aboutMeText: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public buildContactForm(): FormGroup<ControlsOf<Contact>> {
    return this.formBuilder.group({
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.email,
      }),
      phone: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      born: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      address: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public buildLanguageSectionForm(): FormGroup<ControlsOf<LanguageSection>> {
    return this.formBuilder.group({
      languages: this.formBuilder.array<FormGroup<ControlsOf<Language>>>([]),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public createLanguageFormGroup(): FormGroup<ControlsOf<Language>> {
    return this.formBuilder.group({
      languageName: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      proficiencyLevel: new FormControl<LanguageProficiencyLevel>(
        LanguageProficiencyLevel.beginner,
        {
          nonNullable: true,
          validators: cvCreatorValidators.required,
        }
      ),
    });
  }

  public buildEducationSectionForm(): FormGroup<ControlsOf<EducationSection>> {
    return this.formBuilder.group({
      educations: this.formBuilder.array<FormGroup<ControlsOf<Education>>>([]),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.right, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public createEducationFormGroup(): FormGroup<ControlsOf<Education>> {
    return this.formBuilder.group({
      startDate: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      endDate: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      faculty: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      degreeTitle: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      institutionType: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      additionalInfo: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public buildWorkExperienceSectionForm(): FormGroup<
    ControlsOf<WorkExperienceSection>
  > {
    return this.formBuilder.group({
      workExperiences: this.formBuilder.array<
        FormGroup<ControlsOf<WorkExperience>>
      >([]),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.right, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public createWorkExperienceFormGroup(): FormGroup<
    ControlsOf<WorkExperience>
  > {
    return this.formBuilder.group({
      startDate: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      endDate: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      companyName: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      position: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      experienceDescriptions: this.formBuilder.array<FormControl<string>>(
        [],
        cvCreatorValidators.required
      ),
    });
  }

  public createSkillForm(): FormGroup<ControlsOf<Skill>> {
    return this.formBuilder.group({
      skillName: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      skillLevel: new FormControl<number>(0, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }

  public buildSkillSectionForm(): FormGroup<ControlsOf<SkillSection>> {
    return this.formBuilder.group({
      skills: this.formBuilder.array<FormGroup<ControlsOf<Skill>>>([]),
      sectionName: new FormControl<string>('', {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      showLevel: new FormControl<boolean>(false, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.right, {
        nonNullable: true,
        validators: cvCreatorValidators.required,
      }),
    });
  }
}
