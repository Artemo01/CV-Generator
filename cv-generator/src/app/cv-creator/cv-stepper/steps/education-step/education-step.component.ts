import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CvFormBuilder } from '../../../cv-form-builder';
import { CommonModule } from '@angular/common';
import { EducationItemComponent } from './education-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EducationStepService } from './education-step.service';

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

  constructor(
    public readonly service: EducationStepService,
    private cvFormBuilder: CvFormBuilder
  ) {}
  public ngOnInit(): void {
    this.addEducation();
  }

  public nextStep(): void {
    if (this.service.form.valid) {
      this.next.emit();
    }
  }

  public addEducation(): void {
    this.service.form.controls.educations.push(
      this.cvFormBuilder.createEducationFormGroup()
    );
  }

  public removeEducation(index: number): void {
    this.service.form.controls.educations.removeAt(index);
  }
}
