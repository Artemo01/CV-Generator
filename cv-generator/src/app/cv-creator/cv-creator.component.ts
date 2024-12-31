import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CvStepperComponent } from './cv-stepper/cv-stepper.component';
import { AboutMeStepService } from './cv-stepper/steps/about-me-step/about-me-step.service';
import { ContactStepService } from './cv-stepper/steps/contact-step/contact-step.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-cv-creator',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cv-creator.component.html',
  styleUrl: './cv-creator.component.scss',
})
export class CvCreatorComponent {
  constructor(
    private readonly aboutMeService: AboutMeStepService,
    private readonly contactService: ContactStepService
  ) {
    const summaryItems$ = this.getSummaryItems();

    //console log only for test
    summaryItems$.subscribe((x) => console.log(x));
  }

  private getSummaryItems() {
    return combineLatest([
      this.aboutMeService.summaryItems$,
      this.contactService.summaryItems$,
    ]).pipe(
      map(([aboutMe, contact]) => ({
        aboutMe,
        contact,
      }))
    );
  }
}
