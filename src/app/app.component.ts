import { Component } from '@angular/core';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { TerminalComponent } from './components/terminal/terminal.component';

@Component({
  selector: 'app-root',
  imports: [TerminalComponent, ExplanationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'git-explain-ui';

}
