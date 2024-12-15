import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from '../../../models';
import { ControlsOf } from '../../../../models';

@Component({
  selector: 'app-language-item',
  standalone: true,
  imports: [],
  templateUrl: './language-item.component.html',
})
export class LanguagesItemComponent {
  @Input() form!: FormGroup<ControlsOf<Language>>;
}
