import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CvCreatorService } from './cv-creator.service';

@Component({
  selector: 'app-cv-creator',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cv-creator.component.html',
  styleUrl: './cv-creator.component.scss',
})
export class CvCreatorComponent {
  constructor(private readonly service: CvCreatorService) {}
}
