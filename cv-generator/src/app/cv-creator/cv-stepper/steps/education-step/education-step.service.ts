import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { ColumnPosition, EducationSection } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationStepService {
  public form: FormGroup<ControlsOf<EducationSection>>;

  public readonly summaryItems$: Observable<EducationSection>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildEducationSectionForm();
    this.summaryItems$ = this.getSummaryItems();
  }

  public updateColumnPosition(position: ColumnPosition): void {
    this.form.patchValue({ columnPosition: position });
  }

  private getSummaryItems(): Observable<EducationSection> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((formValue) =>
        this.mapToSummaryItems(formValue as Partial<EducationSection>)
      )
    );
  }

  private mapToSummaryItems(
    formValue: Partial<EducationSection>
  ): EducationSection {
    return {
      educations: formValue.educations || [],
      columnPosition: formValue.columnPosition || ColumnPosition.right,
    };
  }
}
