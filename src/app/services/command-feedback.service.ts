import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandFeedbackService {

  private currentFeedbackSubject = new BehaviorSubject<string | null>(null);
  private terminalOutputSubject = new BehaviorSubject<string[]>([]);
  terminalOutput$ = this.terminalOutputSubject.asObservable();

  constructor() { }

  setFeedbackByComponent(component: Type<any> | null, command: string): void {
    if(!component){
      this.setFeedback(`Command not found: ${command}`);
      return;
    }
    this.setFeedback(command);
  }

  setFeedback(feedback: string): void {
    this.currentFeedbackSubject.next(feedback);
    this.updateOutput(feedback);
  }

  updateOutput(feedback: string){
    let output = this.terminalOutputSubject.getValue();
    output.push(feedback);
    this.terminalOutputSubject.next(output);
  }
}
