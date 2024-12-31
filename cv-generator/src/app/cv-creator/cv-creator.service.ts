import { Injectable } from '@angular/core';
import { AboutMeStepService } from './cv-stepper/steps/about-me-step/about-me-step.service';
import { ContactStepService } from './cv-stepper/steps/contact-step/contact-step.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { LanguagesStepService } from './cv-stepper/steps/languages-step/languages-step.service';
import { EducationStepService } from './cv-stepper/steps/education-step/education-step.service';
import { ExperienceStepService } from './cv-stepper/steps/experience-step/experience-step.service';
import { CvDocumentModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class CvCreatorService {
  private summaryItemsSubject = new BehaviorSubject<CvDocumentModel | null>(
    null
  );
  public summaryItems$ = this.summaryItemsSubject.asObservable();

  constructor(
    private readonly aboutMeService: AboutMeStepService,
    private readonly contactService: ContactStepService,
    private readonly languagesService: LanguagesStepService,
    private readonly educationService: EducationStepService,
    private readonly experienceService: ExperienceStepService
  ) {
    this.getSummaryItems().subscribe((summaryItems) => {
      this.summaryItemsSubject.next(summaryItems);
    });
  }

  private getSummaryItems(): Observable<CvDocumentModel> {
    return combineLatest([
      this.aboutMeService.summaryItems$,
      this.contactService.summaryItems$,
      this.languagesService.summaryItems$,
      this.educationService.summaryItems$,
      this.experienceService.summaryItems$,
    ]).pipe(
      map(([aboutMe, contact, languages, education, experience]) => ({
        aboutMe: aboutMe,
        contact: contact,
        languageSection: languages,
        educationSection: education,
        workExperienceSection: experience,
        skillSections: [],
      }))
    );
  }
}
