import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CvFormBuilder } from '../../../cv-form-builder';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about-me-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './about-me-step.component.html',
  styleUrl: './about-me-step.component.scss',
})
export class AboutMeStepComponent {
  @Output() next = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private cvFormBuilder: CvFormBuilder) {
    this.form = this.cvFormBuilder.buildAboutMeForm();
  }

  public test() {
    console.log(this.form.valid);
    console.log(this.form.controls);
  }

  public nextStep(): void {
    if (this.form.valid) {
      this.next.emit();
    }
  }
}
