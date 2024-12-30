import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExperienceStepService } from './experience-step.service';
import { CvFormBuilder } from '../../../cv-form-builder';
import { CommonModule } from '@angular/common';
import { ExperienceItemComponent } from './experience-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-experience-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExperienceItemComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './experience-step.component.html',
  styleUrl: './experience-step.component.scss',
})
export class ExperienceStepComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  constructor(
    public readonly service: ExperienceStepService,
    private cvFormBuilder: CvFormBuilder
  ) {}

  public ngOnInit(): void {
    this.addExperience();
  }

  public nextStep(): void {
    if (this.service.form.valid) {
      this.next.emit();
    }
  }

  public addExperience(): void {
    this.service.form.controls.workExperiences.push(
      this.cvFormBuilder.createWorkExperienceFormGroup()
    );
  }

  public removeExperience(index: number): void {
    this.service.form.controls.workExperiences.removeAt(index);
  }
}
