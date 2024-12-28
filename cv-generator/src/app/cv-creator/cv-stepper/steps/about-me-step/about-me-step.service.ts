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
  public form: FormGroup<ControlsOf<AboutMe>>;

  public readonly summaryItems$: Observable<AboutMe>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildAboutMeForm();
    this.summaryItems$ = this.getSummaryItems();
  }

  public updateColumnPosition(position: ColumnPosition): void {
    this.form.patchValue({ columnPosition: position });
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
      columnPosition: formValue.columnPosition || ColumnPosition.left,
    };
  }
}
