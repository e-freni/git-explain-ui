import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private commandSubject = new BehaviorSubject<string | null>(null);
  command$ = this.commandSubject.asObservable();

  constructor() {}

  setCommand(command: string) {
    this.commandSubject.next(command);
  }

  getCommand(): string | null {
    return this.commandSubject.getValue();
  }
}
