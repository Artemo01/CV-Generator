import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ControlsOf } from '../../../../models';
import { Skill, SkillSection } from '../../../models';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './skill-item.component.html',
})
export class SkillItemComponent {
  @Input() form!: FormGroup<ControlsOf<Skill>>;
  @Input() index: number = 0;
}