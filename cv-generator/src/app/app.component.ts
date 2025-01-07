import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorModalService } from './shared/error-modal/error-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cv-generator';

  constructor(
    private errorModalService: ErrorModalService,
    viewRef: ViewContainerRef
  ) {
    this.errorModalService.rootVewRef = viewRef;
  }
}
