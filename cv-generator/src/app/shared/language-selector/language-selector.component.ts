import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  public languages: Language[] = [
    { code: 'en', name: 'English', flag: 'assets/en.png' },
    { code: 'pl', name: 'Polski', flag: 'assets/pl.png' },
  ];
  public selectedLanguage = this.languages[0];
  public isDropdownOpen = false;

  constructor(private translate: TranslateService) {
    this.selectedLanguage =
      this.languages.find((lang) => lang.code === this.translate.currentLang) ||
      this.languages[0];
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public changeLanguage(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
    this.toggleDropdown();
  }
}
