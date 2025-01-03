import { Injectable } from '@angular/core';
import { AboutMeStepService } from './cv-stepper/steps/about-me-step/about-me-step.service';
import { ContactStepService } from './cv-stepper/steps/contact-step/contact-step.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { LanguagesStepService } from './cv-stepper/steps/languages-step/languages-step.service';
import { EducationStepService } from './cv-stepper/steps/education-step/education-step.service';
import { ExperienceStepService } from './cv-stepper/steps/experience-step/experience-step.service';
import { CvDocumentModel } from './models';
import { SkillsStepService } from './cv-stepper/steps/skills-step/skills-step.service';

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
    private readonly experienceService: ExperienceStepService,
    private readonly skillsService: SkillsStepService
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
      this.skillsService.summaryItems$,
    ]).pipe(
      map(([aboutMe, contact, languages, education, experience, skills]) => ({
        aboutMe: aboutMe,
        contact: contact,
        languageSection: languages,
        educationSection: education,
        workExperienceSection: experience,
        skillSections: skills,
      }))
    );
  }
}
