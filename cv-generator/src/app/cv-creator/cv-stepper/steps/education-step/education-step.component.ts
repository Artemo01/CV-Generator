import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EducationSection } from '../../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { CvFormBuilder } from '../../../cv-form-builder';
import { CommonModule } from '@angular/common';
import { EducationItemComponent } from './education-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-education-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EducationItemComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './education-step.component.html',
  styleUrl: './education-step.component.scss',
})
export class EducationStepComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  public form: FormGroup<ControlsOf<EducationSection>>;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildEducationSectionForm();
  }
  public ngOnInit(): void {
    this.addEducation();
  }

  public nextStep(): void {
    if (this.form.valid) {
      this.next.emit();
    }
  }

  public addEducation(): void {
    this.form.controls.educations.push(
      this.cvFormBuilder.createEducationFormGroup()
    );
  }

  public removeEducation(index: number): void {
    this.form.controls.educations.removeAt(index);
  }
}
