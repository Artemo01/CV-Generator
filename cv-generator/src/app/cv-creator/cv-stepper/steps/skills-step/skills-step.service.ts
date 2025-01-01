import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { ColumnPosition, SkillSection } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsStepService {
  public form: FormArray<FormGroup<ControlsOf<SkillSection>>>;

  public readonly summaryItems$: Observable<SkillSection[]>;

  constructor(
    private readonly cvFormBuilder: CvFormBuilder,
    private readonly builder: FormBuilder
  ) {
    this.form = this.builder.array<FormGroup<ControlsOf<SkillSection>>>([]);
    this.summaryItems$ = this.getSummaryItems();
  }

  private getSummaryItems(): Observable<SkillSection[]> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((formValue) =>
        this.mapToSummaryItems(formValue as Partial<SkillSection>[])
      )
    );
  }

  private mapToSummaryItems(
    formValue: Partial<SkillSection>[]
  ): SkillSection[] {
    return formValue.map((control) => ({
      skills: control.skills || [],
      sectionName: control.sectionName || '',
      showLevel: control.showLevel || false,
      columnPosition: control.columnPosition || ColumnPosition.right,
    }));
  }
}
