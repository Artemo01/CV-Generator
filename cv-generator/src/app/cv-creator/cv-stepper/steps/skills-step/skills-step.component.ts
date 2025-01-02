import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SkillsStepService } from './skills-step.service';
import { CvFormBuilder } from '../../../cv-form-builder';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlsOf } from '../../../../models';
import { SkillSection } from '../../../models';
import { SkillSectionComponent } from './skill-section.component';

export interface SkillSections {
  skillSections: SkillSection[];
}
@Component({
  selector: 'app-skills-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SkillSectionComponent],
  templateUrl: './skills-step.component.html',
  styleUrl: './skills-step.component.scss',
})
export class SkillsStepComponent implements OnInit {
  @Output() next = new EventEmitter<void>();

  public form: FormGroup<ControlsOf<SkillSections>>;

  constructor(
    public readonly service: SkillsStepService,
    private readonly cvFormBuilder: CvFormBuilder,
    private readonly builder: FormBuilder
  ) {
    this.form = this.builder.group({
      skillSections: this.service.form,
    });
  }

  public ngOnInit(): void {
    this.addSkillSection();
  }

  public nextStep(): void {
    if (this.service.form.valid) {
      this.next.emit();
    }
  }

  public addSkillSection(): void {
    this.service.form.push(this.cvFormBuilder.buildSkillSectionForm());
  }
}
