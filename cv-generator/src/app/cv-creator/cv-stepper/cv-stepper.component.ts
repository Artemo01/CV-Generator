import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AboutMeStepComponent } from './steps/about-me-step/about-me-step.component';
import { ContactStepComponent } from './steps/contact-step/contact-step.component';
import { EducationStepComponent } from './steps/education-step/education-step.component';
import { LanguagesStepComponent } from './steps/languages-step/languages-step.component';
import { CvCreatorProvider } from '../cv-creator.provider';
import { HttpClientModule } from '@angular/common/http';
import {
  ColumnPosition,
  CvDocumentModel,
  LanguageProficiencyLevel,
} from '../models';
import { AdditionalInfoStepComponent } from './steps/layout-step/layout-step.component';

@Component({
  selector: 'app-cv-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    AboutMeStepComponent,
    ContactStepComponent,
    LanguagesStepComponent,
    EducationStepComponent,
    AdditionalInfoStepComponent,
    HttpClientModule,
  ],
  templateUrl: './cv-stepper.component.html',
  styleUrl: './cv-stepper.component.scss',
  providers: [CvCreatorProvider],
})
export class CvStepperComponent {
  private documentModel: CvDocumentModel;

  constructor(private cvProvider: CvCreatorProvider) {
    this.documentModel = {
      aboutMe: {
        firstName: 'Jan',
        lastName: 'Kowalski',
        job: 'Full-Stack Developer',
        aboutMeText: 'Z pasją tworzę nowoczesne aplikacje webowe.',
        columnPosition: ColumnPosition.left,
      },
      contact: {
        email: 'jan.kowalski@example.com',
        phone: '+48 123 456 789',
        born: new Date('1990-01-01'),
        address: 'ul. Przykładowa 1, 00-000 Miasto',
        columnPosition: ColumnPosition.left,
      },
      languageSection: {
        languages: [
          {
            languageName: 'Polski',
            proficiencyLevel: LanguageProficiencyLevel.native,
          },
          {
            languageName: 'Angielski',
            proficiencyLevel: LanguageProficiencyLevel.fluent,
          },
        ],
        columnPosition: ColumnPosition.left,
      },
      educationSection: {
        educations: [
          {
            startDate: new Date('2010-10-01'),
            endDate: new Date('2014-06-30'),
            faculty: 'Informatyka',
            degreeTitle: 'Inżynier',
            institutionType: 'Politechnika',
            additionalInfo: 'Specjalizacja: Programowanie aplikacji webowych',
          },
        ],
        columnPosition: ColumnPosition.right,
      },
      workExperienceSection: {
        workExperiences: [
          {
            startDate: new Date('2015-07-01'),
            endDate: new Date('2020-09-30'),
            companyName: 'ABC Software',
            position: 'Programista',
            experienceDescriptions: [
              'Tworzenie aplikacji webowych',
              'Praca w zespole SCRUM',
            ],
          },
        ],
        columnPosition: ColumnPosition.right,
      },
      skillSections: [
        {
          sectionName: 'Technologie',
          skills: [
            { skillName: 'JavaScript', skillLevel: 90 },
            { skillName: 'Angular', skillLevel: 80 },
          ],
          showLevel: true,
          columnPosition: ColumnPosition.right,
        },
      ],
    };
  }

  public downloadCV(): void {
    this.cvProvider.generatePdf(this.documentModel).subscribe({
      next: (response: Blob) => this.downloadFile(response),
      error: (error) => console.error('Error generating CV:', error),
    });
  }

  private downloadFile(blob: Blob): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FakeCV.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
