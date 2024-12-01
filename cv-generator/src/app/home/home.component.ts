import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public steps = [
    {
      step: 1,
      title: 'Create new project',
      description: 'Click “Create CV now” to get started on your new project',
      image: 'assets/step1.png',
    },
    {
      step: 2,
      title: 'Fill in the indicated fields',
      description:
        'The CV builder will allow you to create a professional CV easily, quickly and conveniently. Just fill out the form and your document will be automatically generated based on the information you provide',
      image: 'assets/step2.png',
    },
    {
      step: 3,
      title: 'Download PDF with your CV',
      description:
        'Your resume will be immediately ready for download in PDF format. ',
      image: 'assets/step3.png',
    },
  ];
}
