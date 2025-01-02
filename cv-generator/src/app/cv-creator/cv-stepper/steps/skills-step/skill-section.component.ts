import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SkillSection } from '../../../models';
import { ControlsOf } from '../../../../models';
import { MatInputModule } from '@angular/material/input';
import { SkillItemComponent } from './skill-item.component';
import { CvFormBuilder } from '../../../cv-form-builder';

@Component({
  selector: 'app-skill-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    SkillItemComponent,
  ],
  templateUrl: './skill-section.component.html',
})
export class SkillSectionComponent implements OnInit {
  @Input() form!: FormGroup<ControlsOf<SkillSection>>;
  @Input() index: number = 0;

  constructor(private readonly cvFormBuilder: CvFormBuilder) {}

  public ngOnInit(): void {
    this.addSkill();
  }

  public addSkill(): void {
    this.form.controls.skills.push(this.cvFormBuilder.createSkillForm());
  }
}
