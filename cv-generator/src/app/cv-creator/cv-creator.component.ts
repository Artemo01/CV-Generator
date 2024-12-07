import { Component } from '@angular/core';
import { CvStepperComponent } from './cv-stepper/cv-stepper.component';

@Component({
  selector: 'app-cv-creator',
  standalone: true,
  imports: [CvStepperComponent],
  templateUrl: './cv-creator.component.html',
  styleUrl: './cv-creator.component.scss',
})
export class CvCreatorComponent {}
