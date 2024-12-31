import { Component } from '@angular/core';
import { CvCreatorService } from '../cv-creator.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  constructor(private readonly service: CvCreatorService) {
    this.service.summaryItems$.subscribe((x) => console.log(x));
  }
}
