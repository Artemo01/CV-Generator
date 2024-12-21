import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CvFormBuilder } from '../../../cv-form-builder';
import { ControlsOf } from '../../../../models';
import {
  Language,
  LanguageProficiencyLevel,
  LanguageSection,
} from '../../../models';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LanguagesItemComponent } from './language-item.component';

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

  public form: FormGroup<ControlsOf<LanguageSection>>;

  public get languages(): FormArray {
    return this.form.controls.languages as FormArray;
  }

  constructor(
    private cvFormBuilder: CvFormBuilder,
    private formBuilder: FormBuilder
  ) {
    this.form = this.cvFormBuilder.buildLanguageSectionForm();
  }

  public ngOnInit(): void {
    this.addLanguage();
  }

  public nextStep(): void {
    if (this.form.valid) {
      this.next.emit();
    }
  }

  public addLanguage(): void {
    this.form.controls.languages.push(this.createLanguageFormGroup());
  }

  public removeLanguage(index: number): void {
    this.form.controls.languages.removeAt(index);
  }

  private createLanguageFormGroup(): FormGroup<ControlsOf<Language>> {
    return this.formBuilder.group({
      languageName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      proficiencyLevel: new FormControl<LanguageProficiencyLevel>(
        LanguageProficiencyLevel.beginner,
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
    });
  }
}
