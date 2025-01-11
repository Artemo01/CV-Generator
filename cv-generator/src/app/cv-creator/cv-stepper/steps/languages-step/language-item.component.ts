import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Language, LanguageProficiencyLevel } from '../../../models';
import { ControlsOf } from '../../../../models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './language-item.component.html',
})
export class LanguagesItemComponent {
  @Input() form!: FormGroup<ControlsOf<Language>>;
  @Input() index: number = 0;
  @Output() addLanguage = new EventEmitter<void>();
  @Output() removeLanguage = new EventEmitter<number>();

  public proficiencyLevels = [
    { value: LanguageProficiencyLevel.beginner, label: 'StringBeginner' },
    {
      value: LanguageProficiencyLevel.intermediate,
      label: 'StringIntermediate',
    },
    { value: LanguageProficiencyLevel.advanced, label: 'StringAdvanced' },
    { value: LanguageProficiencyLevel.fluent, label: 'StringFluent' },
    { value: LanguageProficiencyLevel.native, label: 'StringNative' },
  ];
}
