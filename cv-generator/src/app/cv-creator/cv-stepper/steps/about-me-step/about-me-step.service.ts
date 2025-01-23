import { Injectable } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { AboutMe, ColumnPosition } from '../../../models';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';

@Injectable({
  providedIn: 'root',
})
export class AboutMeStepService {
  private readonly acceptedFileTypes = ['image/png', 'image/jpeg'];

  public form: FormGroup<ControlsOf<AboutMe>>;

  public readonly summaryItems$: Observable<AboutMe>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildAboutMeForm();
    this.summaryItems$ = this.getSummaryItems();
  }

  public updateColumnPosition(position: ColumnPosition): void {
    this.form.patchValue({ columnPosition: position });
  }

  public processFile(file: File): void {
    if (this.isFileTypeAccepted(file.type)) {
      this.convertFileToBase64(file);
    } else {
      console.error('Unsupported file type. Please upload a PNG or JPG image.');
    }
  }

  private isFileTypeAccepted(fileType: string): boolean {
    return this.acceptedFileTypes.includes(fileType);
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string)?.split(',')[1];
      if (base64Data) {
        this.updateProfileImage(base64Data);
      }
    };
    reader.readAsDataURL(file);
  }

  private updateProfileImage(base64Image: string): void {
    this.form.patchValue({ profileImage: base64Image });
  }

  private getSummaryItems(): Observable<AboutMe> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((formValue) => this.mapToSummaryItems(formValue))
    );
  }

  private mapToSummaryItems(formValue: Partial<AboutMe>): AboutMe {
    return {
      firstName: formValue.firstName || '',
      lastName: formValue.lastName || '',
      job: formValue.job || '',
      aboutMeText: formValue.aboutMeText || '',
      profileImage: formValue.profileImage || '',
      columnPosition: formValue.columnPosition || ColumnPosition.left,
    };
  }
}
