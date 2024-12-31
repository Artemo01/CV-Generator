import { Injectable } from '@angular/core';
import { AboutMeStepService } from './cv-stepper/steps/about-me-step/about-me-step.service';
import { ContactStepService } from './cv-stepper/steps/contact-step/contact-step.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvCreatorService {
  private summaryItemsSubject = new BehaviorSubject<any>(null);
  public summaryItems$ = this.summaryItemsSubject.asObservable();

  constructor(
    private readonly aboutMeService: AboutMeStepService,
    private readonly contactService: ContactStepService
  ) {
    this.getSummaryItems().subscribe((summaryItems) => {
      this.summaryItemsSubject.next(summaryItems);
    });
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
