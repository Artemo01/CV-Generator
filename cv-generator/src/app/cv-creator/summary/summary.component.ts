import { Component, OnDestroy, OnInit } from '@angular/core';
import { CvCreatorService } from '../cv-creator.service';
import { CvDocumentModel } from '../models';
import { CvCreatorProvider } from '../cv-creator.provider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorModalService } from '../../shared/error-modal/error-modal.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  providers: [CvCreatorProvider],
})
export class SummaryComponent implements OnInit, OnDestroy {
  public cvDocumentSummaryModel!: CvDocumentModel;

  public isDownload = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly service: CvCreatorService,
    private readonly cvProvider: CvCreatorProvider,
    private readonly errorModalService: ErrorModalService
  ) {}

  public ngOnInit(): void {
    this.service.summaryItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe((summaryItems) => {
        if (summaryItems != null) {
          this.cvDocumentSummaryModel = summaryItems;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public downloadCV(): void {
    this.isDownload = true;
    this.cvProvider
      .generatePdf(this.cvDocumentSummaryModel)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isDownload = false))
      )
      .subscribe({
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
