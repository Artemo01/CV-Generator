import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AboutMeStepComponent } from './steps/about-me-step/about-me-step.component';
import { ContactStepComponent } from './steps/contact-step/contact-step.component';
import { EducationStepComponent } from './steps/education-step/education-step.component';
import { LanguagesStepComponent } from './steps/languages-step/languages-step.component';
import { CvCreatorProvider } from '../cv-creator.provider';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  templateUrl: './cv-stepper.component.html',
  styleUrl: './cv-stepper.component.scss',
  providers: [CvCreatorProvider],
})
export class CvStepperComponent {
  constructor(private cvProvider: CvCreatorProvider) {}

  public downloadCV(): void {
    this.cvProvider.generatePdf().subscribe({
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
