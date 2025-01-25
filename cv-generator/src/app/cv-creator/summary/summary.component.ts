import { Component, OnDestroy, OnInit } from '@angular/core';
import { CvCreatorService } from '../cv-creator.service';
import { ColumnPosition, CvDocumentModel, AboutMe } from '../models';
import { CvCreatorProvider } from '../cv-creator.provider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorModalService } from '../../shared/error-modal/error-modal.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  providers: [CvCreatorProvider],
})
export class SummaryComponent implements OnInit, OnDestroy {
  public cvDocumentSummaryModel!: CvDocumentModel;
  public image = 'data:image/png;base64,';
  public isDownload = false;
  public leftColumnItems: any[] = [];
  public rightColumnItems: any[] = [];

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
          this.image = this.image + summaryItems.aboutMe.profileImage;
          this.leftColumnItems = this.filterByColumnPosition(
            ColumnPosition.left
          );
          this.rightColumnItems = this.filterByColumnPosition(
            ColumnPosition.right
          );
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

  private filterByColumnPosition(position: ColumnPosition): any[] {
    return [
      this.cvDocumentSummaryModel.aboutMe,
      this.cvDocumentSummaryModel.contact,
      this.cvDocumentSummaryModel.languageSection,
      this.cvDocumentSummaryModel.educationSection,
      this.cvDocumentSummaryModel.workExperienceSection,
      ...this.cvDocumentSummaryModel.skillSections,
    ].filter((item) => item?.columnPosition === position);
  }

  public getProperties(item: any): { key: string; value: any }[] {
    return Object.entries(item).map(([key, value]) => ({ key, value }));
  }
}
