import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandFeedbackService {

  //TODO add feedback system instead of using the terminal component to handle it

  constructor() { }

  getFeedback(command: string): string | null {
    return null
  }
}
