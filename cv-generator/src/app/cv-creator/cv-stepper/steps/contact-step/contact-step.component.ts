import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CvFormBuilder } from '../../../cv-form-builder';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-contact-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './contact-step.component.html',
  styleUrl: './contact-step.component.scss',
})
export class ContactStepComponent {
  @Output() next = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildContactForm();
  }

  public nextStep(): void {
    if (this.form.valid) {
      this.next.emit();
    }
  }
}
