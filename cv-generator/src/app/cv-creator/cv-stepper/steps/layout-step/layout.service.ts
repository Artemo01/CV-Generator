import { Injectable } from '@angular/core';
import { AboutMeStepService } from '../about-me-step/about-me-step.service';
import { ContactStepService } from '../contact-step/contact-step.service';
import { EducationStepService } from '../education-step/education-step.service';
import { LanguagesStepService } from '../languages-step/languages-step.service';
import { ExperienceStepService } from '../experience-step/experience-step.service';
import { SkillsStepService } from '../skills-step/skills-step.service';
import {
  AboutMe,
  ColumnPosition,
  Contact,
  EducationSection,
  LanguageSection,
  SkillSection,
  WorkExperienceSection,
} from '../../../models';

export type FormModel =
  | AboutMe
  | Contact
  | EducationSection
  | WorkExperienceSection
  | LanguageSection
  | SkillSection;

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public forms: { id: string; label: string; data: FormModel }[] = [];

  constructor(
    public readonly aboutMeStepService: AboutMeStepService,
    public readonly contactStepService: ContactStepService,
    public readonly languagesStepService: LanguagesStepService,
    public readonly educationStepService: EducationStepService,
    public readonly experienceStepService: ExperienceStepService,
    public readonly skillsStepService: SkillsStepService
  ) {
    this.initializeForms();
  }

  public getLeftColumnForms() {
    return this.forms.filter(
      (form) => form.data.columnPosition === ColumnPosition.left
    );
  }

  public getRightColumnForms() {
    return this.forms.filter(
      (form) => form.data.columnPosition === ColumnPosition.right
    );
  }

  public updateColumnPosition(id: string, position: ColumnPosition): void {
    if (id.startsWith('skill')) {
      const index = parseInt(id.split('-')[1], 10);
      this.skillsStepService.form
        .at(index)
        .patchValue({ columnPosition: position });
      return;
    }
    switch (id) {
      case 'aboutMe':
        this.aboutMeStepService.updateColumnPosition(position);
        break;
      case 'contact':
        this.contactStepService.updateColumnPosition(position);
        break;
      case 'languages':
        this.languagesStepService.updateColumnPosition(position);
        break;
      case 'education':
        this.educationStepService.updateColumnPosition(position);
        break;
      case 'experience':
        this.experienceStepService.updateColumnPosition(position);
        break;
      default:
        console.warn(`No service found for form with id: ${id}`);
    }
  }

  private initializeForms(): void {
    this.forms = [
      {
        id: 'aboutMe',
        label: 'About Me',
        data: this.aboutMeStepService.form.value as AboutMe,
      },
      {
        id: 'contact',
        label: 'Contact',
        data: this.contactStepService.form.value as Contact,
      },
      {
        id: 'languages',
        label: 'Languages',
        data: this.languagesStepService.form.value as LanguageSection,
      },
      {
        id: 'education',
        label: 'Education',
        data: this.educationStepService.form.value as EducationSection,
      },
      {
        id: 'experience',
        label: 'Experience',
        data: this.experienceStepService.form.value as WorkExperienceSection,
      },
    ];

    this.skillsStepService.form.valueChanges.subscribe(() =>
      this.updateSkillsForms()
    );
    this.updateSkillsForms();
  }

  private updateSkillsForms(): void {
    const skillForms = this.skillsStepService.form.controls.map(
      (control, index) => ({
        id: `skill-${index}`,
        label: `Skill Section - ${control.value.sectionName}`,
        data: control.value as SkillSection,
      })
    );

    this.forms = this.forms.filter((form) => !form.id.startsWith('skill'));
    this.forms.push(...skillForms);
  }
}
