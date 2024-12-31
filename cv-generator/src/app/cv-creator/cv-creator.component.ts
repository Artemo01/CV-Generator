import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CvStepperComponent } from './cv-stepper/cv-stepper.component';
import { AboutMeStepService } from './cv-stepper/steps/about-me-step/about-me-step.service';
import { ContactStepService } from './cv-stepper/steps/contact-step/contact-step.service';
import { combineLatest, map } from 'rxjs';
import { CvCreatorService } from './cv-creator.service';

@Component({
  selector: 'app-cv-creator',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cv-creator.component.html',
  styleUrl: './cv-creator.component.scss',
})
export class CvCreatorComponent {
  constructor(
    private readonly service: CvCreatorService,
    private readonly router: Router
  ) {}

  public navigateToSummary(): void {
    this.router.navigate(['/creator/summary']);
  }
}
