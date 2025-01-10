import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorModalService } from './shared/error-modal/error-modal.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './shared/language-selector/language-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, LanguageSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cv-generator';

  constructor(
    private errorModalService: ErrorModalService,
    private translate: TranslateService,
    viewRef: ViewContainerRef
  ) {
    this.errorModalService.rootVewRef = viewRef;
    this.translate.addLangs(['pl', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
