import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AboutMeStepComponent } from './steps/about-me-step/about-me-step.component';
import { ContactStepComponent } from './steps/contact-step/contact-step.component';
import { EducationStepComponent } from './steps/education-step/education-step.component';
import { LanguagesStepComponent } from './steps/languages-step/languages-step.component';
import { HttpClientModule } from '@angular/common/http';
import { AdditionalInfoStepComponent } from './steps/layout-step/layout-step.component';
import { ExperienceStepComponent } from './steps/experience-step/experience-step.component';

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
    ExperienceStepComponent,
  ],
  templateUrl: './cv-stepper.component.html',
  styleUrl: './cv-stepper.component.scss',
})
export class CvStepperComponent {}
