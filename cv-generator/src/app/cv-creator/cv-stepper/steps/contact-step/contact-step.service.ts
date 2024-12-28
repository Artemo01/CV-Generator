import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { ColumnPosition, Contact } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactStepService {
  public form: FormGroup<ControlsOf<Contact>>;

  public readonly summaryItems$: Observable<Contact>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildContactForm();
    this.summaryItems$ = this.getSummaryItems();
  }

  public updateColumnPosition(position: ColumnPosition): void {
    this.form.patchValue({ columnPosition: position });
  }

  private getSummaryItems(): Observable<Contact> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((formValue) => this.mapToSummaryItems(formValue))
    );
  }

  private mapToSummaryItems(formValue: Partial<Contact>): Contact {
    return {
      email: formValue.email || '',
      phone: formValue.phone || '',
      born: formValue.born || new Date(),
      address: formValue.address || '',
      columnPosition: formValue.columnPosition || ColumnPosition.left,
    };
  }
}
