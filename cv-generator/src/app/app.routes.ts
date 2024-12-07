import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CvCreatorComponent } from './cv-creator/cv-creator.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cv-creator', component: CvCreatorComponent },
];
