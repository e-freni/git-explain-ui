import { Component } from '@angular/core';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';

@Component({
  selector: 'app-root',
  imports: [TerminalComponent, ExplanationComponent, TranslateModule, LanguageSelectorComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'git-explain-ui';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['it', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

}
