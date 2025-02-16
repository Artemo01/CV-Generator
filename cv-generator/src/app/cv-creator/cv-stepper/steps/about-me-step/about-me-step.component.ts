import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AboutMeStepService } from './about-me-step.service';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadComponent } from '../../../../shared/image-upload/image-upload.component';

@Component({
  selector: 'app-about-me-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule,
    ImageUploadComponent,
  ],
  templateUrl: './about-me-step.component.html',
  styleUrl: './about-me-step.component.scss',
})
export class AboutMeStepComponent {
  @Output() next = new EventEmitter<void>();

  constructor(public readonly service: AboutMeStepService) {}

  public nextStep(): void {
    if (this.service.form.valid) {
      this.next.emit();
    }
  }

  public handleImageFileChange(file: File): void {
    if (file) {
      this.service.processFile(file);
    }
  }
}
