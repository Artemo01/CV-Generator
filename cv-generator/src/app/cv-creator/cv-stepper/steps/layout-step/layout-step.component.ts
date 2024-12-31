import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { AboutMeStepService } from '../about-me-step/about-me-step.service';
import {
  AboutMe,
  ColumnPosition,
  Contact,
  EducationSection,
  LanguageSection,
} from '../../../models';
import { ContactStepService } from '../contact-step/contact-step.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { LanguagesStepService } from '../languages-step/languages-step.service';
import { EducationStepService } from '../education-step/education-step.service';

export type FormModel = AboutMe | Contact | EducationSection | LanguageSection;

@Component({
  selector: 'app-layout-step',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './layout-step.component.html',
  styleUrl: './layout-step.component.scss',
})
export class AdditionalInfoStepComponent {
  public forms: { id: string; label: string; data: FormModel }[] = [
    {
      id: 'aboutMe',
      label: 'About Me',
      data: this.aboutMeStepService.form.value as AboutMe,
    },
    {
      id: 'contact',
      label: 'Contact',
      data: this.contactStepService.form.value as Contact,
    },
    {
      id: 'languages',
      label: 'Languages',
      data: this.languagesStepService.form.value as LanguageSection,
    },
    {
      id: 'education',
      label: 'Education',
      data: this.educationStepService.form.value as EducationSection,
    },
  ];

  constructor(
    public readonly aboutMeStepService: AboutMeStepService,
    public readonly contactStepService: ContactStepService,
    public readonly languagesStepService: LanguagesStepService,
    public readonly educationStepService: EducationStepService
  ) {}

  public get leftColumn() {
    return this.forms.filter(
      (form) => form.data.columnPosition === ColumnPosition.left
    );
  }

  public get rightColumn() {
    return this.forms.filter(
      (form) => form.data.columnPosition === ColumnPosition.right
    );
  }

  public drop(
    event: CdkDragDrop<{ id: string; label: string; data: FormModel }[]>
  ) {
    const movedItem = event.previousContainer.data[event.previousIndex];

    console.log(movedItem);
    console.log(event.container);
    console.log(event);

    movedItem.data.columnPosition =
      event.container.id === 'leftColumnList'
        ? ColumnPosition.left
        : ColumnPosition.right;

    this.updateServiceColumnPosition(
      movedItem.id,
      movedItem.data.columnPosition
    );

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private updateServiceColumnPosition(
    id: string,
    position: ColumnPosition
  ): void {
    switch (id) {
      case 'aboutMe':
        this.aboutMeStepService.updateColumnPosition(position);
        break;
      case 'contact':
        this.contactStepService.updateColumnPosition(position);
        break;
      case 'languages':
        this.languagesStepService.updateColumnPosition(position);
        break;
      case 'education':
        this.educationStepService.updateColumnPosition(position);
        break;
      default:
        console.warn(`No service found for form with id: ${id}`);
    }
  }
}
