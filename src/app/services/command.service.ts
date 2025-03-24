import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GitInitComponent } from '../components/git-components/git-init/git-init.component';
import { ClearComponent } from '../components/os-components/clear/clear.component';
import { HelpComponent } from '../components/os-components/help-component/help.component';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private commandSubject = new BehaviorSubject<string | null>(null);
  private currentComponentSubject = new BehaviorSubject<Type<any> | null>(null);
  command$ = this.commandSubject.asObservable();
  currentComponent$ = this.currentComponentSubject.asObservable();
  private commands: { [key: string]: Type<any> } = {
    'help': HelpComponent,
    'clear': ClearComponent,
    // 'ls': LsComponent,
    // 'pwd': PwdComponent,
    'git init': GitInitComponent,
    // 'git status': GitStatusComponent,
  };


  constructor() {}

  setCommand(command: string): void {
    this.commandSubject.next(command);
    const component = this.getComponentForCommand(command);
    if (component) {
      this.currentComponentSubject.next(component);
    } else {
      this.currentComponentSubject.next(null);
    }
  }

  getComponentForCommand(command: string): Type<any> | null {
    const commandBase = Object.keys(this.commands).find(cmd => command.startsWith(cmd));
    return commandBase ? this.commands[commandBase] : null;
  }

}
