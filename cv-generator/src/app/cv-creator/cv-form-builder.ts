import { Injectable } from '@angular/core';
import {
  FormArray,
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
  LanguageSection,
} from './models';
import { ControlsOf } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CvFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  public buildAboutMeForm(): FormGroup<ControlsOf<AboutMe>> {
    return this.formBuilder.group({
      firstName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      job: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      aboutMeText: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public buildContactForm(): FormGroup<ControlsOf<Contact>> {
    return this.formBuilder.group({
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      phone: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      born: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public buildLanguageSectionForm(): FormGroup<ControlsOf<LanguageSection>> {
    return this.formBuilder.group({
      languages: this.formBuilder.array<FormGroup<ControlsOf<Language>>>([]),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public buildEducationSectionForm(): FormGroup<ControlsOf<EducationSection>> {
    return this.formBuilder.group({
      educations: this.formBuilder.array<FormGroup<ControlsOf<Education>>>([]),
      columnPosition: new FormControl<ColumnPosition>(ColumnPosition.left, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
