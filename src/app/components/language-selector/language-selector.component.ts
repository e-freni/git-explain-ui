import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
  currentLanguage: string = 'en-US';
  languages = [
    { code: 'en', label: 'English', flag: 'assets/flags/us.svg' },
    { code: 'it', label: 'Italiano', flag: 'assets/flags/it.svg' }
  ];


  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || this.translate.getDefaultLang();
  }

  switchLanguage(lang: { code: string }) {
    this.translate.use(lang.code);
    this.currentLanguage = lang.code;
  }
}
