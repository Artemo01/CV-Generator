import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { ColumnPosition, LanguageSection } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguagesStepService {
  public form: FormGroup<ControlsOf<LanguageSection>>;

  public readonly summaryItems$: Observable<LanguageSection>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildLanguageSectionForm();
    this.summaryItems$ = this.getSummaryItems();
  }

  public updateColumnPosition(position: ColumnPosition): void {
    this.form.patchValue({ columnPosition: position });
  }

  private getSummaryItems(): Observable<LanguageSection> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((formValue) =>
        this.mapToSummaryItems(formValue as Partial<LanguageSection>)
      )
    );
  }

  private mapToSummaryItems(
    formValue: Partial<LanguageSection>
  ): LanguageSection {
    return {
      languages: formValue.languages || [],
      columnPosition: formValue.columnPosition || ColumnPosition.left,
    };
  }
}
