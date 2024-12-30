import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ControlsOf } from '../../../../models';
import { WorkExperience } from '../../../models';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatExpansionModule,
  ],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
})
export class ExperienceItemComponent {
  @Input() form!: FormGroup<ControlsOf<WorkExperience>>;
  @Input() index: number = 0;
  @Output() removeExperienceItem = new EventEmitter<number>();

  public addWorkExperienceDescription(): void {
    this.form.controls.experienceDescriptions.push(
      new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  public removeWorkExperienceDescription(index: number): void {
    this.form.controls.experienceDescriptions.removeAt(index);
  }
}
