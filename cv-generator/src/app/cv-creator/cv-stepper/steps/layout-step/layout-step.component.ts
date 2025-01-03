import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ColumnPosition } from '../../../models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router';

import { FormModel, LayoutService } from './layout.service';

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
  constructor(
    public readonly layoutStepService: LayoutService,
    private readonly router: Router
  ) {}

  public get leftColumn() {
    return this.layoutStepService.getLeftColumnForms();
  }

  public get rightColumn() {
    return this.layoutStepService.getRightColumnForms();
  }

  public navigateToSummary(): void {
    this.router.navigate(['/creator/summary']);
  }

  public drop(
    event: CdkDragDrop<{ id: string; label: string; data: FormModel }[]>
  ): void {
    const movedItem = event.previousContainer.data[event.previousIndex];
    movedItem.data.columnPosition =
      event.container.id === 'leftColumnList'
        ? ColumnPosition.left
        : ColumnPosition.right;

    this.layoutStepService.updateColumnPosition(
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
