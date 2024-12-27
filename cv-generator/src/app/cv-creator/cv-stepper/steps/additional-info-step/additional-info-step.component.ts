import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-additional-info-step',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './additional-info-step.component.html',
  styleUrl: './additional-info-step.component.scss',
})
export class AdditionalInfoStepComponent {
  public todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  public done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
  ];

  public drop(event: CdkDragDrop<string[]>) {
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
