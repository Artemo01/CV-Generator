import { Component } from '@angular/core';
import { EducationSection } from '../../../models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { CommonModule } from '@angular/common';
import { EducationItemComponent } from './education-item.component';

@Component({
  selector: 'app-education-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EducationItemComponent],
  templateUrl: './education-step.component.html',
  styleUrl: './education-step.component.scss',
})
export class EducationStepComponent {
  public form: FormGroup<ControlsOf<EducationSection>>;

  constructor(
    private cvFormBuilder: CvFormBuilder,
    private formBuilder: FormBuilder
  ) {
    this.form = this.cvFormBuilder.buildEducationSectionForm();
  }
}
