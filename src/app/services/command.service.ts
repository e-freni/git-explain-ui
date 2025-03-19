import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private commandSubject = new BehaviorSubject<string | null>(null);
  command$ = this.commandSubject.asObservable();
  private commands: { [key: string]: string } = {};


  constructor(private http: HttpClient) {
    this.loadCommands();
  }

  private loadCommands() {
    this.http.get<{ [key: string]: string }>('/assets/commands.json').pipe(
      tap(commands => {
        this.setCommands(commands);
      }),
      catchError(error => {
        console.error('Failed to load commands:', error);
        return [];
      })
    ).subscribe();
  }

  setCommands(commands: { [key: string]: string }) {
    this.commands = commands;
  }

  getComponentForCommand(command: string): string | null {
    const commandBase = Object.keys(this.commands).find(cmd => command.startsWith(cmd));

    return commandBase ? this.commands[commandBase] : null;
  }

  setCommand(command: string) {
    this.commandSubject.next(command);
  }

}
