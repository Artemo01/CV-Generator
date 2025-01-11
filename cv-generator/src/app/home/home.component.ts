import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ErrorModalService } from '../shared/error-modal/error-modal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public steps = [
    {
      step: 1,
      title: 'StringCreateNewProject',
      description: 'StringClickCreateCVNowToGetStartedOnYourNewProject',
      image: 'assets/step1.png',
    },
    {
      step: 2,
      title: 'StringFillInTheIndicatedFields',
      description:
        'The CV builder will allow you to create a professional CV easily, quickly and conveniently. Just fill out the form and your document will be automatically generated based on the information you provide',
      image: 'assets/step2.png',
    },
    {
      step: 3,
      title: 'StringDownloadPDFWithYourCV',
      description:
        'StringYourResumeWillBeImmediatelyReadyForDownloadInPDFFormat',
      image: 'assets/step3.png',
    },
  ];

  constructor(
    private router: Router,
    public errorModalService: ErrorModalService
  ) {}

  public goToCvCreator(): void {
    this.router.navigate(['/creator']);
  }
}
