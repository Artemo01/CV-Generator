import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ControlsOf } from '../../../../models';
import { Education } from '../../../models';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-education-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './education-item.component.html',
  styleUrl: './education-item.component.scss',
})
export class EducationItemComponent {
  @Input() form!: FormGroup<ControlsOf<Education>>;
  @Input() index: number = 0;
  @Output() addEducationItem = new EventEmitter<void>();
  @Output() removeEducationItem = new EventEmitter<number>();
}
