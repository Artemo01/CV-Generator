import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { EducationSection } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';

@Injectable({
  providedIn: 'root',
})
export class EducationStepService {
  public form: FormGroup<ControlsOf<EducationSection>>;
  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildEducationSectionForm();
  }
}
