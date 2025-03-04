import { Component } from '@angular/core';
import { TerminalComponent } from './components/terminal/terminal.component';

@Component({
  selector: 'app-root',
  imports: [TerminalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'git-explain-ui';

}
