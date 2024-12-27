import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { Contact } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';

@Injectable({
  providedIn: 'root',
})
export class ContactStepService {
  public form: FormGroup<ControlsOf<Contact>>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildContactForm();
  }
}
