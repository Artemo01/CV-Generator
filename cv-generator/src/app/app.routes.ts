import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CvCreatorComponent } from './cv-creator/cv-creator.component';
import { CvStepperComponent } from './cv-creator/cv-stepper/cv-stepper.component';
import { SummaryComponent } from './cv-creator/summary/summary.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'creator',
    component: CvCreatorComponent,
    children: [
      { path: '', redirectTo: 'stepper', pathMatch: 'full' },
      { path: 'stepper', component: CvStepperComponent },
      { path: 'summary', component: SummaryComponent },
    ],
  },
];
