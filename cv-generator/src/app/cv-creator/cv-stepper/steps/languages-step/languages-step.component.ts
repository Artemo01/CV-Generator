import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { CvFormBuilder } from '../../../cv-form-builder';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LanguagesItemComponent } from './language-item.component';
import { LanguagesStepService } from './languages-step.service';

@Component({
  selector: 'app-languages-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    LanguagesItemComponent,
  ],
  templateUrl: './languages-step.component.html',
  styleUrl: './languages-step.component.scss',
})
export class LanguagesStepComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  public get languages(): FormArray {
    return this.service.form.controls.languages as FormArray;
  }

  constructor(
    public readonly service: LanguagesStepService,
    private cvFormBuilder: CvFormBuilder
  ) {}

  public ngOnInit(): void {
    this.addLanguage();
  }

  public nextStep(): void {
    if (this.service.form.valid) {
      this.next.emit();
    }
  }

  public addLanguage(): void {
    this.service.form.controls.languages.push(
      this.cvFormBuilder.createLanguageFormGroup()
    );
  }

  public removeLanguage(index: number): void {
    this.service.form.controls.languages.removeAt(index);
  }
}
