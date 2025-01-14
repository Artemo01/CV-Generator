import { Component, OnInit } from '@angular/core';
import { CvCreatorService } from '../cv-creator.service';
import { CvDocumentModel } from '../models';
import { CvCreatorProvider } from '../cv-creator.provider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorModalService } from '../../shared/error-modal/error-modal.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  providers: [CvCreatorProvider],
})
export class SummaryComponent implements OnInit {
  public cvDocumentSummaryModel!: CvDocumentModel;

  constructor(
    private readonly service: CvCreatorService,
    private readonly cvProvider: CvCreatorProvider,
    private readonly errorModalService: ErrorModalService
  ) {}

  public ngOnInit(): void {
    this.service.summaryItems$.subscribe((summaryItems) => {
      if (summaryItems != null) {
        this.cvDocumentSummaryModel = summaryItems;
      }
    });
  }

  public downloadCV(): void {
    this.cvProvider.generatePdf(this.cvDocumentSummaryModel).subscribe({
      next: (response: Blob) => this.downloadFile(response),
      error: (error) =>
        this.errorModalService.displayModalError({ message: error.message }),
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
