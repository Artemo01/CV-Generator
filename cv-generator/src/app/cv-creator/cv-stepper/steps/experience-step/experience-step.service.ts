import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { ColumnPosition, WorkExperienceSection } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceStepService {
  public form: FormGroup<ControlsOf<WorkExperienceSection>>;

  public readonly summaryItems$: Observable<WorkExperienceSection>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildWorkExperienceSectionForm();
    this.summaryItems$ = this.getSummaryItems();
  }

  public updateColumnPosition(position: ColumnPosition): void {
    this.form.patchValue({ columnPosition: position });
  }

  private getSummaryItems(): Observable<WorkExperienceSection> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((formValue) =>
        this.mapToSummaryItems(formValue as Partial<WorkExperienceSection>)
      )
    );
  }

  private mapToSummaryItems(
    formValue: Partial<WorkExperienceSection>
  ): WorkExperienceSection {
    return {
      workExperiences: formValue.workExperiences || [],
      columnPosition: formValue.columnPosition || ColumnPosition.right,
    };
  }
}
