import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { LanguageSection } from '../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';

@Injectable({
  providedIn: 'root',
})
export class LanguagesStepService {
  public form: FormGroup<ControlsOf<LanguageSection>>;
  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildLanguageSectionForm();
  }
}
