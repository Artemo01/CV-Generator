import { Injectable } from '@angular/core';
import { AboutMeStepService } from '../about-me-step/about-me-step.service';
import { ContactStepService } from '../contact-step/contact-step.service';
import { EducationStepService } from '../education-step/education-step.service';
import { LanguagesStepService } from '../languages-step/languages-step.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ColumnPosition } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(
    private readonly aboutMeStepService: AboutMeStepService,
    private readonly contactStepService: ContactStepService,
    private readonly languagesStepService: LanguagesStepService,
    private readonly educationStepService: EducationStepService
  ) {}

  public updateServiceColumnPosition(
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

  public handleDrop(
    event: CdkDragDrop<{ id: string; label: string; data: any }[]> // Replace `any` with the actual type if available
  ): void {
    const movedItem = event.previousContainer.data[event.previousIndex];

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
}
